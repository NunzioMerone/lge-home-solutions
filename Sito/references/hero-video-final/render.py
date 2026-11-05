"""Reproduce the LGE multi-product hero edit from the documented sources."""

from __future__ import annotations

import argparse
import json
import math
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Mapping

ROOT = Path(__file__).resolve().parent
FPS = 24
FADE_FRAMES = 20
SIZES = {
    "Desktop": (1920, 1080, 1280, 720),
    "Tablet": (1440, 1080, 960, 720),
    "Mobile": (720, 1280, 720, 1280),
}


@dataclass(frozen=True)
class Shot:
    file: str
    description: str
    category: str
    start: float
    frames: int
    speed: float
    source_fps: float
    focal: float = 0.5
    focal_end: float = 0.5
    mobile_focal: float = 0.5
    mobile_focal_end: float = 0.5
    vertical_focal: float = 0.5
    source_crop: str | None = None


def number(data: Mapping[str, object], key: str, default: float | None = None) -> float:
    value = data.get(key, default)
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ValueError(f"Invalid numeric field: {key}")
    return float(value)


def string(data: Mapping[str, object], key: str) -> str:
    value = data.get(key)
    if not isinstance(value, str) or not value:
        raise ValueError(f"Invalid string field: {key}")
    return value


def read_shots() -> list[Shot]:
    document: object = json.loads((ROOT / "edit.json").read_text())
    if not isinstance(document, dict) or not isinstance(document.get("shots"), list):
        raise ValueError("The edit must contain a list of shots")
    shots: list[Shot] = []
    for raw in document["shots"]:
        if not isinstance(raw, dict) or any(not isinstance(key, str) for key in raw):
            raise ValueError("Invalid shot record")
        focal = number(raw, "focal", .5)
        mobile_focal = number(raw, "mobile_focal", focal)
        frames = number(raw, "frames")
        crop = raw.get("source_crop")
        if crop is not None and not isinstance(crop, str):
            raise ValueError("Invalid source crop")
        shot = Shot(
            file=string(raw, "file"), description=string(raw, "description"),
            category=string(raw, "category"), start=number(raw, "start"), frames=int(frames),
            speed=number(raw, "speed"), source_fps=number(raw, "source_fps"),
            focal=focal, focal_end=number(raw, "focal_end", focal),
            mobile_focal=mobile_focal, mobile_focal_end=number(raw, "mobile_focal_end", mobile_focal),
            vertical_focal=number(raw, "vertical_focal", .5), source_crop=crop,
        )
        if frames != shot.frames or shot.frames <= FADE_FRAMES * 2 or shot.start < 0:
            raise ValueError(f"Invalid shot timing: {shot.description}")
        if not 0 < shot.speed <= 1 or shot.source_fps <= 0:
            raise ValueError(f"Invalid shot speed: {shot.description}")
        if any(not 0 <= value <= 1 for value in (
            shot.focal, shot.focal_end, shot.mobile_focal, shot.mobile_focal_end, shot.vertical_focal,
        )):
            raise ValueError(f"Invalid framing: {shot.description}")
        if Path(shot.file).name != shot.file or not (ROOT / "sources" / shot.file).is_file():
            raise ValueError(f"Missing source: {shot.file}")
        shots.append(shot)
    if len(shots) < 2:
        raise ValueError("At least two shots are required for the loop")
    return shots


def run(args: list[str]) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def prepare(shots: list[Shot], selected: int | None) -> None:
    folder = ROOT / ".prepared"
    folder.mkdir(exist_ok=True)
    for index, shot in enumerate(shots):
        if selected is not None and selected != index + 1:
            continue
        seconds = shot.frames / FPS * shot.speed
        filters = [f"trim=duration={seconds}", "setpts=PTS-STARTPTS"]
        if shot.source_crop:
            filters.append(f"crop={shot.source_crop}")
        filters.extend([
            "scale=1920:1280:force_original_aspect_ratio=decrease:force_divisible_by=2:flags=lanczos",
            "setsar=1", f"setpts=PTS/{shot.speed}",
        ])
        # Native 24 fps and 30 fps slowed to 80% need no synthesized motion.
        if shot.source_fps * shot.speed >= FPS - .05:
            filters.append("fps=24")
        else:
            filters.extend([
                "tpad=stop_mode=clone:stop_duration=0.25",
                "minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
            ])
        filters.extend([f"trim=end_frame={shot.frames}", "setpts=PTS-STARTPTS", "format=yuv420p"])
        print(f"Preparing {index+1}/{len(shots)}: {shot.description}", flush=True)
        run([
            "-threads", "2", "-ss", str(shot.start), "-t", str(seconds+.3),
            "-i", str(ROOT / "sources" / shot.file), "-vf", ",".join(filters), "-an",
            "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-threads", "3",
            str(folder / f"{index}.mp4"),
        ])


