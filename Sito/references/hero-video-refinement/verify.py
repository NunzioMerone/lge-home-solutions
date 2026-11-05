"""Check completed exports independently of the renderer, including a full decode."""

from __future__ import annotations

import hashlib
import json
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def faststart(path: Path) -> bool:
    boxes: list[bytes] = []
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
            stream.seek(size - header_size, 1)
    return b"moov" in boxes and b"mdat" in boxes and boxes.index(b"moov") < boxes.index(b"mdat")


def main() -> None:
    edit = json.loads((ROOT / "edit.json").read_text())
    expected_frames = sum(shot["frames"] for shot in edit["shots"]) - len(edit["shots"]) * edit["transition_frames"]
    results = []
    for name, (width, height) in edit["exports"].items():
        path = ROOT / "02_Web" / f"LGE_Hero_Rev05_WEB_{name}.mp4"
        info = json.loads(subprocess.check_output([
            "ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path),
        ]))
        streams = info["streams"]
        assert len(streams) == 1 and streams[0]["codec_type"] == "video", name
        video = streams[0]
        assert (video["width"], video["height"]) == (width, height), name
        assert video["codec_name"] == "h264" and video["pix_fmt"] == "yuv420p", name
        assert video["r_frame_rate"] == f"{edit['fps']}/1", name
        assert int(video["nb_frames"]) == expected_frames, name
        assert abs(float(info["format"]["duration"]) - expected_frames / edit["fps"]) < .002, name
        assert faststart(path), name
        # Decode every frame; downscale only after decoding, keeping the check inexpensive.
        raw = subprocess.check_output([
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-xerror", "-i", str(path),
            "-vf", "scale=160:90,format=gray", "-f", "rawvideo", "-",
        ])
        pixels = 160 * 90
        assert len(raw) == pixels * expected_frames, name
        first, last = raw[:pixels], raw[-pixels:]
        mae = sum(abs(a-b) for a, b in zip(first, last)) / pixels
        result = {
            "format": name, "width": width, "height": height, "fps": edit["fps"],
            "frames": expected_frames, "duration": float(info["format"]["duration"]),
            "website_duration": expected_frames / edit["fps"] / edit["website_playback_rate"],
            "bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "audio": False, "decode": "passed", "faststart": True,
            "loop_boundary_mae_gray_160x90": mae,
        }
        results.append(result)
        print(f"{name}: decode passed, {expected_frames} frames, {result['bytes']} bytes", flush=True)
    (ROOT / "verification.json").write_text(json.dumps({"checked": "2026-11-05", "files": results}, indent=2) + "\n")


if __name__ == "__main__":
    main()
