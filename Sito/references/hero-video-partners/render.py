"""Render a partner edit for the homepage. Requires FFmpeg, cwebp for WebP posters, and the local originals."""

from __future__ import annotations

import argparse
import json
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[1]


def ffmpeg(arguments: list[str]) -> None:
    subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y", *arguments], check=True)


def source_frames(shot: dict, source_fps: int) -> int:
    return round((shot["end"] - shot["start"]) * source_fps)


def frame_at(source_frame: int, edit: dict) -> int:
    return round(source_frame * edit["outputFrameRate"] / edit["frameRate"])


def timeline(edit: dict) -> list[tuple[int, int]]:
    end = 0
    intervals = []
    for shot in edit["shots"]:
        begin = end - shot["incomingFadeFrames"] if intervals else 0
        end = begin + shot.get("playbackFrames", source_frames(shot, edit["frameRate"]))
        # Round absolute times so adjacent overlaps never accumulate a frame of drift.
        intervals.append((frame_at(begin, edit), frame_at(end, edit)))
    return intervals


def source_library(path: Path) -> dict:
    recipe = json.loads(path.read_text())
    if "baseEdit" not in recipe:
        return recipe

    base = source_library(path.with_name(recipe["baseEdit"]))
    encodes = {
        name: {**profile, **recipe.get("encodes", {}).get(name, {})}
        for name, profile in base["encodes"].items()
    }
    # Keep original shot numbers stable across successive edits.
    return {**base, **recipe, "encodes": encodes, "shots": base["shots"] + recipe.get("additionalShots", [])}


def load_edit(path: Path) -> dict:
    recipe = source_library(path)
    if "baseEdit" not in recipe:
        return recipe

    chapters = recipe["chapters"]
    source_shots = recipe["shots"]
    # Shot numbers refer to the combined source list, starting at one.
    order = [number for chapter in chapters.values() for number in chapter["shots"]]
    if sorted(order + recipe.get("omittedShots", [])) != list(range(1, len(source_shots) + 1)):
        raise ValueError("Every source shot must be included exactly once or explicitly omitted.")

    edit = {**recipe, "shots": [source_shots[i - 1] for i in order]}
    intervals = timeline(edit)
    index = 0
    for name, chapter in chapters.items():
        if not chapter["shots"]:
            raise ValueError(f"Chapter {name!r} has no shots.")
        first_begin, first_end = intervals[index]
        # The default cue sits at the midpoint of the incoming dissolve.
        start = (first_begin + intervals[index - 1][1] + 1) // 2 if index else 0
        if "headlineOffsetFrames" in chapter:
            start = first_begin + chapter["headlineOffsetFrames"]
            if not first_begin <= start < first_end:
                raise ValueError(f"Chapter {name!r} headline must begin during its first shot.")
        if chapter["startFrame"] != start:
            raise ValueError(f"Chapter {name!r} must start at frame {start}.")
        if continuation := chapter.get("continuation"):
            if not 0 < continuation["delayFrames"] < first_end - start:
                raise ValueError(f"Chapter {name!r} headline continuation must begin during its first shot.")
        index += len(chapter["shots"])

    duration = intervals[-1][1]
    loop_start = duration - frame_at(edit["loopPrerollFrames"], edit)
    if (recipe["outputFrameRate"], recipe["durationFrames"], recipe["loopStartFrame"]) != (
        edit["outputFrameRate"], duration, loop_start,
    ):
        raise ValueError(f"Expected {edit['outputFrameRate']} fps, {duration} frames and loop at {loop_start}.")
    return edit


def prepare_shot(index: int, cache: Path, edit: dict, intervals: list[tuple[int, int]]) -> Path:
    shots = edit["shots"]
    shot = shots[index]
    source = edit["sources"][shot["source"]]
    source_dir = SITE.parent / edit["sourceDirectory"]
    source_fps = edit["frameRate"]
    fps = edit["outputFrameRate"]
    path = cache / f"shot-{index:02d}.mkv"
    preroll = edit["loopPrerollFrames"] if index == 0 else 0
    start = shot["start"] - preroll / source_fps
    length = source_frames(shot, source_fps)
    original = length + preroll
    playback = shot.get("playbackFrames", length) + preroll
    begin, end = intervals[index]
    frames = end - begin + frame_at(preroll, edit)
    filters = [f"fps={source_fps}", f"trim=end_frame={original}"]
    if "crop" in shot:
        filters.append("crop=" + ":".join(map(str, shot["crop"])))
    if "workingSize" in source:
        # Retain enough of the 4K original to extract a native 720x1280 portrait.
        width, height = source["workingSize"]
        filters.append(f"scale={width}:{height}:flags=lanczos")
    filters.extend([
        "setsar=1", "settb=1/90000",
        f"setpts=N*{playback}*90000/({original}*{source_fps})",
        "tpad=stop_mode=clone:stop_duration=0.4",
        f"minterpolate=fps={fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
        f"trim=end_frame={frames}", f"settb=1/{fps}", "setpts=N",
    ])
    grade = shot.get("grade", source.get("grade"))
    if grade:
        filters.append(grade)
    ffmpeg([
        "-threads", "2", "-ss", f"{start:.4f}", "-t", f"{(original + 3) / source_fps:.4f}",
        "-i", str(source_dir / source["file"]), "-an", "-filter_threads", "1", "-vf", ",".join(filters),
        "-frames:v", str(frames), "-c:v", "libx264", "-crf", "10", "-preset", "ultrafast",
        "-threads", "2", "-pix_fmt", "yuv420p", str(path),
    ])
    print(f"Ready {index + 1:02d}/{len(shots)} – {shot['description']}", flush=True)
    return path