def render(name: str, shots: list[Shot]) -> None:
    width, height, web_width, web_height = SIZES[name]
    command: list[str] = []
    filters: list[str] = []
    for index, shot in enumerate(shots):
        command.extend(["-threads", "2", "-i", str(ROOT / ".prepared" / f"{index}.mp4")])
        focal, end = (shot.mobile_focal, shot.mobile_focal_end) if name == "Mobile" else (shot.focal, shot.focal_end)
        position = f"({focal}+({end-focal})*min(t/{shot.frames/FPS}\\,1))"
        filters.append(
            f"[{index}:v]setpts=PTS-STARTPTS,"
            f"scale={width}:{height}:force_original_aspect_ratio=increase:flags=lanczos,"
            f"crop={width}:{height}:(iw-ow)*{position}:(ih-oh)*{shot.vertical_focal},"
            f"setsar=1,eq=saturation=0.97:contrast=1.005,format=yuv420p,settb=AVTB[c{index}]"
        )
    frames = shots[0].frames
    previous = "c0"
    for index, shot in enumerate(shots[1:], start=1):
        label = f"edit{index}"
        filters.append(
            f"[{previous}][c{index}]xfade=transition=fade:duration={FADE_FRAMES/FPS}:"
            f"offset={(frames-FADE_FRAMES)/FPS}[{label}]"
        )
        frames += shot.frames - FADE_FRAMES
        previous = label
    # Overlap the last and first scenes inside the exported timeline, so the
    # player can loop without an additional black fade or a duplicated pause.
    filters.extend([
        f"[{previous}]split=3[bodyin][headin][tailin]",
        f"[bodyin]trim=start_frame={FADE_FRAMES}:end_frame={frames-FADE_FRAMES},setpts=PTS-STARTPTS[body]",
        f"[headin]trim=end_frame={FADE_FRAMES},setpts=PTS-STARTPTS[head]",
        f"[tailin]trim=start_frame={frames-FADE_FRAMES},setpts=PTS-STARTPTS[tail]",
        f"[tail][head]xfade=transition=fade:duration={FADE_FRAMES/FPS}:offset=0[seam]",
        "[body][seam]concat=n=2:v=1:a=0[out]",
    ])
    master = ROOT / "01_Master" / f"LGE_Hero_Rev03_{name}.mp4"
    web = ROOT / "02_Web" / f"LGE_Hero_Rev03_WEB_{name}.mp4"
    print(f"Rendering {name}: {(frames-FADE_FRAMES)/FPS:.3f}s", flush=True)
    run([
        *command, "-filter_complex_threads", "1", "-filter_complex", ";".join(filters),
        "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16",
        "-threads", "4", "-pix_fmt", "yuv420p", "-r", str(FPS), "-frames:v", str(frames-FADE_FRAMES),
        "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
        "-movflags", "+faststart", str(master),
    ])
    run([
        "-i", str(master), "-vf", f"scale={web_width}:{web_height}:flags=lanczos", "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-threads", "4", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(web),
    ])
    run([
        "-i", str(master), "-frames:v", "1", "-update", "1", "-q:v", "2",
        str(ROOT / "03_Poster" / f"LGE_Hero_Rev03_Poster_{name}.jpg"),
    ])


def main() -> None:
    shots = read_shots()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prepare-only", action="store_true")
    parser.add_argument("--scene", type=int, choices=range(1, len(shots)+1))
    parser.add_argument("--format", choices=SIZES)
    args = parser.parse_args()
    for folder in ("01_Master", "02_Web", "03_Poster"):
        (ROOT / folder).mkdir(exist_ok=True)
    if args.prepare_only:
        prepare(shots, args.scene)
    else:
        for name in ([args.format] if args.format else SIZES):
            render(name, shots)


if __name__ == "__main__":
    main()
