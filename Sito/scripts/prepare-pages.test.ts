import { execFile } from 'node:child_process'
import { cp, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { afterEach, describe, expect, it } from 'vitest'
import { desktopHeroVideoSource, responsiveHeroVideoSources } from '../src/config/hero'
import { blogPosts } from '../src/data/blog'
import { gallery } from '../src/data/gallery'
import { getBlogPostPath } from '../src/utils/blog'
import { galleryImagePath } from '../src/utils/galleryImages'
import { getPageMetadata } from '../src/utils/pageMetadata'
import { seoPaths } from '../src/utils/seoFiles'
import { escapeMarkup } from '../src/utils/siteSeo'
import { verifyCredentialCopies } from './verify-credential-copies.mjs'

const run = promisify(execFile)
const project = fileURLToPath(new URL('../', import.meta.url))
let fixture: string | undefined

function expectCompanyPrivacy(html: string) {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1]
  expect(article).toContain('SiteGround fornisce l’hosting di lgesolutions.it')
  expect(article).toContain('apre una chat con Emanuele per chiedere un preventivo')
  expect(article).toContain('Il sito non riceve né conserva i messaggi')
  expect(article).not.toMatch(/github|anteprima|\bbozza\b|da completare|deve ancora/i)
}

afterEach(async () => {
  if (fixture) await rm(fixture, { recursive: true, force: true })
})

