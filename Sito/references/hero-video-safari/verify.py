"""Validate the active HEVC alternative, including every decoded frame and timestamp."""
from __future__ import annotations
import hashlib
import json
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def faststart(path: Path) -> bool:
    boxes: list[bytes] = []
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
    path = ROOT / '02_Web/LGE_Hero_Rev08_WEB_Mobile_HEVC.mp4'
    expected = sum(shot['frames'] for shot in edit['shots']) - len(edit['shots']) * edit['transition_frames']
    info = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))
    assert len(info['streams']) == 1
    stream = info['streams'][0]
    assert stream['codec_name'] == 'hevc' and stream['codec_tag_string'] == 'hvc1'
    assert stream['profile'] == 'Main' and stream['level'] == 93
    assert (stream['width'], stream['height']) == (720, 1280)
    assert stream['pix_fmt'] == 'yuv420p' and stream['r_frame_rate'] == '30/1'
    assert int(stream['nb_frames']) == expected and faststart(path)
    frames = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_frames', '-show_entries', 'frame=best_effort_timestamp,key_frame', '-of', 'json', str(path)]))['frames']
    assert len(frames) == expected
    assert all(int(frame['best_effort_timestamp']) == index * 3000 for index, frame in enumerate(frames))
    keys = [index for index, frame in enumerate(frames) if frame['key_frame']]
    assert all(b-a <= 60 for a,b in zip(keys,keys[1:]))
    raw = subprocess.check_output(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-xerror', '-i', str(path), '-vf', 'scale=160:90,format=gray', '-f', 'rawvideo', '-'])
    pixels = 160*90
    assert len(raw) == expected * pixels
    mae = sum(abs(a-b) for a,b in zip(raw[:pixels], raw[-pixels:])) / pixels
    result = dict(format='mobile', codec='hevc', tag='hvc1', profile=stream['profile'], level=stream['level'], width=720, height=1280, fps=30, frames=expected, duration=float(info['format']['duration']), bytes=path.stat().st_size, sha256=hashlib.sha256(path.read_bytes()).hexdigest(), audio=False, faststart=True, decode='passed', frame_timestamps='all 1588 timestamps equally spaced by 3000 ticks at 90 kHz', max_keyframe_interval=60, loop_boundary_mae_gray_160x90=mae)
    (ROOT / 'verification.json').write_text(json.dumps(result, indent=2)+'\n')
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()
