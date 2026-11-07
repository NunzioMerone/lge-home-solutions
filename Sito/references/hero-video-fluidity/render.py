"""Render a hero edit at 60 fps with a separate composition for each format."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
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


def camera_progress(frames: int) -> str:
    progress = f"(on/{max(1, frames - 1)})"
    return f"({progress}*{progress}*(3-2*{progress}))"


def camera_push_filter(push: list[float], frames: int) -> str:
    amount, focus_x, focus_y = push
    ease = camera_progress(frames)
    inset = f"(1-1/(1+{amount}*{ease}))"
    left, right = f"W*{focus_x}*{inset}", f"W*(1-{1-focus_x}*{inset})"
    top, bottom = f"H*{focus_y}*{inset}", f"H*(1-{1-focus_y}*{inset})"
    # Sample fractional source coordinates to avoid pixel steps during the move.
    return (
        f"perspective=sense=source:eval=frame:interpolation=cubic:"
        f"x0={left}:x1={right}:x2={left}:x3={right}:"
        f"y0={top}:y1={top}:y2={bottom}:y3={bottom}"
    )


def compose_portrait(
    portrait: Path, target: Path, width: int, height: int, shot: dict, fps: int,
) -> None:
    keep, focal_y = shot["portrait_panel"]
    desktop = width / height > 1.5
    mobile = width < height
    if mobile:
        keep, focal_y = 1, 0.5
        panel_width = round(width * 0.82 / 2) * 2
        panel_height = round(height * panel_width / width / 2) * 2
        panel_x = (width - panel_width) // 2
        panel_y = round((height - panel_height) * shot["mobile_panel"])
    else:
        panel_ratio = 720 / (1280 * keep)
        panel_width = min(round(height * panel_ratio / 2) * 2, 860 if desktop else 608)
        panel_height = min(round(panel_width / panel_ratio / 2) * 2, height)
        panel_x = round(width * (0.65 if desktop else 0.52) - panel_width / 2)
        panel_y = min((height - panel_height) // 2 + (0 if desktop else 40), height - panel_height)
    edge = "min(X,W-1-X)"
    if panel_height < height:
        edge = f"min({edge},min(Y,H-1-Y))"
    graph = ";".join([
        "[0:v]split[back][front]",
        f"[back]crop=iw:iw*{height}/{width}:0:(ih-oh)*{focal_y},"
        f"scale=160:-2,gblur=sigma=16,scale={width}:{height},eq=brightness=-0.13[base]",
        f"[front]crop=iw:ih*{keep}:0:(ih-oh)*{focal_y},"
        f"scale={panel_width}:{panel_height}:flags=lanczos,setsar=1[panel]",
        f"color=white:s={panel_width}x{panel_height}:r={fps}:d={1 / fps},format=gray,"
        f"geq=lum='255*min(1,{edge}/36)'[mask]",
        "[panel][mask]alphamerge[soft]",
        f"[base][soft]overlay=x={panel_x}:y={panel_y}:format=yuv420,setsar=1[out]",
    ])
    run([
        "-threads", "2", "-i", str(portrait),
        "-filter_complex_threads", "1", "-filter_complex", graph,
        "-map", "[out]", "-an", "-frames:v", str(shot["frames"]),
        "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-threads", "2", str(target),
    ])


def prepare(name: str, index: int, shot: dict, source: dict, edit: dict) -> Path:
    width, height = edit["exports"][name]
    fps = edit["fps"]
    shot = {key: value for key, value in shot.items() if key != "transition_frames"}
    if name != "Mobile":
        shot.pop("mobile_panel", None)
    cache_key = [PIPELINE_VERSION, shot, source, width, height, fps]
    if name != "Mobile" and "portrait_panel" in shot:
        cache_key.append("wide-portrait-panel-2")
    identity = json.dumps(cache_key, sort_keys=True)
    key = hashlib.sha256(identity.encode()).hexdigest()[:16]
    cache_format = edit.get("cache_formats", {}).get(name, name)
    target = ROOT / edit.get("cache_directory", ".prepared") / cache_format / f"{key}.mp4"
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        return target
    temporary = target.with_suffix(f".{os.getpid()}.tmp.mp4")

    if (name != "Mobile" and "portrait_panel" in shot) or "mobile_panel" in shot:
        native_shot = {key: value for key, value in shot.items() if key != "mobile_panel"}
        portrait = prepare("Mobile", index, native_shot, source, edit)
        compose_portrait(portrait, temporary, width, height, shot, fps)
        temporary.replace(target)
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
    panels = shot.get("source_panels")
    cleanup = shot.get("cleanup")
    focal_y = shot.get("focal_y", 0.5)
    end_y = shot.get("focal_y_end")
    if cleanup:
        filters.append("deblock=filter=weak:block=8:alpha=0.045:beta=0.035:gamma=0.02:delta=0.02")
    if shot.get("source_crop"):
        filters.append(f"crop={shot['source_crop']}")
    if not panels:
        crop_height = work_height if end_y is None else "ih"
        filters.extend([
            scale_filter,
            f"crop={work_width}:{crop_height}:(iw-ow)*{focal}:(ih-oh)*{focal_y}",
        ])
    filters.extend([
        "setsar=1", f"setpts=PTS/{shot['speed']}",
        f"tpad=stop_mode=clone:stop_duration={shot.get('tail_pad_seconds', 0.3)}",
        f"minterpolate=fps={fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
        f"trim=end_frame={shot['frames']}", "setpts=PTS-STARTPTS",
    ])
    if end_y is not None:
        # Move the crop after interpolation so motion estimation sees the original scene.
        y = f"(H-{work_height})*({focal_y}+{end_y-focal_y}*{camera_progress(shot['frames'])})"
        bottom = f"{y}+{work_height}"
        filters.append(
            f"perspective=sense=source:eval=frame:interpolation=cubic:"
            f"y0={y}:y1={y}:y2={bottom}:y3={bottom}"
        )
    warmth = shot.get("warmth", 0.5)
    filters.extend([
        f"colorbalance={shot['color_balance']}" if shot.get("color_balance") else f"colorbalance=rs={.006*warmth}:bs={-.004*warmth}:rm={.018*warmth}:gm={.003*warmth}:bm={-.016*warmth}",
        "eq=saturation=1.015:contrast=1.005",
        f"scale={width}:{height}:flags=lanczos",
    ])
    if push := shot.get("camera_push"):
        filters.append(camera_push_filter(push, shot["frames"]))
    if cleanup:
        filters.append(f"cas=strength={cleanup}:planes=1")
    filters.extend(["setsar=1", "format=yuv420p"])
    video_filter = ["-filter_threads", "2", "-vf", ",".join(filters)]
    if panels:
        left, right = panels
        # Compose two undistorted crops of the same moment before retiming it.
        panel_width = min(width // 2, *(int(panel.split(":")[0]) for panel in panels))
        panel_width = panel_width // 2 * 2
        panel_height = round(panel_width * height / width) * 2
        panel_scale = f"scale={panel_width}:{panel_height}:flags=lanczos,setsar=1"
        graph = ";".join([
            "[0:v]split[left][right]",
            f"[left]crop={left},{panel_scale}[a]",
            f"[right]crop={right},{panel_scale}[b]",
            f"[a][b]hstack=inputs=2,{','.join(filters)}[out]",
        ])
        video_filter = ["-filter_complex_threads", "2", "-filter_complex", graph, "-map", "[out]"]
    print(f"{name} {index+1}/{len(edit['shots'])}: {shot['description']}", flush=True)
    run([
        "-threads", "2", "-ss", str(shot["start"]), "-t", str(source_duration + .3),
        "-i", str(ROOT / source["path"]), *video_filter, "-an", "-frames:v", str(shot["frames"]),
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
        overlap = shot.get("transition_frames", fade)
        label = f"mix{index}"
        graph.append(f"[{previous}][c{index}]xfade=transition=fade:duration={overlap/fps}:offset={(frames-overlap)/fps}[{label}]")
        frames += shot["frames"] - overlap
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
        "-c:v", "libx265", "-tag:v", "hvc1", "-profile:v", "main", "-preset", encoding.get("preset", "slow"),
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
    recipe_parser = argparse.ArgumentParser(add_help=False)
    recipe_parser.add_argument(
        "--edit", type=Path, default=ROOT / "edit.json", help="Path to an edit recipe",
    )
    recipe_args, _ = recipe_parser.parse_known_args()
    edit = json.loads(recipe_args.edit.read_text())
    parser = argparse.ArgumentParser(description=__doc__, parents=[recipe_parser])
    parser.add_argument("--format", choices=edit["exports"], required=True)
    parser.add_argument("--efficient", action="store_true", help="Render the optional portrait HEVC source")
    parser.add_argument("--scene", type=int, choices=range(1, len(edit["shots"])+1), help="Prepare one scene for quality review")
    parser.add_argument(
        "--omit-scenes", type=int, nargs="+", choices=range(1, len(edit["shots"]) + 1),
        help="Omit the listed original scene numbers from a new revision",
    )
    parser.add_argument("--revision", help="Output revision for an alternate edit, e.g. Rev13")
    arguments = parser.parse_args()
    if arguments.efficient and arguments.format != "Mobile":
        parser.error("--efficient is available only for Mobile")
    if arguments.omit_scenes:
        if arguments.scene:
            parser.error("--omit-scenes applies to the full edit")
        if (
            not arguments.revision
            or not re.fullmatch(r"Rev[0-9]+", arguments.revision)
            or arguments.revision == edit["revision"]
        ):
            parser.error("--omit-scenes requires a different --revision in Rev<number> format")
        omitted = set(arguments.omit_scenes)
        edit["shots"] = [
            shot for number, shot in enumerate(edit["shots"], 1) if number not in omitted
        ]
        if len(edit["shots"]) < 2:
            parser.error("At least two scenes must remain to build the loop")
        edit["revision"] = arguments.revision
    elif arguments.revision:
        parser.error("--revision requires --omit-scenes")
    if arguments.scene:
        index = arguments.scene - 1
        shot = shot_for_format(edit["shots"][index], arguments.format)
        source = next(source for source in edit["sources"] if source["file"] == shot["file"])
        print(prepare(arguments.format, index, shot, source, edit), flush=True)
    else:
        render(arguments.format, edit, arguments.efficient)


if __name__ == "__main__":
    main()
