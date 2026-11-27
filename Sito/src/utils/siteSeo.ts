import { contacts, serviceArea } from '../config/contacts'
import { lgeGooglePlace } from '../config/googlePlaces'
import { locationMap } from '../config/locationMap'
import { site } from '../config/site'
import { worksPage } from '../config/works'
import { blogPosts } from '../data/blog'
import { homeGallery } from '../data/homeGallery'
import { heroPhotos } from '../data/heroPhotos'
import { products } from '../data/products'
import { showroomPhotos } from '../data/showroomPhotos'
import type { BlogPost } from '../types/blog'
import type { SeoElement } from '../types/seo'
import { getBlogPostFromPath } from './blog'
import { galleryImagePath } from './galleryImages'
import { getPageMetadata } from './pageMetadata'
import { getPublicSiteBase } from './publicSiteUrl'
import { pagePathname } from './pagePath'

export const publicBase = getPublicSiteBase(
  import.meta.env.VITE_PUBLIC_PREVIEW,
  import.meta.env.VITE_SITE_ORIGIN,
  import.meta.env.BASE_URL,
)

export function pageUrl(path: string, base: URL) {
  return new URL(pagePathname(path).slice(1), base).href
}

function shareImage(path: string, post: BlogPost | undefined) {
  if (post) {
    const { path: source, widths, alt } = post.image
    return { path: `${source}-${widths[widths.length - 1]}.webp`, alt }
  }
  const product = products.find((item) => item.path === path)
  if (product) {
    return { path: `img/hero/${product.id}-960.webp`, alt: heroPhotos[product.id].alt }
  }
  const photo = path === worksPage.path && homeGallery[0] ? homeGallery[0] : showroomPhotos[0]
  return { path: galleryImagePath(photo, photo.fullWidth), alt: photo.alt }
}

function localBusiness(base: URL | null) {
  const photo = showroomPhotos[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    areaServed: serviceArea,
    ...(contacts.legalName && { legalName: contacts.legalName }),
    ...(base && {
      '@id': new URL('#showroom', base).href,
      url: base.href,
      image: new URL(galleryImagePath(photo, photo.fullWidth), base).href,
    }),
    address: {
      '@type': 'PostalAddress',
      ...(contacts.address && { streetAddress: contacts.address }),
      addressLocality: contacts.locality,
      addressRegion: contacts.province,
      postalCode: contacts.postalCode,
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locationMap.latitude,
      longitude: locationMap.longitude,
    },
    ...(contacts.phone && { telephone: contacts.phone.replace(/\s/g, '') }),
    ...(contacts.email && { email: contacts.email }),
    hasMap: lgeGooglePlace.reviewsUrl,
  }
}

function openGraph(property: string, content: string): SeoElement {
  return { tag: 'meta', attributes: { property: `og:${property}`, content } }
}

export function getSeoElements(pathname: string, base = publicBase): SeoElement[] {
  const path = pathname.split(/[?#]/, 1)[0]?.replace(/\/+$/, '') || '/'
  const { title, description, robots } = getPageMetadata(path)
  const elements: SeoElement[] = [
    { tag: 'title', text: title },
    { tag: 'meta', attributes: { name: 'description', content: description } },
  ]
  if (!base || robots) {
    elements.push({
      tag: 'meta',
      attributes: { name: 'robots', content: robots ?? 'noindex, nofollow' },
    })
  }
  if (robots) return elements

  const post = getBlogPostFromPath(path, blogPosts)
  elements.push(
    openGraph('title', title),
    openGraph('description', description),
    openGraph('type', post ? 'article' : 'website'),
    openGraph('site_name', site.name),
    openGraph('locale', 'it_IT'),
  )
  if (base) {
    const canonical = pageUrl(path, base)
    const image = shareImage(path, post)
    elements.push(
      { tag: 'link', attributes: { rel: 'canonical', href: canonical } },
      openGraph('url', canonical),
      openGraph('image', new URL(image.path, base).href),
      openGraph('image:alt', image.alt),
    )
  }
  if (path === '/') {
    const verification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
    if (base && verification) {
      elements.push({
        tag: 'meta',
        attributes: { name: 'google-site-verification', content: verification },
      })
    }
    elements.push({
      tag: 'script',
      attributes: { type: 'application/ld+json', id: 'lge-local-business' },
      text: JSON.stringify(localBusiness(base)).replace(/</g, '\\u003c'),
    })
  }
  return elements
}

export function escapeMarkup(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function renderSeoHead(pathname: string, base = publicBase): string {
  return getSeoElements(pathname, base)
    .map(({ tag, attributes, text }) => {
      const opening = Object.entries(attributes ?? {})
        .map(([name, value]) => ` ${name}="${escapeMarkup(value)}"`)
        .join('')
      if (tag === 'meta' || tag === 'link') return `<${tag}${opening} />`
      const content = tag === 'script' ? text : escapeMarkup(text ?? '')
      return `<${tag}${opening}>${content}</${tag}>`
    })
    .join('\n')
}
