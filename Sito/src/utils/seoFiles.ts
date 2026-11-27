import { blogPage } from '../config/blog'
import { competenciesPage } from '../config/competencies'
import { privacyPage } from '../config/privacy'
import { worksPage } from '../config/works'
import { blogPosts } from '../data/blog'
import { gallery } from '../data/gallery'
import { products } from '../data/products'
import { getBlogPostPath } from './blog'
import { galleryImagePath } from './galleryImages'
import { getPageMetadata } from './pageMetadata'
import { escapeMarkup, pageUrl, publicBase } from './siteSeo'

export const seoPaths = [
  '/',
  ...products.map((product) => product.path),
  competenciesPage.path,
  worksPage.path,
  blogPage.path,
  ...blogPosts.map((post) => getBlogPostPath(post.slug)),
  privacyPage.path,
]

function sitemapEntry(path: string, base: URL): string {
  const loc = `<loc>${escapeMarkup(pageUrl(path, base))}</loc>`
  if (path !== worksPage.path) return `  <url>${loc}</url>`

  const photos = new Set(gallery.map((photo) => galleryImagePath(photo, photo.fullWidth)))
  const images = Array.from(photos, (image) => {
    const src = escapeMarkup(new URL(image, base).href)
    return `    <image:image><image:loc>${src}</image:loc></image:image>`
  })
  return ['  <url>', `    ${loc}`, ...images, '  </url>'].join('\n')
}

export function getSeoFiles(base = publicBase) {
  const robotsTxt = 'User-agent: *\nAllow: /\n'
  if (!base) return { robotsTxt, sitemapXml: null }

  const urls = seoPaths
    .filter((path) => !getPageMetadata(path).robots)
    .map((path) => sitemapEntry(path, base))
  return {
    robotsTxt: `${robotsTxt}Sitemap: ${new URL('sitemap.xml', base).href}\n`,
    sitemapXml: [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
      ...urls,
      '</urlset>',
      '',
    ].join('\n'),
  }
}