def shot_framing(shot: dict, layout: str, width: int, height: int) -> str:
    center = shot["centerX"].get(layout, 0.5)
    crop = f"crop='min(iw,ih*{width}/{height})':ih:'clip(iw*{center}-ow/2,0,iw-ow)':0"
    return f"{crop},scale={width}:{height}:flags=lanczos,setsar=1"


def webp_poster(first_shot: Path, target: Path, edit: dict, layout: str) -> None:
    # Match the first visible frame and crop, before the final video compression.
    preroll = frame_at(edit["loopPrerollFrames"], edit)
    framing = shot_framing(edit["shots"][0], layout, *edit["encodes"][layout]["size"])
    image = subprocess.check_output([
        "ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-i", str(first_shot),
        "-vf", f"trim=start_frame={preroll},{framing},format=rgb24", "-frames:v", "1",
        "-f", "image2pipe", "-c:v", "png", "pipe:1",
    ])
    subprocess.run([
        "cwebp", "-quiet", "-q", str(edit["posterWebpQuality"]), "-m", "6", "-sharp_yuv",
        "-o", str(target), "--", "-",
    ], input=image, check=True)


def compose(name: str, paths: list[Path], destination: Path, edit: dict, intervals: list[tuple[int, int]]) -> None:
    efficient = name == "mobile-hevc"
    layout = "mobile" if efficient else name
    profile = edit["encodes"][name]
    fps = edit["outputFrameRate"]
    width, height = profile["size"]
    inputs, graph = [], []
    for i, (shot, path) in enumerate(zip(edit["shots"], paths)):
        inputs.extend(["-threads", "1", "-i", str(path)])
        graph.append(
            f"[{i}:v]fps={fps},{shot_framing(shot, layout, width, height)},"
            f"format=yuv444p,settb=1/{fps},setpts=N[s{i}]"
        )

    loop = frame_at(edit["loopPrerollFrames"], edit)
    graph.extend([
        "[s0]split[open][preroll]",
        f"[open]trim=start_frame={loop},setpts=PTS-STARTPTS[body0]",
        f"[preroll]trim=end_frame={loop},setpts=PTS-STARTPTS[head]",
    ])
    previous = "body0"
    for i, (begin, _) in enumerate(intervals[1:], 1):
        overlap = intervals[i - 1][1] - begin
        graph.append(
            f"[{previous}][s{i}]xfade=duration={overlap / fps:.8f}:offset={begin / fps:.8f}[body{i}]"
        )
        previous = f"body{i}"
    frames = intervals[-1][1]
    graph.append(
        f"[{previous}][head]xfade=duration={loop / fps:.8f}:offset={(frames - loop) / fps:.8f},"
        "format=yuv420p[out]"
    )
    rate = profile["maxrateKbps"]
    preset = edit.get("encoderPreset", "medium")
    # Keep 720p/portrait AVC decodable on mobile, including older Safari.
    if efficient:
        codec = [
            "-c:v", "libx265", "-tag:v", "hvc1", "-preset", preset,
            "-x265-params", "pools=2:frame-threads=2:ref=2:bframes=2:level-idc=4.0:log-level=error",
        ]
    else:
        level = "4.2" if width * height > 1280 * 720 else "4.1"
        codec = ["-c:v", "libx264", "-profile:v", "high", "-level:v", level, "-preset", preset, "-threads", "4", "-refs", "3"]
    stem = f"hero-{layout}-{edit['revision']}"
    target = destination / (stem + ("-hevc.mp4" if efficient else ".mp4"))
    temp = target.with_suffix(".tmp.mp4")
    ffmpeg([
        *inputs, "-filter_complex_threads", "2", "-filter_complex", ";".join(graph),
        "-map", "[out]", "-an", *codec, "-crf", str(profile["crf"]), "-maxrate", f"{rate}k",
        "-bufsize", f"{rate * 2}k", "-g", str(2 * fps), "-pix_fmt", "yuv420p",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
        "-fps_mode", "cfr", "-r", str(fps), "-frames:v", str(frames), "-video_track_timescale", "90000",
        "-movflags", "+faststart", str(temp),
    ])
    temp.replace(target)
    if not efficient and "posterWebpQuality" in edit:
        webp_poster(paths[0], destination / (stem + "-poster.webp"), edit, layout)
    elif not efficient:
        ffmpeg(["-i", str(target), "-frames:v", "1", "-q:v", "2", str(destination / (stem + "-poster.jpg"))])
    print(f"Encoded {target.name}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--edit", type=Path, default=HERE / "edit-rev25.json", help="Editing recipe to render.")
    parser.add_argument("--destination", type=Path, default=SITE / "public/media/hero")
    parser.add_argument("--work-dir", type=Path, help="Keep prepared shots here for inspection.")
    args = parser.parse_args()
    edit = load_edit(args.edit)
    intervals = timeline(edit)
    args.destination.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        cache = args.work_dir or Path(tmp)
        cache.mkdir(parents=True, exist_ok=True)
        with ThreadPoolExecutor(max_workers=4) as pool:
            shots = list(pool.map(lambda i: prepare_shot(i, cache, edit, intervals), range(len(edit["shots"]))))
        with ThreadPoolExecutor(max_workers=2) as pool:
            list(pool.map(lambda name: compose(name, shots, args.destination, edit, intervals), edit["encodes"]))


if __name__ == "__main__":
    main()
