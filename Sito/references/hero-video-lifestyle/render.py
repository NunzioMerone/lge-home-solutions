"""Prepare and render the slower lifestyle edit, retaining the original sources."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FPS = 24
FADE = 20
SIZES = {"Desktop": (1280, 720), "Tablet": (960, 720), "Mobile": (720, 1280)}


def run(args: list[str]) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def prepare(shots: list[dict], selected_scene: int | None = None) -> None:
    folder = ROOT / ".prepared"
    folder.mkdir(exist_ok=True)
    for index, shot in enumerate(shots):
        if selected_scene is not None and index + 1 != selected_scene:
            continue
        target = folder / f"{index}.mp4"
        speed = shot["speed"]
        seconds = shot["frames"] / FPS * speed
        filters = [f"trim=duration={seconds}", "setpts=PTS-STARTPTS"]
        if shot.get("source_crop"):
            filters.append(f"crop={shot['source_crop']}")
        filters.extend([
            "scale=1280:-2:flags=lanczos", "setsar=1",
            f"setpts=PTS/{speed}", "tpad=stop_mode=clone:stop_duration=0.25",
            "minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
            f"trim=end_frame={shot['frames']}", "setpts=PTS-STARTPTS", "format=yuv420p",
        ])
        print(f"Preparing scene {index + 1}: {shot['description']}", flush=True)
        run([
            "-threads", "2", "-ss", str(shot["start"]), "-t", str(seconds + .3),
            "-i", str(ROOT / "sources" / shot["file"]), "-an", "-vf", ",".join(filters),
            "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-threads", "3", str(target),
        ])


def render(name: str, shots: list[dict]) -> None:
    width, height = SIZES[name]
    command: list[str] = []
    filters: list[str] = []
    for index, shot in enumerate(shots):
        command += ["-threads", "2", "-i", str(ROOT / ".prepared" / f"{index}.mp4")]
        focal = shot.get(f"{name.lower()}_focal", shot.get("focal", .5))
        end = shot.get(f"{name.lower()}_focal_end", focal)
        duration = shot["frames"] / FPS
        position = f"({focal}+({end-focal})*min(t/{duration}\\,1))"
        filters.append(
            f"[{index}:v]setpts=PTS-STARTPTS,"
            f"scale={width}:{height}:force_original_aspect_ratio=increase:flags=lanczos,"
            f"crop={width}:{height}:(iw-ow)*{position}:(ih-oh)/2,setsar=1,"
            "eq=saturation=0.97:contrast=1.005,format=yuv420p,settb=AVTB"
            f"[c{index}]"
        )
    previous = "c0"
    frames = shots[0]["frames"]
    for index, shot in enumerate(shots[1:], start=1):
        label = f"edit{index}"
        filters.append(
            f"[{previous}][c{index}]xfade=transition=fade:duration={FADE/FPS}:"
            f"offset={(frames-FADE)/FPS}[{label}]"
        )
        frames += shot["frames"] - FADE
        previous = label
    # Put the overlap between the end and start inside the exported timeline.
    # The seam then ends one source frame before the first exported frame.
    filters.extend([
        f"[{previous}]split=3[bodyin][headin][tailin]",
        f"[bodyin]trim=start_frame={FADE}:end_frame={frames-FADE},setpts=PTS-STARTPTS[body]",
        f"[headin]trim=end_frame={FADE},setpts=PTS-STARTPTS[head]",
        f"[tailin]trim=start_frame={frames-FADE},setpts=PTS-STARTPTS[tail]",
        f"[tail][head]xfade=transition=fade:duration={FADE/FPS}:offset=0[seam]",
        "[body][seam]concat=n=2:v=1:a=0[out]",
    ])
    master = ROOT / "01_Master" / f"LGE_Hero_Lifestyle_{name}.mp4"
    web = ROOT / "02_Web" / f"LGE_Hero_Lifestyle_WEB_{name}.mp4"
    poster = ROOT / "03_Poster" / f"LGE_Hero_Lifestyle_Poster_{name}.jpg"
    print(f"Rendering {name}: {(frames-FADE)/FPS:.3f}s", flush=True)
    run([
        *command, "-filter_complex_threads", "1", "-filter_complex", ";".join(filters),
        "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16",
        "-threads", "4", "-pix_fmt", "yuv420p", "-r", str(FPS),
        "-frames:v", str(frames-FADE), "-color_primaries", "bt709", "-color_trc", "bt709",
        "-colorspace", "bt709", "-movflags", "+faststart", str(master),
    ])
    run([
        "-i", str(master), "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "20",
        "-threads", "4", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(web),
    ])
    run(["-i", str(master), "-frames:v", "1", "-update", "1", "-q:v", "2", str(poster)])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prepare-only", action="store_true")
    parser.add_argument("--scene", type=int, choices=range(1, 7))
    parser.add_argument("--format", choices=SIZES)
    args = parser.parse_args()
    shots = json.loads((ROOT / "edit.json").read_text())["shots"]
    for folder in ("01_Master", "02_Web", "03_Poster"):
        (ROOT / folder).mkdir(exist_ok=True)
    if args.prepare_only:
        prepare(shots, args.scene)
    else:
        for name in ([args.format] if args.format else SIZES):
            render(name, shots)


if __name__ == "__main__":
    main()
