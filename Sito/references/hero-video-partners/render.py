"""Render the approved partner edit for the homepage. Requires FFmpeg and the local originals."""

from __future__ import annotations

import argparse
import json
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[1]
EDIT = json.loads((HERE / "edit-rev21.json").read_text())
SOURCE_DIR = SITE.parent / EDIT["sourceDirectory"]
SOURCE_FPS = EDIT["frameRate"]
FPS = EDIT["outputFrameRate"]
PREROLL = EDIT["loopPrerollFrames"]
SHOTS = EDIT["shots"]


def ffmpeg(arguments: list[str]) -> None:
    subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y", *arguments], check=True)


def source_frames(shot: dict) -> int:
    return round((shot["end"] - shot["start"]) * SOURCE_FPS)


def frame_at(source_frame: int) -> int:
    return round(source_frame * FPS / SOURCE_FPS)


def timeline() -> list[tuple[int, int]]:
    end = 0
    intervals = []
    for shot in SHOTS:
        begin = end - shot["incomingFadeFrames"]
        end = begin + shot.get("playbackFrames", source_frames(shot))
        # Round absolute times so adjacent overlaps never accumulate a frame of drift.
        intervals.append((frame_at(begin), frame_at(end)))
    return intervals


INTERVALS = timeline()


def prepare_shot(index: int, cache: Path) -> Path:
    shot = SHOTS[index]
    source = EDIT["sources"][shot["source"]]
    path = cache / f"shot-{index:02d}.mkv"
    preroll = PREROLL if index == 0 else 0
    start = shot["start"] - preroll / SOURCE_FPS
    original = source_frames(shot) + preroll
    playback = shot.get("playbackFrames", source_frames(shot)) + preroll
    begin, end = INTERVALS[index]
    frames = end - begin + frame_at(preroll)
    filters = [f"fps={SOURCE_FPS}", f"trim=end_frame={original}"]
    if "crop" in shot:
        filters.append("crop=" + ":".join(map(str, shot["crop"])))
    if "workingSize" in source:
        # Retain enough of the 4K original to extract a native 720x1280 portrait.
        width, height = source["workingSize"]
        filters.append(f"scale={width}:{height}:flags=lanczos")
    filters.extend([
        "setsar=1", "settb=1/90000",
        f"setpts=N*{playback}*90000/({original}*{SOURCE_FPS})",
        "tpad=stop_mode=clone:stop_duration=0.4",
        f"minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:me=hexbs:vsbmc=1",
        f"trim=end_frame={frames}", f"settb=1/{FPS}", "setpts=N",
    ])
    grade = shot.get("grade", source.get("grade"))
    if grade:
        filters.append(grade)
    ffmpeg([
        "-threads", "2", "-ss", f"{start:.4f}", "-t", f"{(original + 3) / SOURCE_FPS:.4f}",
        "-i", str(SOURCE_DIR / source["file"]), "-an", "-filter_threads", "1", "-vf", ",".join(filters),
        "-frames:v", str(frames), "-c:v", "libx264", "-crf", "10", "-preset", "ultrafast",
        "-threads", "2", "-pix_fmt", "yuv420p", str(path),
    ])
    print(f"Ready {index + 1:02d}/{len(SHOTS)} – {shot['description']}", flush=True)
    return path


def compose(name: str, paths: list[Path], destination: Path) -> None:
    efficient = name == "mobile-hevc"
    layout = "mobile" if efficient else name
    profile = EDIT["encodes"][name]
    width, height = profile["size"]
    inputs, graph = [], []
    for i, (shot, path) in enumerate(zip(SHOTS, paths)):
        inputs.extend(["-threads", "1", "-i", str(path)])
        center = shot["centerX"].get(layout, 0.5)
        crop = f"crop='min(iw,ih*{width}/{height})':ih:'clip(iw*{center}-ow/2,0,iw-ow)':0"
        graph.append(
            f"[{i}:v]fps={FPS},{crop},scale={width}:{height}:flags=lanczos,setsar=1,"
            f"format=yuv444p,settb=1/{FPS},setpts=N[s{i}]"
        )

    loop = frame_at(PREROLL)
    graph.extend([
        "[s0]split[open][preroll]",
        f"[open]trim=start_frame={loop},setpts=PTS-STARTPTS[body0]",
        f"[preroll]trim=end_frame={loop},setpts=PTS-STARTPTS[head]",
    ])
    previous = "body0"
    for i, (begin, _) in enumerate(INTERVALS[1:], 1):
        overlap = INTERVALS[i - 1][1] - begin
        graph.append(
            f"[{previous}][s{i}]xfade=duration={overlap / FPS:.8f}:offset={begin / FPS:.8f}[body{i}]"
        )
        previous = f"body{i}"
    frames = INTERVALS[-1][1]
    graph.append(
        f"[{previous}][head]xfade=duration={loop / FPS:.8f}:offset={(frames - loop) / FPS:.8f},"
        "format=yuv420p[out]"
    )
    rate = profile["maxrateKbps"]
    # Keep 720p/portrait AVC decodable on mobile, including older Safari.
    if efficient:
        codec = [
            "-c:v", "libx265", "-tag:v", "hvc1", "-preset", "medium",
            "-x265-params", "pools=2:frame-threads=2:ref=2:bframes=2:level-idc=4.0:log-level=error",
        ]
    else:
        level = "4.2" if width * height > 1280 * 720 else "4.1"
        codec = ["-c:v", "libx264", "-profile:v", "high", "-level:v", level, "-preset", "medium", "-threads", "4", "-refs", "3"]
    stem = f"hero-{layout}-{EDIT['revision']}"
    target = destination / (stem + ("-hevc.mp4" if efficient else ".mp4"))
    temp = target.with_suffix(".tmp.mp4")
    ffmpeg([
        *inputs, "-filter_complex_threads", "2", "-filter_complex", ";".join(graph),
        "-map", "[out]", "-an", *codec, "-crf", str(profile["crf"]), "-maxrate", f"{rate}k",
        "-bufsize", f"{rate * 2}k", "-g", str(2 * FPS), "-pix_fmt", "yuv420p",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
        "-fps_mode", "cfr", "-r", str(FPS), "-frames:v", str(frames), "-video_track_timescale", "90000",
        "-movflags", "+faststart", str(temp),
    ])
    temp.replace(target)
    if not efficient:
        ffmpeg(["-i", str(target), "-frames:v", "1", "-q:v", "2", str(destination / (stem + "-poster.jpg"))])
    print(f"Encoded {target.name}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--destination", type=Path, default=SITE / "public/media/hero")
    parser.add_argument("--work-dir", type=Path, help="Keep prepared shots here for inspection.")
    args = parser.parse_args()
    args.destination.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        cache = args.work_dir or Path(tmp)
        cache.mkdir(parents=True, exist_ok=True)
        with ThreadPoolExecutor(max_workers=4) as pool:
            shots = list(pool.map(lambda i: prepare_shot(i, cache), range(len(SHOTS))))
        with ThreadPoolExecutor(max_workers=2) as pool:
            list(pool.map(lambda name: compose(name, shots, args.destination), EDIT["encodes"]))


if __name__ == "__main__":
    main()
