import { execFile } from 'node:child_process'
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { blogPage } from '../src/config/blog'
import { blogPosts } from '../src/data/blog'
import { getBlogPostPath } from '../src/utils/blog'
import { getPageMetadata } from '../src/utils/pageMetadata'

const run = promisify(execFile)
const project = fileURLToPath(new URL('../', import.meta.url))
const fixtureFiles = [
  'scripts/prepare-pages.mjs',
  'src/config/privacy.ts',
  'src/config/competencies.ts',
  'src/config/works.ts',
  'src/config/blog.ts',
  'src/data/products.ts',
  'src/data/blog.ts',
]
const indexHtml = `<!doctype html><html><head>
<title>Home</title>
<meta name="description" content="Home description" />
<meta name="robots" content="noindex, nofollow" />
</head><body><script src="/lge-home-solutions/assets/app.js"></script></body></html>`

let fixture = ''

beforeEach(async () => {
  fixture = await mkdtemp(join(tmpdir(), 'lge-pages-test-'))
  await Promise.all(
    ['scripts', 'src/config', 'src/data', 'dist'].map((path) =>
      mkdir(join(fixture, path), { recursive: true }),
    ),
  )
  await Promise.all(fixtureFiles.map((path) => copyFile(join(project, path), join(fixture, path))))
  await writeFile(join(fixture, 'dist/index.html'), indexHtml)
})

afterEach(async () => {
  if (fixture) await rm(fixture, { recursive: true, force: true })
})

describe('GitHub Pages blog entry points', () => {
  for (const preview of ['true', 'false']) {
    it(`supports direct visits to the blog and every article with preview=${preview}`, async () => {
      await run(
        process.execPath,
        ['--experimental-strip-types', join(fixture, 'scripts/prepare-pages.mjs')],
        {
          cwd: fixture,
          env: { ...process.env, VITE_PUBLIC_PREVIEW: preview },
        },
      )
      const routes = [blogPage.path, ...blogPosts.map((post) => getBlogPostPath(post.slug))]
      for (const path of routes) {
        const html = await readFile(join(fixture, 'dist', path.slice(1), 'index.html'), 'utf8')
        const metadata = getPageMetadata(path)
        expect(html).toContain(`<title>${metadata.title}</title>`)
        expect(html).toContain(`content="${metadata.description}"`)
        expect(html).toContain('src="/lge-home-solutions/assets/app.js"')
        expect(html.match(/<meta name="robots"/g)?.length ?? 0).toBe(preview === 'true' ? 1 : 0)
      }
      await expect(readFile(join(fixture, 'dist/.nojekyll'), 'utf8')).resolves.toBe('')
    })
  }
})
