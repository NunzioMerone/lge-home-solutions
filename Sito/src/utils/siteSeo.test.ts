import { describe, expect, it } from 'vitest'
import { blogPosts } from '../data/blog'
import { gallery } from '../data/gallery'
import { getBlogPostPath } from './blog'
import { galleryImagePath } from './galleryImages'
import { getPageMetadata } from './pageMetadata'
import { getSeoFiles, seoPaths } from './seoFiles'
import { getPublicSiteBase } from './publicSiteUrl'
import { getSeoElements, renderSeoHead } from './siteSeo'
import { privacyPage } from '../config/privacy'

const base = new URL('https://lge.example/negozio/')

describe('indexing and canonical URLs', () => {
  it('only enables indexing with an explicit launch flag and HTTPS origin', () => {
    const publicOrigin = 'https://www.iana.org'
    expect(getPublicSiteBase('false', publicOrigin, '/negozio')?.href).toBe(
      publicOrigin + '/negozio/',
    )
    for (const flag of [undefined, '', 'true', '0']) {
      expect(getPublicSiteBase(flag, publicOrigin, '/')).toBeNull()
    }
    for (const origin of [
      undefined,
      '',
      'invalid',
      base.origin,
      'https://localhost',
      'https://127.0.0.1',
      'https://127.1',
      'https://[::1]',
      'https://example.com',
      'https://nunziomerone.github.io',
      'https://www.iana.org/../',
      'https://www.iana.org//',
      'https://www.iana.org?',
      'https://www.iana.org#',
      'http://www.iana.org',
      'https://user:pass@www.iana.org/',
      'https://www.iana.org/path',
      'https://www.iana.org/?page=2',
      'https://www.iana.org/#contatti',
    ]) {
      expect(getPublicSiteBase('false', origin, '/')).toBeNull()
    }
    for (const path of [
      '.',
      '//host',
      '/one/../two',
      '/escaped%2Fslash',
      '/foo?bar',
      '/bad#hash',
    ]) {
      expect(getPublicSiteBase('false', publicOrigin, path)).toBeNull()
    }
  })

  it('keeps preview pages crawlable for noindex and advertises no public URL', () => {
    const files = getSeoFiles(null)
    expect(files.robotsTxt).toContain('Allow: /')
    expect(files.robotsTxt).not.toContain('Sitemap:')
    expect(files.sitemapXml).toBeNull()
    for (const path of [...seoPaths, '/missing']) {
      const head = renderSeoHead(path, null)
      expect(head).toContain('name="robots" content="noindex, nofollow"')
      expect(head).not.toContain('rel="canonical"')
      expect(head).not.toContain('property="og:url"')
      expect(head).not.toContain('lge-breadcrumbs')
      expect(head).not.toContain('lge-blog-posting')
    }
  })

  it('writes one matching sitemap URL and canonical for every indexable page', () => {
    const { robotsTxt, sitemapXml } = getSeoFiles(base)
    const indexable = seoPaths.filter((path) => !getPageMetadata(path).robots)
    expect(robotsTxt).toContain('Sitemap: https://lge.example/negozio/sitemap.xml')
    expect(sitemapXml?.match(/<loc>/g)).toHaveLength(indexable.length)
    expect(new Set(indexable).size).toBe(indexable.length)
    for (const path of indexable) {
      const href = path === '/' ? base.href : new URL(path.slice(1) + '/', base).href
      expect(sitemapXml).toContain(`<loc>${href}</loc>`)
      const head = renderSeoHead(`${path}?categoria=test#sezione`, base)
      expect(head).toContain(`rel="canonical" href="${href}"`)
      expect(head).toContain(`property="og:url" content="${href}"`)
      expect(head).not.toContain('name="robots"')
      expect(head).toContain(`property="og:image" content="${base.href}img/`)
    }
    for (const path of [
      '/blog/missing',
      '/missing',
      ...(!privacyPage.approved ? ['/privacy-policy/'] : []),
    ]) {
      const head = renderSeoHead(path, base)
      expect(head).toContain('noindex, nofollow')
      expect(head).not.toContain('rel="canonical"')
      expect(sitemapXml).not.toContain(path)
    }
  })

  it('sets article share data per post', () => {
    for (const post of blogPosts) {
      const head = renderSeoHead(getBlogPostPath(post.slug), base)
      expect(head).toContain('property="og:type" content="article"')
      expect(head).toContain(`${base.href}${post.image.path}-`)
    }
  })

  it('uses canonical article breadcrumbs and omits BlogPosting for drafts', () => {
    for (const siteBase of [new URL('https://lgesolutions.it/'), base]) {
      for (const post of blogPosts) {
        const path = getBlogPostPath(post.slug)
        const scripts = getSeoElements(path, siteBase).filter(({ tag }) => tag === 'script')
        const breadcrumb = scripts.find(({ attributes }) => attributes?.id === 'lge-breadcrumbs')
        expect(JSON.parse(breadcrumb?.text ?? 'null')).toEqual({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteBase.href },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: new URL('blog/', siteBase).href,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: new URL(path.slice(1) + '/', siteBase).href,
            },
          ],
        })
        expect(scripts.some(({ attributes }) => attributes?.id === 'lge-blog-posting')).toBe(
          post.publication.status === 'published',
        )
      }
    }
  })

  it('includes every full-size installation photo once on the portfolio URL', () => {
    const xml = getSeoFiles(base).sitemapXml ?? ''
    expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')
    const portfolio = Array.from(
      xml.matchAll(/<url>([\s\S]*?)<\/url>/g),
      (match) => match[0],
    ).filter((entry) => entry.includes('<image:image>'))
    expect(portfolio).toHaveLength(1)
    const entry = portfolio[0] ?? ''
    expect(entry).toContain(`<loc>${base.href}lavori/</loc>`)
    expect(entry.match(/<image:image>/g)).toHaveLength(gallery.length)
    for (const photo of gallery) {
      const src = new URL(galleryImagePath(photo, photo.fullWidth), base).href
      expect(entry).toContain(`<image:loc>${src}</image:loc>`)
    }
  })

  it('describes the visible showroom on the homepage with confirmed contact details', () => {
    const data = getSeoElements('/', base).find((element) => element.tag === 'script')
    expect(JSON.parse(data?.text ?? 'null')).toMatchObject({
      '@type': 'LocalBusiness',
      url: base.href,
      telephone: '+393346008313',
      address: {
        streetAddress: 'Via Roma, 29',
        postalCode: '80070',
        addressLocality: 'Monte di Procida',
      },
      areaServed: ['Campi Flegrei', 'Monte di Procida', 'Bacoli'],
      geo: { latitude: 40.7940311, longitude: 14.0532046 },
    })
    expect(getSeoElements('/prodotti/oscuranti', base).some((el) => el.tag === 'script')).toBe(
      false,
    )
    const preview = getSeoElements('/', null).find((element) => element.tag === 'script')
    expect(JSON.parse(preview?.text ?? '{}')).not.toHaveProperty('url')
  })
})
