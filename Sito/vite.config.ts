import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Preview the same directory redirects and missing-page responses as static hosting. */
const staticPagesPreview: Plugin = {
  name: 'static-pages-preview',
  configurePreviewServer({ config, middlewares }) {
    const output = resolve(config.root, config.build.outDir)
    middlewares.use(async (req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next()
      let url: URL
      let path: string
      try {
        url = new URL(req.url ?? '/', 'http://localhost')
        if (!url.pathname.startsWith(config.base)) return next()
        path = decodeURIComponent(url.pathname.slice(config.base.length))
      } catch {
        return next()
      }
      const extension = extname(path)
      if (extension && extension !== '.html') return next()
      const file = resolve(output, extension ? path : join(path, 'index.html'))
      if (!file.startsWith(output + sep)) return next()
      if (existsSync(file)) {
        if (url.pathname.endsWith('/index.html')) {
          res.writeHead(301, { Location: url.pathname.slice(0, -'index.html'.length) + url.search })
          return res.end()
        }
        if (!extension && path && !path.endsWith('/')) {
          res.writeHead(301, { Location: `${url.pathname}/${url.search}` })
          return res.end()
        }
        return next()
      }
      try {
        const notFound = await readFile(join(output, '404.html'))
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(req.method === 'HEAD' ? undefined : notFound)
      } catch (error) {
        next(error)
      }
    })
  },
}

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [react(), staticPagesPreview],
  define: { __BUILD_YEAR__: new Date().getUTCFullYear() },
  ssr: { noExternal: ['gsap'] },
  // Archived reference HTML files are not application entry points.
  optimizeDeps: { entries: ['index.html'] },
  server: { port: 5175, strictPort: true },
  preview: { port: 4175, strictPort: true },
}))
