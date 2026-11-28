import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { URL } from 'node:url'
import { pagePathname } from '../src/utils/pagePath.ts'

// Include template tags outside the generated SEO slot, such as a second robots directive.
function tags(html, name) {
  return Array.from(html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi')), ([, raw]) =>
    Object.fromEntries(
      Array.from(
        raw.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g),
        ([, key, doubleQuoted, singleQuoted, unquoted]) => [
          key.toLowerCase(),
          doubleQuoted ?? singleQuoted ?? unquoted,
        ],
      ),
    ),
  )
}

function verifyStructuredData(head, elements, path) {
  // Validate the actual script bodies, including any supplied by the HTML template.
  const actual = []
  for (const [script, body] of head.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    const [attributes] = tags(script, 'script')
    if (attributes.type?.toLowerCase() === 'application/ld+json') {
      actual.push({ id: attributes.id, data: JSON.parse(body) })
    }
  }
  const expected = elements
    .filter(({ tag, attributes }) => tag === 'script' && attributes?.type === 'application/ld+json')
    .map(({ attributes, text }) => ({ id: attributes.id, data: JSON.parse(text) }))
  assert.equal(
    new Set(actual.map(({ id }) => id)).size,
    actual.length,
    `Duplicate schema on ${path}`,
  )
  assert.deepEqual(actual, expected, `Incorrect structured data on ${path}`)
}

export async function verifyStaticPages(
  output,
  paths,
  siteBase,
  base,
  verification,
  gallerySize,
  getSeoElements,
) {
  const titleSet = new Set()
  const descriptions = new Set()
  const expectedUrls = new Set()
  const assetPaths = new Set()
  const documentBase = base ?? new URL(siteBase, 'http://localhost')
  const canonicalPaths = new Set(
    paths.map((path) => new URL(pagePathname(path).slice(1), documentBase).pathname),
  )
  function publicAsset(value) {
    assert.ok(value, 'Missing public asset URL')
    const url = new URL(value, base)
    assert.ok(
      url.origin === base.origin && url.pathname.startsWith(base.pathname),
      'Asset outside the site base',
    )
    assetPaths.add(decodeURIComponent(url.pathname.slice(base.pathname.length)))
  }
  for (const path of [...paths, '/404.html']) {
    const missing = path === '/404.html'
    const file = missing ? '404.html' : join(path, 'index.html')
    const page = await readFile(join(output, file), 'utf8')
    const head = page.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]
    assert.ok(head, `Missing head on ${path}`)
    verifyStructuredData(head, getSeoElements(path), path)
    const metas = tags(head, 'meta')
    const links = tags(head, 'link')
    const content = (key, value) =>
      metas.filter((item) => item[key]?.toLowerCase() === value).map((item) => item.content)
    const titles = [...head.matchAll(/<title>([^<]+)<\/title>/gi)]
    const description = content('name', 'description')
    const pathname = path === '/' || missing ? path : path.replace(/\/?$/, '/')
    const documentUrl = new URL(pathname.slice(1), documentBase)
    for (const { href } of tags(page, 'a')) {
      if (!href) continue
      const target = new URL(href, documentUrl)
      if (target.origin !== documentUrl.origin) continue
      const canonical = pagePathname(target.pathname.replace(/\/index\.html$/, '/'))
      if (canonicalPaths.has(canonical))
        assert.equal(target.pathname, canonical, `Non-canonical link on ${path}: ${href}`)
    }
    assert.ok(
      page.includes(`data-rendered-path="${pathname}"`) && /<main\b/.test(page),
      `Missing prerendered main on ${path}`,
    )
    assert.equal((page.match(/<h1\b/g) ?? []).length, 1, `Expected one H1 on ${path}`)
    assert.equal(titles.length, 1, `Expected one title on ${path}`)
    assert.ok(
      description.length === 1 && description[0]?.trim(),
      `Missing or duplicate description on ${path}`,
    )
    if (!missing) {
      assert.ok(
        !titleSet.has(titles[0][1]) && !descriptions.has(description[0]),
        `Duplicate metadata on ${path}`,
      )
      titleSet.add(titles[0][1])
      descriptions.add(description[0])
    }
    const robots = [...content('name', 'robots'), ...content('name', 'googlebot')]
    const canonicals = links.filter((link) => link.rel === 'canonical').map((link) => link.href)
    const token = content('name', 'google-site-verification')
    assert.deepEqual(
      token,
      base && path === '/' && verification ? [verification] : [],
      `Wrong Search Console tag on ${path}`,
    )
    if (!base || missing) {
      assert.ok(
        robots.some((entry) => /\bnoindex\b/i.test(entry)),
        `Missing noindex on ${path}`,
      )
      assert.deepEqual(canonicals, [], `Unexpected canonical on ${path}`)
      continue
    }
    assert.ok(
      !robots.some((entry) => /\b(?:none|noindex|nofollow)\b/i.test(entry)),
      `Indexing blocked on ${path}`,
    )
    const expected = new URL(pathname.slice(1), base).href
    assert.deepEqual(canonicals, [expected], `Incorrect canonical on ${path}`)
    assert.deepEqual(content('property', 'og:url'), [expected], `Incorrect og:url on ${path}`)
    assert.deepEqual(
      content('property', 'og:title'),
      [titles[0][1]],
      `Incorrect og:title on ${path}`,
    )
    assert.deepEqual(
      content('property', 'og:description'),
      description,
      `Incorrect og:description on ${path}`,
    )
    publicAsset(content('property', 'og:image')[0])
    for (const link of links.filter((link) =>
      ['stylesheet', 'modulepreload', 'icon'].includes(link.rel),
    ))
      publicAsset(link.href)
    for (const script of tags(head, 'script')) if (script.type === 'module') publicAsset(script.src)
    expectedUrls.add(expected)
    if (path === '/') {
      const schema = head.match(/<script\b[^>]*id="lge-local-business"[^>]*>([\s\S]*?)<\/script>/i)
      assert.ok(schema, 'Missing LocalBusiness data on homepage')
      const business = JSON.parse(schema[1])
      assert.ok(
        business['@type'] === 'LocalBusiness' &&
          business.url === expected &&
          business.address?.streetAddress,
        'Incomplete showroom data',
      )
      publicAsset(business.image)
    }
  }
  const robots = await readFile(join(output, 'robots.txt'), 'utf8')
  const sitemapFile = join(output, 'sitemap.xml')
  if (!base) {
    assert.equal(robots.trim(), 'User-agent: *\nAllow: /')
    await assert.rejects(stat(sitemapFile), { code: 'ENOENT' })
    return
  }
  assert.equal(
    robots.trim(),
    `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', base).href}`,
  )
  const sitemap = await readFile(sitemapFile, 'utf8')
  assert.ok(
    sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') &&
      sitemap.trimEnd().endsWith('</urlset>'),
    'Invalid sitemap root',
  )
  const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url)
  assert.deepEqual(urls.sort(), [...expectedUrls].sort(), 'Sitemap and indexable pages differ')
  const images = Array.from(sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g), ([, url]) => url)
  assert.equal(images.length, gallerySize, 'Missing installation images from sitemap')
  assert.equal(new Set(images).size, images.length, 'Duplicate images in sitemap')
  images.forEach(publicAsset)
  for (const path of assetPaths) {
    const asset = await stat(join(output, path))
    assert.ok(asset.isFile() && asset.size > 0, `Missing asset ${path}`)
  }
}