describe('static website build', () => {
  it('rejects extra and unreviewed certificate copies, including thumbnails', async () => {
    fixture = await mkdtemp(join(tmpdir(), 'lge-certificates-test-'))
    const directory = join(fixture, 'documents/competencies')
    await cp(join(project, 'public/documents/competencies'), directory, { recursive: true })
    await verifyCredentialCopies(fixture)

    const extra = join(directory, 'unreviewed.pdf')
    await writeFile(extra, 'fixture')
    await expect(verifyCredentialCopies(fixture)).rejects.toThrow(
      'Unexpected certificate inventory',
    )
    await rm(extra)
    await writeFile(join(directory, 'installation-emanuele-thumb.webp'), 'fixture')
    await expect(verifyCredentialCopies(fixture)).rejects.toThrow('Unreviewed certificate copy')
  })

  it('renders real page content, route styles and crawl controls below the preview base', async () => {
    fixture = await mkdtemp(join(tmpdir(), 'lge-pages-test-'))
    await writeFile(join(fixture, 'sitemap.xml'), '<urlset />')
    const base = '/lge-home-solutions/'
    await run(
      process.execPath,
      [
        '--experimental-strip-types',
        'scripts/prepare-pages.mjs',
        '--base',
        base,
        '--outDir',
        fixture,
      ],
      {
        cwd: project,
        env: {
          ...process.env,
          VITE_PUBLIC_PREVIEW: 'true',
          VITE_GOOGLE_SITE_VERIFICATION: 'fixture_only',
        },
      },
    )
    for (const path of seoPaths) {
      const html = await readFile(join(fixture, path, 'index.html'), 'utf8')
      const metadata = getPageMetadata(path)
      expect(html).toContain(`<title>${escapeMarkup(metadata.title)}</title>`)
      expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"/)
      expect(html.match(/<h1\b/g)).toHaveLength(1)
      expect(html).toContain('P. IVA 09422971219')
      expect(html).toContain('80070 Monte di Procida (NA)')
      expect(html).toContain('Instagram di Atelier Gibus Campi Flegrei (nuova scheda)')
      expect(html).toContain(`href="${base}competenze/"`)
      expect(html).not.toContain('data-route-skeleton')
      if (path !== '/')
        expect(html).toMatch(/rel="modulepreload" crossorigin href="\/lge-home-solutions\/assets\//)
    }
    const works = await readFile(join(fixture, 'lavori/index.html'), 'utf8')
    const privacy = await readFile(join(fixture, 'privacy-policy/index.html'), 'utf8')
    expectCompanyPrivacy(privacy)
    const workLinks = new Set(
      Array.from(works.matchAll(/<a\b[^>]*?\bhref="([^"]+)"/g), (m) => m[1]),
    )
    for (const photo of gallery) {
      expect(workLinks.has(base + galleryImagePath(photo, photo.fullWidth))).toBe(true)
    }
    const home = await readFile(join(fixture, 'index.html'), 'utf8')
    expect(home).not.toContain('<video')
    expect(home).not.toContain('google-site-verification')
    for (const source of [desktopHeroVideoSource, ...responsiveHeroVideoSources]) {
      expect(home).toContain(`"${base}${source.poster}"`)
      for (const asset of [source.poster, source.video, source.efficientVideo]) {
        if (asset) expect((await stat(join(fixture, asset))).size).toBeGreaterThan(0)
      }
    }
    const [firstPost] = blogPosts
    if (!firstPost) throw new Error('Expected a blog article')
    const article = await readFile(
      join(fixture, getBlogPostPath(firstPost.slug), 'index.html'),
      'utf8',
    )
    expect(article).toContain('data-blog-section')
    expect(article).toContain('Indice dell’articolo')
    const fallback = await readFile(join(fixture, '404.html'), 'utf8')
    expect(fallback).toContain('noindex, nofollow')
    expect(fallback).toContain('Questa pagina')
    await expect(readFile(join(fixture, '.nojekyll'), 'utf8')).resolves.toBe('')
    await expect(readFile(join(fixture, 'sitemap.xml'), 'utf8')).rejects.toMatchObject({
      code: 'ENOENT',
    })
  }, 60_000)

  it('rejects an unconfigured release before touching the destination', async () => {
    fixture = await mkdtemp(join(tmpdir(), 'lge-release-test-'))
    const output = join(fixture, 'output')
    const args = [
      '--experimental-strip-types',
      'scripts/prepare-pages.mjs',
      '--release',
      '--outDir',
      output,
    ]
    for (const [flag, origin, message] of [
      ['true', '', 'VITE_PUBLIC_PREVIEW=false'],
      ['false', 'https://showroom.example', 'VITE_SITE_ORIGIN'],
    ]) {
      await expect(
        run(process.execPath, args, {
          cwd: project,
          env: { ...process.env, VITE_PUBLIC_PREVIEW: flag, VITE_SITE_ORIGIN: origin },
        }),
      ).rejects.toMatchObject({ stderr: expect.stringContaining(message) })
      await expect(stat(output)).rejects.toMatchObject({ code: 'ENOENT' })
    }
  })

  it('verifies a commercial artifact and leaves the last good release intact on failure', async () => {
    fixture = await mkdtemp(join(tmpdir(), 'lge-release-test-'))
    const target = fixture
    // Approvals and metadata changes belong exclusively to the disposable test project.
    for (const name of ['scripts', 'src', 'index.html', 'vite.config.ts', 'package.json']) {
      await cp(join(project, name), join(target, name), { recursive: true })
    }
    for (const name of ['node_modules', 'public', 'references']) {
      await symlink(join(project, name), join(target, name), 'dir')
    }
    const privacyFile = join(target, 'src/config/privacy.ts')
    const privacySource = await readFile(privacyFile, 'utf8')
    const approvedFixture = privacySource
      .replaceAll(': null,', ": 'Test fixture',")
      .replace('approved: false', 'approved: true')
    const origin = 'https://www.iana.org' // Existing public syntax only, never contacted.
    const env = {
      ...process.env,
      VITE_PUBLIC_PREVIEW: 'false',
      VITE_SITE_ORIGIN: origin,
      VITE_GOOGLE_SITE_VERIFICATION: 'fixture_only',
    }
    const args = ['--experimental-strip-types', 'scripts/prepare-pages.mjs', '--release']
    const opts = { cwd: target, env }
    // Force the negative case even after the actual company policy is approved.
    await writeFile(privacyFile, approvedFixture.replace('approved: true', 'approved: false'))
    await expect(run(process.execPath, args, opts)).rejects.toMatchObject({
      stderr: expect.stringContaining('Privacy Policy in bozza'),
    })
    await writeFile(
      privacyFile,
      approvedFixture + '\nObject.assign(privacyDetails, { contactRetention: null })\n',
    )
    await expect(run(process.execPath, args, opts)).rejects.toMatchObject({
      stderr: expect.stringContaining('conservazione delle richieste di contatto e preventivo'),
    })
    await writeFile(privacyFile, approvedFixture)
    await run(process.execPath, args, opts)
    const output = join(target, 'dist-release')
    const homeFile = join(output, 'index.html')
    const home = await readFile(homeFile, 'utf8')
    const privacy = await readFile(join(output, 'privacy-policy/index.html'), 'utf8')
    expectCompanyPrivacy(privacy)
    expect(
      (await readdir(output, { recursive: true })).some(
        (name) => name.endsWith('/.DS_Store') || name === '.DS_Store',
      ),
    ).toBe(false)
    expect(home).toContain(`<link rel="canonical" href="${origin}/"`)
    expect(home).toContain('name="google-site-verification" content="fixture_only"')
    expect(home).not.toContain('noindex')
    const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8')
    expect(sitemap).toContain(`<loc>${origin}/privacy-policy/</loc>`)
    // A later, valid build replaces the directory as a whole; removed URLs must not survive.
    await writeFile(join(output, 'obsolete.html'), 'old file')
    await run(process.execPath, [...args, '--base=/vetrina/'], opts)
    const updated = await readFile(homeFile, 'utf8')
    expect(updated).toContain(`<link rel="canonical" href="${origin}/vetrina/"`)
    await expect(stat(join(output, 'obsolete.html'))).rejects.toMatchObject({ code: 'ENOENT' })
    const templateFile = join(target, 'index.html')
    const template = await readFile(templateFile, 'utf8')
    await writeFile(
      templateFile,
      template.replace('</body>', '<a href="/competenze">Competenze</a></body>'),
    )
    await expect(run(process.execPath, args, opts)).rejects.toMatchObject({
      stderr: expect.stringContaining('Non-canonical link'),
    })
    await writeFile(
      templateFile,
      template.replace('</head>', '<meta name=googlebot content=noindex></head>'),
    )
    await expect(run(process.execPath, args, opts)).rejects.toMatchObject({
      stderr: expect.stringContaining('Indexing blocked'),
    })
    await expect(readFile(homeFile, 'utf8')).resolves.toBe(updated)
  }, 60_000)
})
