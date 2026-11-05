"""Render the warm Rev04 edit into three silent, seamless website loops."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SIZES = {"Desktop": (1280, 720), "Tablet": (960, 720), "Mobile": (720, 1280)}


def run(arguments: list[str]) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *arguments], check=True)


def render(name: str, edit: dict) -> None:
    width, height = SIZES[name]
    fps = edit["fps"]
    fade = edit["transition_frames"]
    shots = edit["shots"]
    prepared = ROOT / ".prepared" / name
    prepared.mkdir(parents=True, exist_ok=True)
    for index, shot in enumerate(shots):
        target = prepared / f"{index}.mp4"
        if target.exists():
            continue
        duration = shot["frames"] / fps
        focal = shot.get("mobile_focal", shot["focal"]) if name == "Mobile" else shot["focal"]
        end = shot.get("mobile_focal_end", focal) if name == "Mobile" else focal
        source_duration = duration * shot["speed"]
        position = f"({focal}+({end-focal})*min(t/{source_duration}\\,1))"
        filters = [f"trim=duration={duration * shot['speed']}", "setpts=PTS-STARTPTS"]
        if shot.get("source_crop"):
            filters.append(f"crop={shot['source_crop']}")
        filters.extend([
            f"scale={width}:{height}:force_original_aspect_ratio=increase:flags=lanczos",
            f"crop={width}:{height}:(iw-ow)*{position}:(ih-oh)*0.5",
            "setsar=1", f"setpts=PTS/{shot['speed']}",
            "tpad=stop_mode=clone:stop_duration=0.3",
            f"minterpolate=fps={fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
            f"trim=end_frame={shot['frames']}", "setpts=PTS-STARTPTS",
        ])
        warmth = shot.get("warmth", 0.5)
        filters.extend([
            f"colorbalance=rs={.006*warmth}:bs={-.004*warmth}:rm={.018*warmth}:gm={.003*warmth}:bm={-.016*warmth}",
            "eq=saturation=1.015:contrast=1.005", "format=yuv420p",
        ])
        print(f"{name} {index+1}/{len(shots)}: {shot['description']}", flush=True)
        temporary = target.with_suffix(".tmp.mp4")
        run([
            "-threads", "2", "-ss", str(shot["start"]), "-t", str(duration * shot["speed"] + .3),
            "-i", str(ROOT / "sources" / shot["file"]), "-filter_threads", "2",
            "-vf", ",".join(filters), "-an", "-frames:v", str(shot["frames"]),
            "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-threads", "2", str(temporary),
        ])
        temporary.replace(target)
    inputs: list[str] = []
    graph: list[str] = []
    for index in range(len(shots)):
        inputs.extend(["-threads", "1", "-i", str(prepared / f"{index}.mp4")])
        graph.append(f"[{index}:v]settb=AVTB,setpts=PTS-STARTPTS[c{index}]")
    frames = shots[0]["frames"]
    previous = "c0"
    for index, shot in enumerate(shots[1:], 1):
        label = f"mix{index}"
        graph.append(f"[{previous}][c{index}]xfade=transition=fade:duration={fade/fps}:offset={(frames-fade)/fps}[{label}]")
        frames += shot["frames"] - fade
        previous = label
    graph.extend([
        f"[{previous}]split=3[bodyin][headin][tailin]",
        f"[bodyin]trim=start_frame={fade}:end_frame={frames-fade},setpts=PTS-STARTPTS[body]",
        f"[headin]trim=end_frame={fade},setpts=PTS-STARTPTS[head]",
        f"[tailin]trim=start_frame={frames-fade},setpts=PTS-STARTPTS[tail]",
        f"[tail][head]xfade=transition=fade:duration={fade/fps}:offset=0[seam]",
        "[body][seam]concat=n=2:v=1:a=0[out]",
    ])
    output = ROOT / "02_Web" / f"LGE_Hero_Rev04_WEB_{name}.mp4"
    output.parent.mkdir(exist_ok=True)
    poster = ROOT / "03_Poster" / f"LGE_Hero_Rev04_Poster_{name}.jpg"
    poster.parent.mkdir(exist_ok=True)
    print(f"Assembling {name}: {(frames-fade)/fps:.3f}s", flush=True)
    run([
        *inputs, "-filter_complex_threads", "1", "-filter_complex", ";".join(graph),
        "-map", "[out]", "-an", "-frames:v", str(frames-fade), "-r", str(fps),
        "-c:v", "libx264", "-crf", "19", "-preset", "slow", "-threads", "3",
        "-pix_fmt", "yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709",
        "-colorspace", "bt709", "-movflags", "+faststart", str(output),
    ])
    run(["-i", str(output), "-frames:v", "1", "-update", "1", "-q:v", "2", str(poster)])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--format", choices=SIZES, required=True)
    arguments = parser.parse_args()
    edit = json.loads((ROOT / "edit.json").read_text())
    render(arguments.format, edit)


if __name__ == "__main__":
    main()
