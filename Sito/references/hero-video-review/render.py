"""Render the local LGE hero edit from its recorded, unmodified sources."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parent
FPS = 24
FORMATS = {
    "Desktop": (1920, 1080, 1600, 900),
    "Tablet": (1440, 1080, 1200, 900),
    "Mobile": (720, 1280, 720, 1280),
}


def run(arguments: list[str]) -> None:
    subprocess.run(arguments, check=True)


def framing(shot: dict[str, object], name: str, width: int, height: int) -> str:
    subject = shot["subject"]
    if subject == "entrance":
        if name == "Mobile":
            return f"scale=-2:{height},crop={width}:{height}"
        return (
            f"vignette=PI/4,scale=-2:{height},"
            f"pad={width}:{height}:(ow-iw)/2:0:black"
        )
    # Per-shot horizontal focal points protect the product on portrait screens.
    focal = float(shot.get(f"{name.lower()}_focal", shot.get("focal", 0.5)))
    end_focal = float(shot.get(f"{name.lower()}_focal_end", focal))
    position = str(focal)
    if end_focal != focal:
        duration = int(shot["frames"]) / FPS
        position = f"({focal}+({end_focal - focal})*min(t/{duration}\\,1))"
    return (
        f"scale={width}:{height}:force_original_aspect_ratio=increase:flags=lanczos,"
        f"crop={width}:{height}:(iw-ow)*{position}:(ih-oh)/2"
    )


def render(name: str, shots: list[dict[str, object]]) -> None:
    width, height, web_width, web_height = FORMATS[name]
    master = ROOT / "01_Master" / f"LGE_Hero_Reedit_{name}.mp4"
    web = ROOT / "02_Web" / f"LGE_Hero_Reedit_WEB_{name}.mp4"
    poster = ROOT / "03_Poster" / f"LGE_Hero_Reedit_Poster_{name}.jpg"
    command = ["ffmpeg", "-hide_banner", "-loglevel", "warning", "-y"]
    filters: list[str] = []
    for index, shot in enumerate(shots):
        frames = int(shot["frames"])
        command += [
            "-threads", "2", "-ss", str(shot["start"]),
            "-t", str(frames / FPS + 0.1), "-i", str(ROOT / "sources" / str(shot["file"])),
        ]
        grade = "eq=contrast=1.015:saturation=0.94:brightness=0.003"
        filters.append(
            f"[{index}:v]fps={FPS},trim=end_frame={frames},setpts=PTS-STARTPTS,"
            f"{framing(shot, name, width, height)},setsar=1,{grade},"
            f"format=yuv420p,settb=AVTB[c{index}]"
        )
    total_frames = int(shots[0]["frames"])
    previous = "c0"
    for index, shot in enumerate(shots[1:], start=1):
        current = f"edit{index}"
        overlap = int(shot.get("overlap_frames", 0))
        if overlap:
            filters.append(
                f"[{previous}][c{index}]xfade=transition=fade:"
                f"duration={overlap / FPS}:offset={(total_frames - overlap) / FPS}[{current}]"
            )
        else:
            filters.append(f"[{previous}][c{index}]concat=n=2:v=1:a=0[{current}]")
        total_frames += int(shot["frames"]) - overlap
        previous = current
    command += [
        "-filter_complex_threads", "1", "-filter_complex", ";".join(filters),
        "-map", f"[{previous}]", "-an", "-c:v", "libx264", "-preset", "slow",
        "-crf", "16", "-pix_fmt", "yuv420p", "-threads", "4",
        "-r", str(FPS), "-frames:v", str(total_frames),
        "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
        "-movflags", "+faststart", str(master),
    ]
    print(f"Rendering {name}: {total_frames / FPS:.2f}s", flush=True)
    run(command)
    run([
        "ffmpeg", "-hide_banner", "-loglevel", "warning", "-y", "-i", str(master),
        "-vf", f"scale={web_width}:{web_height}:flags=lanczos", "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-threads", "4",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(web),
    ])
    run([
        "ffmpeg", "-hide_banner", "-loglevel", "warning", "-y", "-i", str(master),
        "-frames:v", "1", "-update", "1", "-q:v", "2", str(poster),
    ])
    print(f"Finished {name}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--format", choices=FORMATS)
    args = parser.parse_args()
    manifest = json.loads((ROOT / "edit.json").read_text())
    for folder in ("01_Master", "02_Web", "03_Poster"):
        (ROOT / folder).mkdir(exist_ok=True)
    for name in ([args.format] if args.format else FORMATS):
        render(name, manifest["shots"])


if __name__ == "__main__":
    main()
