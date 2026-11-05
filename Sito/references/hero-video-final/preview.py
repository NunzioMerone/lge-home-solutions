"""Serve the local review with byte ranges so video players can seek."""

from __future__ import annotations

import argparse
import os
import re
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import BinaryIO


class ReviewHandler(SimpleHTTPRequestHandler):
    remaining: int | None = None

    def send_head(self) -> BinaryIO | None:
        self.remaining = None
        path = Path(self.translate_path(self.path))
        header = self.headers.get("Range")
        if not header or path.suffix.lower() != ".mp4" or not path.is_file():
            return super().send_head()
        match = re.fullmatch(r"bytes=(\d*)-(\d*)", header.strip())
        size = path.stat().st_size
        if not match or not any(match.groups()) or not size:
            self.send_error(HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
            return None
        first, last = match.groups()
        start = int(first) if first else max(0, size-int(last))
        end = min(size-1, int(last)) if first and last else size-1
        if start >= size or start > end:
            self.send_response(HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
            self.send_header("Content-Range", f"bytes */{size}")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return None
        try:
            source = path.open("rb")
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND)
            return None
        source.seek(start)
        self.remaining = end-start+1
        self.send_response(HTTPStatus.PARTIAL_CONTENT)
        self.send_header("Content-Type", self.guess_type(str(path)))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(self.remaining))
        self.send_header("Last-Modified", self.date_time_string(os.fstat(source.fileno()).st_mtime))
        self.end_headers()
        return source

    def end_headers(self) -> None:
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def copyfile(self, source: BinaryIO, outputfile: BinaryIO) -> None:
        if self.remaining is None:
            return super().copyfile(source, outputfile)
        remaining = self.remaining
        while remaining:
            chunk = source.read(min(1024*1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8771)
    args = parser.parse_args()
    handler = partial(ReviewHandler, directory=str(Path(__file__).resolve().parent))
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        print(f"Local review: http://127.0.0.1:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
