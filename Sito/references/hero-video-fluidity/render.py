"""Render Rev12 at 60 fps from the original sources, with stable portrait framing."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PIPELINE_VERSION = 3


def run(arguments: list[str]) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *arguments], check=True)


def shot_for_format(shot: dict, name: str) -> dict:
    variants = shot.get("variants", {})
    resolved = {key: value for key, value in shot.items() if key != "variants"}
    resolved.update(variants.get(name, {}))
    return resolved


def prepare(name: str, index: int, shot: dict, source: dict, edit: dict) -> Path:
    width, height = edit["exports"][name]
    fps = edit["fps"]
    identity = json.dumps([PIPELINE_VERSION, shot, source, width, height, fps], sort_keys=True)
    key = hashlib.sha256(identity.encode()).hexdigest()[:16]
    target = ROOT / edit.get("cache_directory", ".prepared") / name / f"{key}.mp4"
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        return target

    source_size = [int(value) for value in shot["source_crop"].split(":")[:2]] if shot.get("source_crop") else source["dimensions"]
    source_width, source_height = source_size
    # A portrait source cannot fill widescreen at its full source height.
    # Crop at native resolution first, interpolate, then scale for delivery.
    crop_height = min(source_height, source_width * height / width)
    work_height = int(min(height, crop_height)) // 2 * 2
    work_width = round(work_height * width / height / 2) * 2
    scale_filter = f"scale={work_width}:-2:flags=lanczos" if source_width / source_height < width / height else f"scale=-2:{work_height}:flags=lanczos"
    duration = shot["frames"] / fps
    source_duration = duration * shot["speed"]
    focal = shot.get("mobile_focal", shot["focal"]) if name == "Mobile" else shot["focal"]
    filters = [f"trim=duration={source_duration}", "setpts=PTS-STARTPTS"]
    if shot.get("source_crop"):
        filters.append(f"crop={shot['source_crop']}")
    filters.extend([
        scale_filter,
        f"crop={work_width}:{work_height}:(iw-ow)*{focal}:(ih-oh)*{shot.get('focal_y', 0.5)}",
        "setsar=1", f"setpts=PTS/{shot['speed']}",
        "tpad=stop_mode=clone:stop_duration=0.3",
        f"minterpolate=fps={fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
        f"trim=end_frame={shot['frames']}", "setpts=PTS-STARTPTS",
    ])
    warmth = shot.get("warmth", 0.5)
    filters.extend([
        f"colorbalance={shot['color_balance']}" if shot.get("color_balance") else f"colorbalance=rs={.006*warmth}:bs={-.004*warmth}:rm={.018*warmth}:gm={.003*warmth}:bm={-.016*warmth}",
        "eq=saturation=1.015:contrast=1.005",
        f"scale={width}:{height}:flags=lanczos", "setsar=1", "format=yuv420p",
    ])
    temporary = target.with_suffix(".tmp.mp4")
    print(f"{name} {index+1}/{len(edit['shots'])}: {shot['description']}", flush=True)
    run([
        "-threads", "2", "-ss", str(shot["start"]), "-t", str(source_duration + .3),
        "-i", str(ROOT / source["path"]), "-filter_threads", "2",
        "-vf", ",".join(filters), "-an", "-frames:v", str(shot["frames"]),
        "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-threads", "2", "-fps_mode", "cfr", str(temporary),
    ])
    temporary.replace(target)
    return target


def render(name: str, edit: dict, efficient: bool = False) -> None:
    fps, fade = edit["fps"], edit["transition_frames"]
    shots = [shot_for_format(shot, name) for shot in edit["shots"]]
    sources = {source["file"]: source for source in edit["sources"]}
    prepared = [prepare(name, i, shot, sources[shot["file"]], edit) for i, shot in enumerate(shots)]
    inputs: list[str] = []
    graph: list[str] = []
    for index, path in enumerate(prepared):
        inputs.extend(["-threads", "1", "-i", str(path)])
        graph.append(f"[{index}:v]settb=AVTB,setpts=PTS-STARTPTS[c{index}]")
    frames, previous = shots[0]["frames"], "c0"
    for index, shot in enumerate(shots[1:], 1):
        label = f"mix{index}"
        graph.append(f"[{previous}][c{index}]xfade=transition=fade:duration={fade/fps}:offset={(frames-fade)/fps}[{label}]")
        frames += shot["frames"] - fade
        previous = label
    # Rotate the first dissolve to the end so the file seam continues its motion.
    graph.extend([
        f"[{previous}]split=3[bodyin][headin][tailin]",
        f"[bodyin]trim=start_frame={fade}:end_frame={frames-fade},setpts=PTS-STARTPTS[body]",
        f"[headin]trim=end_frame={fade},setpts=PTS-STARTPTS[head]",
        f"[tailin]trim=start_frame={frames-fade},setpts=PTS-STARTPTS[tail]",
        f"[tail][head]xfade=transition=fade:duration={fade/fps}:offset=0[seam]",
        "[body][seam]concat=n=2:v=1:a=0[out]",
    ])
    revision = edit["revision"]
    output = ROOT / "02_Web" / f"LGE_Hero_{revision}_WEB_{name}{'_HEVC' if efficient else ''}.mp4"
    poster = ROOT / "03_Poster" / f"LGE_Hero_{revision}_Poster_{name}.jpg"
    output.parent.mkdir(exist_ok=True)
    poster.parent.mkdir(exist_ok=True)
    temporary = output.with_suffix(".tmp.mp4")
    print(f"Assembling {name}: {(frames-fade)/fps:.3f}s", flush=True)
    encoding = edit["efficient_mobile"] if efficient else edit["encoding"][name]
    codec_options = [
        "-c:v", "libx265", "-tag:v", "hvc1", "-profile:v", "main", "-preset", "slow",
        "-crf", str(encoding["crf"]), "-x265-params",
        f"pools=3:frame-threads=2:ref={encoding['refs']}:bframes={encoding['bframes']}:keyint={encoding['gop']}:min-keyint={encoding['gop']}:scenecut=0:vbv-maxrate={encoding['maxrate'][:-1]}:vbv-bufsize={encoding['bufsize'][:-1]}:level-idc={encoding['level']}:log-level=error",
    ] if efficient else [
        "-c:v", "libx264", "-crf", str(encoding["crf"]), "-preset", "slow", "-threads", "3",
        "-maxrate", encoding["maxrate"], "-bufsize", encoding["bufsize"],
        "-profile:v", encoding["profile"], "-level:v", encoding["level"],
        "-refs", str(encoding["refs"]), "-bf", str(encoding["bframes"]),
        "-g", str(encoding["gop"]), "-keyint_min", str(encoding["gop"]), "-sc_threshold", "0",
    ]
    run([
        *inputs, "-filter_complex_threads", "1", "-filter_complex", ";".join(graph),
        "-map", "[out]", "-an", "-frames:v", str(frames-fade), "-r", str(fps),
        *codec_options, "-fps_mode", "cfr", "-video_track_timescale", "90000",
        "-pix_fmt", "yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709",
        "-colorspace", "bt709", "-movflags", "+faststart", str(temporary),
    ])
    temporary.replace(output)
    run(["-i", str(output), "-frames:v", "1", "-update", "1", "-q:v", "2", str(poster)])


def main() -> None:
    edit = json.loads((ROOT / "edit.json").read_text())
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--format", choices=edit["exports"], required=True)
    parser.add_argument("--efficient", action="store_true", help="Render the optional portrait HEVC source")
    parser.add_argument("--scene", type=int, choices=range(1, len(edit["shots"])+1), help="Prepare one scene for quality review")
    arguments = parser.parse_args()
    if arguments.efficient and arguments.format != "Mobile":
        parser.error("--efficient is available only for Mobile")
    if arguments.scene:
        index = arguments.scene - 1
        shot = shot_for_format(edit["shots"][index], arguments.format)
        source = next(source for source in edit["sources"] if source["file"] == shot["file"])
        print(prepare(arguments.format, index, shot, source, edit), flush=True)
    else:
        render(arguments.format, edit, arguments.efficient)


if __name__ == "__main__":
    main()
