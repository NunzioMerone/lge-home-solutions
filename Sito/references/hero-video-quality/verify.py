"""Independently verify source selection, responsive framing, cadence and complete decoding."""
from __future__ import annotations

import hashlib
import json
import struct
import subprocess
from pathlib import Path

from render import shot_for_format

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
    previous = json.loads((ROOT / '../hero-video-pinterest/edit.json').read_text())
    sources = {source['file']: source for source in edit['sources']}
    retained = [shot for shot in edit['shots'] if not shot.get('variants')]
    assert retained == [shot for shot in previous['shots'] if not shot['file'].startswith('pin-')]
    framing = []
    for source in sources.values():
        assert hashlib.sha256((ROOT/source['path']).read_bytes()).hexdigest() == source['sha256']
    for name, (width, height) in edit['exports'].items():
        for index, original in enumerate(edit['shots']):
            shot = shot_for_format(original, name)
            assert shot['frames'] == original['frames']
            assert shot['file'] != 'pexels-9583985-glass-door-4k.mp4'
            source = sources[shot['file']]
            if shot['file'].startswith('pin-'):
                assert name == 'Mobile'
                assert (width, height) == tuple(source['dimensions'])
                # The rejected macro and dark living-room intervals must never return.
                if shot['file'] == 'pin-1.mp4':
                    assert shot['start'] >= 23.96
                    assert shot['start'] + shot['frames']/edit['fps']*shot['speed'] < 26
            sw, sh = ([int(value) for value in shot['source_crop'].split(':')[:2]]
                      if shot.get('source_crop') else source['dimensions'])
            crop_height = min(sh, sw*height/width)
            crop_width = crop_height*width/height
            framing.append(dict(format=name,scene=index+1,source=shot['file'],
                                usable_source_pixels=[round(crop_width),round(crop_height)],
                                enlargement=round(max(width/crop_width,height/crop_height),3)))
    expected = sum(shot['frames'] for shot in edit['shots']) - len(edit['shots'])*edit['transition_frames']
    outputs = [(name, '', 'h264', 'avc1', size) for name,size in edit['exports'].items()]
    outputs.append(('Mobile', '_HEVC', 'hevc', 'hvc1', edit['exports']['Mobile']))
    results = []
    for name, suffix, codec, tag, size in outputs:
        path = ROOT / f'02_Web/LGE_Hero_Rev11_WEB_{name}{suffix}.mp4'
        info = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
        assert len(info['streams']) == 1
        stream = info['streams'][0]
        assert stream['codec_name'] == codec and stream['codec_tag_string'] == tag
        assert [stream['width'],stream['height']] == size
        assert stream['pix_fmt'] == 'yuv420p' and stream['r_frame_rate'] == '30/1'
        assert int(stream['nb_frames']) == expected and faststart(path)
        assert abs(float(info['format']['duration'])-expected/edit['fps']) < .002
        frames = json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp,key_frame','-of','json',str(path)]))['frames']
        assert len(frames) == expected
        assert all(int(frame['best_effort_timestamp']) == index*3000 for index,frame in enumerate(frames))
        keys = [index for index,frame in enumerate(frames) if frame['key_frame']]
        assert all(b-a <= 60 for a,b in zip(keys,keys[1:]))
        raw = subprocess.check_output(['ffmpeg','-hide_banner','-loglevel','error','-xerror','-i',str(path),'-vf','scale=160:90,format=gray','-f','rawvideo','-'])
        pixels = 160*90
        assert len(raw) == expected*pixels
        result = dict(format=name,codec=codec,tag=tag,width=size[0],height=size[1],fps=30,frames=expected,
                      duration=float(info['format']['duration']),bytes=path.stat().st_size,
                      sha256=hashlib.sha256(path.read_bytes()).hexdigest(),audio=False,faststart=True,
                      decode='passed',equal_frame_timestamps=True,max_keyframe_interval=60,
                      loop_boundary_mae_gray_160x90=sum(abs(a-b) for a,b in zip(raw[:pixels],raw[-pixels:]))/pixels)
        results.append(result)
        print(f'{name} {codec}: {expected} frames, full decode passed, {path.stat().st_size} bytes',flush=True)
    (ROOT/'verification.json').write_text(json.dumps(dict(date='2026-11-06',unchanged_shots=len(retained),
        removed=['old brass-handle door','macro wood profile','dark living-room excerpt'],framing=framing,files=results),indent=2)+'\n')


if __name__ == '__main__':
    main()
