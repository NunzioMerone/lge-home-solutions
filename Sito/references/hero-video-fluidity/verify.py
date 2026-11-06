"""Verify Rev12 sources, timing, 60 fps cadence, decoding and moving-shot continuity."""

from __future__ import annotations

import hashlib
import json
import statistics
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PIXELS = 160 * 90


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        while chunk := stream.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()


def probe(path: Path, *options: str) -> dict:
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", *options, "-of", "json", str(path),
    ]))


def has_faststart(path: Path) -> bool:
    boxes = []
    with path.open("rb") as stream:
        while header := stream.read(8):
            size, kind = struct.unpack(">I4s", header)
            header_size = 8
            if size == 1:
                size = struct.unpack(">Q", stream.read(8))[0]
                header_size = 16
            boxes.append(kind)
            if not size:
                break
            assert size >= header_size
            stream.seek(size - header_size, 1)
    return boxes.index(b"moov") < boxes.index(b"mdat")


def decode(path: Path, start: float | None = None, duration: float | None = None) -> bytes:
    selection = [] if start is None else ["-ss", str(start)]
    limit = [] if duration is None else ["-t", str(duration)]
    return subprocess.check_output([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-xerror", *selection,
        "-i", str(path), *limit, "-vf", "scale=160:90,format=gray",
        "-fps_mode", "passthrough", "-f", "rawvideo", "-",
    ])


def frame_differences(raw: bytes, repeat: int = 1) -> list[float]:
    frames = [memoryview(raw)[i:i + PIXELS] for i in range(0, len(raw), PIXELS)]
    differences = []
    for index in range(1, len(frames) * repeat):
        current, previous = frames[index // repeat], frames[(index - 1) // repeat]
        differences.append(sum(abs(a - b) for a, b in zip(current, previous)) / PIXELS)
    return differences


def temporal_summary(differences: list[float]) -> dict:
    mean = statistics.mean(differences)
    return {
        "mean_frame_difference_gray_160x90": round(mean, 4),
        "difference_coefficient_of_variation": round(statistics.pstdev(differences) / mean, 4),
        "near_identical_frame_pairs_percent": round(
            100 * sum(value < .05 for value in differences) / len(differences), 2,
        ),
    }


def main() -> None:
    edit = json.loads((ROOT / "edit.json").read_text())
    previous = json.loads((ROOT / "../hero-video-quality/edit.json").read_text())
    assert edit["fps"] == 2 * previous["fps"] == 60
    assert edit["transition_frames"] == 2 * previous["transition_frames"]
    assert len(edit["shots"]) == len(previous["shots"]) == 10
    for index, (shot, old) in enumerate(zip(edit["shots"], previous["shots"])):
        assert shot["frames"] == 2 * old["frames"]
        expected = {key: value for key, value in old.items()
                    if key not in ("frames", "previous_frames", "mobile_focal_end")}
        if index in (0, 5, 9):
            expected["mobile_focal"] = {0: .54, 5: .73, 9: .14}[index]
        assert {key: value for key, value in shot.items() if key != "frames"} == expected
    for source in edit["sources"]:
        assert sha256(ROOT / source["path"]) == source["sha256"]

    expected_frames = sum(shot["frames"] for shot in edit["shots"]) - len(edit["shots"]) * edit["transition_frames"]
    outputs = [(name, "", "h264", "avc1", size) for name, size in edit["exports"].items()]
    outputs.append(("Mobile", "_HEVC", "hevc", "hvc1", edit["exports"]["Mobile"]))
    files = []
    for name, suffix, codec, tag, size in outputs:
        path = ROOT / f"02_Web/LGE_Hero_{edit['revision']}_WEB_{name}{suffix}.mp4"
        info = probe(path, "-show_streams", "-show_format")
        assert len(info["streams"]) == 1
        stream = info["streams"][0]
        assert stream["codec_name"] == codec and stream["codec_tag_string"] == tag
        assert [stream["width"], stream["height"]] == size
        expected_level = 120 if codec == "hevc" else 41 if name == "Mobile" else 42
        assert stream["level"] == expected_level
        assert stream["profile"] == ("Main" if codec == "hevc" else "High")
        assert stream["pix_fmt"] == "yuv420p"
        assert stream["r_frame_rate"] == stream["avg_frame_rate"] == "60/1"
        assert stream["time_base"] == "1/90000"
        assert int(stream["nb_frames"]) == expected_frames and has_faststart(path)
        assert abs(float(info["format"]["duration"]) - expected_frames / 60) < .002
        frames = probe(path, "-select_streams", "v:0", "-show_frames", "-show_entries",
                       "frame=best_effort_timestamp,key_frame")["frames"]
        assert len(frames) == expected_frames
        assert all(int(frame["best_effort_timestamp"]) == index * 1500
                   for index, frame in enumerate(frames))
        keys = [index for index, frame in enumerate(frames) if frame["key_frame"]]
        max_gop = max(b - a for a, b in zip(keys, keys[1:]))
        assert max_gop <= 120
        raw = decode(path)
        assert len(raw) == expected_frames * PIXELS
        result = {
            "format": name, "codec": codec, "tag": tag, "dimensions": size,
            "profile": stream["profile"], "level": stream["level"],
            "fps": 60, "frames": expected_frames,
            "duration": float(info["format"]["duration"]), "bytes": path.stat().st_size,
            "sha256": sha256(path),
            "audio": False, "faststart": True, "decode": "passed",
            "equal_frame_timestamps": True, "max_keyframe_interval": max_gop,
            "loop_boundary_mae_gray_160x90": round(
                sum(abs(a - b) for a, b in zip(raw[:PIXELS], raw[-PIXELS:])) / PIXELS, 4,
            ),
        }
        files.append(result)
        print(f"{name} {codec}: {expected_frames} frames, full decode passed, {path.stat().st_size} bytes", flush=True)

    # Compare the old 30 fps presentation held on a 60 Hz display with new 60 fps.
    # Image differences are a cadence diagnostic, not a subjective quality score.
    comparisons = []
    samples = {"Desktop": [(3, 15), (4, 22), (7, 38)], "Mobile": [(1, 3), (4, 22), (10, 53)]}
    for name, scenes in samples.items():
        before = ROOT / f"../hero-video-quality/02_Web/LGE_Hero_Rev11_WEB_{name}.mp4"
        after = ROOT / f"02_Web/LGE_Hero_Rev12_WEB_{name}.mp4"
        for scene, start in scenes:
            comparisons.append({
                "format": name, "scene": scene, "interval_seconds": [start, start + 2],
                "before_30fps_on_60hz": temporal_summary(frame_differences(decode(before, start, 2), repeat=2)),
                "after_60fps": temporal_summary(frame_differences(decode(after, start, 2))),
            })
    report = {"date": "2026-11-06", "revision": edit["revision"], "same_scenes_and_source_intervals": True,
              "portrait_crop_drifts_removed": [1, 6, 10], "files": files, "temporal_samples": comparisons,
              "limits": "Optical-flow estimates; source camera shake and source softness cannot be fully recovered. Browser checks are separate; no physical iPhone test."}
    (ROOT / "verification.json").write_text(json.dumps(report, indent=2) + "\n")


if __name__ == "__main__":
    main()
