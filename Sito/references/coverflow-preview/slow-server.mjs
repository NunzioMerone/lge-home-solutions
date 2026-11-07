import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Buffer } from 'node:buffer'
import { env, stdout } from 'node:process'
import { URL, fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
// Local verification only; Vite does not include this server in the website.
const root = path.resolve(fileURLToPath(new URL('../../dist/', import.meta.url)))
const port = Number(env.LGE_SLOW_PREVIEW_PORT ?? 4185)
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
}
const probe = `<script type="module">
const report = document.createElement('output'); report.id = 'lightbox-load-probe'; report.hidden = true; document.body.append(report);
const sizes = new WeakMap(); let geometryChanges = 0; let loads = 0;
const geometry = new ResizeObserver(entries => {
 for (const entry of entries) {
  if (!entry.target.isConnected) continue;
  const value = [entry.contentRect.width, entry.contentRect.height]; const before = sizes.get(entry.target);
  if (before && (Math.abs(before[0] - value[0]) > 1 || Math.abs(before[1] - value[1]) > 1)) geometryChanges++;
  sizes.set(entry.target, value);
 }
 report.textContent = JSON.stringify({geometryChanges,loads});
});
const observed = new WeakSet();
const scan = () => document.querySelectorAll('[data-photo-id]').forEach(frame => { if (!observed.has(frame)) {observed.add(frame); geometry.observe(frame)} });
new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
document.addEventListener('load',event => {if(event.target instanceof HTMLImageElement && event.target.closest('dialog')) {loads++;report.textContent=JSON.stringify({geometryChanges,loads})}},true);
</script>`
http
  .createServer(async (req, res) => {
    try {
      const requested = new URL(req.url, 'http://127.0.0.1').pathname.replace(
        /^\/lge-home-solutions\/?/,
        '',
      )
      const target = path.resolve(root, requested || 'index.html')
      if (target !== root && !target.startsWith(root + '/')) {
        res.writeHead(403).end()
        return
      }
      let file = target
      try {
        const stat = await fs.stat(file)
        if (stat.isDirectory()) file = path.join(file, 'index.html')
      } catch {
        file = path.join(root, 'index.html')
      }
      const data = await fs.readFile(file)
      if (/\/img\/gallery-(real|home)\//.test(target)) {
        const detail = !/-480\.webp$/.test(target)
        await delay(detail ? 1800 : 450)
        if (res.destroyed) return
        res.writeHead(200, {
          'Content-Type': 'image/webp',
          'Content-Length': data.length,
          'Cache-Control': 'public,max-age=3600',
        })
        for (let offset = 0; offset < data.length && !res.destroyed; offset += 8192) {
          res.write(data.subarray(offset, offset + 8192))
          await delay(70)
        }
        res.end()
      } else {
        const content =
          path.extname(file) === '.html'
            ? Buffer.from(data.toString().replace('</body>', probe + '</body>'))
            : data
        res.writeHead(200, {
          'Content-Type': types[path.extname(file)] || 'application/octet-stream',
          'Content-Length': content.length,
          'Cache-Control': 'no-cache',
        })
        res.end(content)
      }
    } catch {
      if (!res.headersSent) res.writeHead(404)
      res.end('Not found')
    }
  })
  .listen(port, '127.0.0.1', () =>
    stdout.write(
      `Slow-image production preview: http://127.0.0.1:${port}/lge-home-solutions/lavori\n`,
    ),
  )
