"""Verify both mobile encodings and that the edit changes only the screen framing."""
from __future__ import annotations

import hashlib
import json
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def faststart(path: Path) -> bool:
    boxes = []
    with path.open('rb') as stream:
        while header := stream.read(8):
            size, kind = struct.unpack('>I4s', header)
            header_size = 8
            if size == 1:
                size = struct.unpack('>Q', stream.read(8))[0]
                header_size = 16
            boxes.append(kind)
            if not size:
                break
            stream.seek(size - header_size, 1)
    return boxes.index(b'moov') < boxes.index(b'mdat')


def main() -> None:
    edit = json.loads((ROOT / 'edit.json').read_text())
    previous = json.loads((ROOT / '../hero-video-safari/edit.json').read_text())
    assert edit['shots'][:-1] == previous['shots'][:-1]
    previous_shot = dict(previous['shots'][-1])
    previous_shot.update(mobile_focal=0.14, mobile_focal_end=0.18)
    assert edit['shots'][-1] == previous_shot
    expected = sum(shot['frames'] for shot in edit['shots']) - len(edit['shots']) * edit['transition_frames']
    results = []
    for suffix, codec, tag in [('', 'h264', 'avc1'), ('_HEVC', 'hevc', 'hvc1')]:
        path = ROOT / f'02_Web/LGE_Hero_Rev09_WEB_Mobile{suffix}.mp4'
        info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))
        assert len(info['streams']) == 1
        stream = info['streams'][0]
        assert stream['codec_name'] == codec and stream['codec_tag_string'] == tag
        assert (stream['width'], stream['height']) == (720, 1280)
        assert stream['pix_fmt'] == 'yuv420p' and stream['r_frame_rate'] == '30/1'
        assert int(stream['nb_frames']) == expected and faststart(path)
        assert abs(float(info['format']['duration']) - expected / edit['fps']) < .002
        frames = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_frames', '-show_entries', 'frame=best_effort_timestamp,key_frame', '-of', 'json', str(path)]))['frames']
        assert len(frames) == expected
        assert all(int(frame['best_effort_timestamp']) == index * 3000 for index, frame in enumerate(frames))
        keys = [index for index, frame in enumerate(frames) if frame['key_frame']]
        assert all(b-a <= 60 for a,b in zip(keys,keys[1:]))
        raw = subprocess.check_output(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-xerror', '-i', str(path), '-vf', 'scale=160:90,format=gray', '-f', 'rawvideo', '-'])
        pixels = 160 * 90
        assert len(raw) == expected * pixels
        mae = sum(abs(a-b) for a,b in zip(raw[:pixels], raw[-pixels:])) / pixels
        result = dict(codec=codec, tag=tag, profile=stream['profile'], width=720, height=1280, fps=30, frames=expected, duration=float(info['format']['duration']), bytes=path.stat().st_size, sha256=hashlib.sha256(path.read_bytes()).hexdigest(), audio=False, faststart=True, decode='passed', equal_frame_timestamps=True, max_keyframe_interval=60, loop_boundary_mae_gray_160x90=mae)
        results.append(result)
        print(f'{codec}: {expected} frames, full decode passed, {path.stat().st_size} bytes', flush=True)
    (ROOT / 'verification.json').write_text(json.dumps({'date':'2026-11-06', 'only_changed_shot':9, 'unchanged_shots':8, 'files':results}, indent=2)+'\n')


if __name__ == '__main__':
    main()
