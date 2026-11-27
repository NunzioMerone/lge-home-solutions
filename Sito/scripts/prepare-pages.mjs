import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL, URL } from 'node:url'
import { parseArgs } from 'node:util'
import { build, loadEnv } from 'vite'
import { getPublicSiteBase } from '../src/utils/publicSiteUrl.ts'
import { assertPrivacyReady } from './privacy-review.mjs'
import { verifyCredentialCopies } from './verify-credential-copies.mjs'
import { verifyStaticPages } from './verify-pages.mjs'

const { values } = parseArgs({
  options: {
    base: { type: 'string' },
    outDir: { type: 'string' },
    mode: { type: 'string' },
    release: { type: 'boolean' },
  },
})
const root = fileURLToPath(new URL('../', import.meta.url))
const mode = values.mode ?? 'production'
const env = loadEnv(mode, root, 'VITE_')
const flag = env.VITE_PUBLIC_PREVIEW
if (flag !== undefined && flag !== 'true' && flag !== 'false') {
  throw new Error('VITE_PUBLIC_PREVIEW deve essere true oppure false.')
}
if (values.release && flag !== 'false') {
  throw new Error('La build commerciale richiede VITE_PUBLIC_PREVIEW=false.')
}
const publicBuild = flag === 'false'
const publicBase = getPublicSiteBase(flag, env.VITE_SITE_ORIGIN, values.base ?? '/')
const verification = env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
if (publicBuild) {
  if (!publicBase)
    throw new Error(
      'VITE_SITE_ORIGIN o --base non valido. Serve un’origine HTTPS pubblica del dominio definitivo e un percorso locale.',
    )
  if (verification && !/^[A-Za-z0-9_-]+$/.test(verification))
    throw new Error('VITE_GOOGLE_SITE_VERIFICATION deve contenere solo il valore del meta tag.')
  assertPrivacyReady()
}
const destination = resolve(root, values.outDir ?? (publicBuild ? 'dist-release' : 'dist'))
const vite = { root, mode, base: publicBase?.pathname ?? values.base }

function routeAssets(manifest, moduleId, template, base) {
  if (!moduleId) return ''
  const links = new Set()
  const visited = new Set()
  function collect(id) {
    if (visited.has(id)) return
    visited.add(id)
    const chunk = manifest[id]
    if (!chunk) throw new Error(`Missing client manifest entry: ${id}`)
    for (const dependency of chunk.imports ?? []) collect(dependency)
    for (const css of chunk.css ?? []) {
      const href = `${base}${css}`
      if (!template.includes(`href="${href}"`)) {
        links.add(`<link rel="stylesheet" crossorigin href="${href}">`)
      }
    }
    const href = `${base}${chunk.file}`
    if (!template.includes(`"${href}"`)) {
      links.add(`<link rel="modulepreload" crossorigin href="${href}">`)
    }
  }
  collect(moduleId)
  return [...links].join('\n    ')
}

async function generate(outDir, rendererDir) {
  await build({ ...vite, build: { outDir, manifest: true } })
  await build({
    ...vite,
    build: {
      ssr: 'src/entry-prerender.tsx',
      outDir: rendererDir,
      copyPublicDir: false,
      rolldownOptions: {
        output: { entryFileNames: 'render.mjs', chunkFileNames: 'assets/[name]-[hash].mjs' },
      },
    },
  })
  const { base, seoPaths, renderPage, renderSeoHead, getSeoFiles, gallerySize } = await import(
    pathToFileURL(join(rendererDir, 'render.mjs')).href
  )
  const manifest = JSON.parse(await readFile(join(outDir, '.vite/manifest.json'), 'utf8'))
  const template = await readFile(join(outDir, 'index.html'), 'utf8')
  const seoSlot = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
  const rootSlot = '<div id="root"></div>'
  if (!seoSlot.test(template) || !template.includes(rootSlot))
    throw new Error('Missing HTML template slots')

  for (const path of [...seoPaths, '/404.html']) {
    const { html, pathname, moduleId } = await renderPage(path)
    const head = renderSeoHead(path) + '\n    ' + routeAssets(manifest, moduleId, template, base)
    const page = template
      .replace(seoSlot, () => head)
      .replace(rootSlot, () => `<div id="root" data-rendered-path="${pathname}">${html}</div>`)
    const file = path === '/404.html' ? join(outDir, '404.html') : join(outDir, path, 'index.html')
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, page)
  }

  const { robotsTxt, sitemapXml } = getSeoFiles()
  await writeFile(join(outDir, 'robots.txt'), robotsTxt)
  const sitemapPath = join(outDir, 'sitemap.xml')
  if (sitemapXml) await writeFile(sitemapPath, sitemapXml)
  else await rm(sitemapPath, { force: true })
  await writeFile(join(outDir, '.nojekyll'), '')
  await verifyCredentialCopies(outDir)
  await verifyStaticPages(outDir, seoPaths, base, publicBase, verification, gallerySize)
  return seoPaths.length
}

async function promoteRelease(output, destination, staging) {
  let entries
  try {
    entries = await readdir(destination)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (entries) {
    // Only replace an empty directory or a previous build produced by this project.
    if (
      entries.length &&
      !(
        entries.includes('.nojekyll') &&
        (await stat(join(destination, '.vite/manifest.json'))).isFile()
      )
    )
      throw new Error(`La destinazione non è una build precedente: ${destination}`)
    await rename(destination, join(staging, 'previous'))
  }
  try {
    await rename(output, destination)
  } catch (error) {
    if (entries) await rename(join(staging, 'previous'), destination)
    throw error
  }
}

async function buildAndVerify(output) {
  const rendererDir = await mkdtemp(join(root, 'node_modules/.lge-prerender-'))
  try {
    return await generate(output, rendererDir)
  } finally {
    await rm(rendererDir, { recursive: true, force: true })
  }
}

async function buildRelease() {
  // A deterministic staging path also prevents two builds from replacing the same artifact.
  const staging = join(dirname(destination), `.lge-build-${basename(destination)}.lock`)
  await mkdir(dirname(destination), { recursive: true })
  try {
    await mkdir(staging)
  } catch (error) {
    if (error.code === 'EEXIST')
      throw new Error(
        `Build già in corso o interrotta. Controllare ${staging} prima di riprovare.`,
        { cause: error },
      )
    throw error
  }
  let published = false
  try {
    const output = join(staging, 'website')
    const pages = await buildAndVerify(output)
    for (const file of await readdir(output, { recursive: true, withFileTypes: true })) {
      if (file.name === '.DS_Store' && file.isFile()) await rm(join(file.parentPath, file.name))
    }
    await promoteRelease(output, destination, staging)
    published = true
    return pages
  } finally {
    // An interrupted rollback must leave the last good artifact available for recovery.
    if (published || !existsSync(join(staging, 'previous'))) {
      await rm(staging, { recursive: true, force: true })
    }
  }
}

const pages = publicBuild ? await buildRelease() : await buildAndVerify(destination)
process.stdout.write(
  `Verified ${publicBuild ? 'commercial release' : 'non-indexed preview'}: ${pages} pages and 404.html in ${destination}\n`,
)
