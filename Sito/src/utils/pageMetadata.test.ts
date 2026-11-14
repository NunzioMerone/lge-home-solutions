import { describe, expect, it } from 'vitest'
import { site } from '../config/site'
import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { detailedProductPages } from '../data/products'
import { blogPage } from '../config/blog'
import { blogPosts } from '../data/blog'
import { getBlogPostPath } from './blog'
import { getPageMetadata } from './pageMetadata'

describe('page metadata across routes', () => {
  it('gives the blog and each article their own metadata, including trailing slashes', () => {
    expect(getPageMetadata('/blog/')).toEqual({
      title: blogPage.title,
      description: blogPage.description,
    })
    for (const post of blogPosts) {
      const path = getBlogPostPath(post.slug)
      expect(getPageMetadata(path).title).toContain(post.title)
      expect(getPageMetadata(path).description).toBe(post.excerpt)
      expect(getPageMetadata(`${path}/`)).toEqual(getPageMetadata(path))
    }
  })

  it('does not reuse an article title for missing articles or unrelated routes', () => {
    expect(getPageMetadata('/blog/unknown').title).toContain('Articolo non trovato')
    expect(getPageMetadata('/blog/unknown').robots).toBe('noindex, nofollow')
    expect(getPageMetadata('/blog-other').description).toBe(site.description)
  })

  it('recognizes the privacy route with and without the static-host trailing slash', () => {
    expect(getPageMetadata('/privacy-policy/')).toEqual(getPageMetadata('/privacy-policy'))
    expect(getPageMetadata('/privacy-policy').title).toContain('Privacy Policy')
  })

  it('does not carry privacy metadata or draft indexing restrictions to other pages', () => {
    const privacy = getPageMetadata('/privacy-policy')
    const metadata = getPageMetadata('/')
    expect(metadata.description).toBe(site.description)
    expect(metadata.description).not.toBe(privacy.description)
    expect(metadata.robots).toBeUndefined()
    expect(getPageMetadata('/').title).toBe(site.title)
  })

  it('marks unknown routes as missing pages rather than future product sections', () => {
    for (const path of ['/not-found', '/prodotti/inesistente', '/lavori/inesistente']) {
      expect(getPageMetadata(path).title).toBe(`Pagina non trovata — ${site.name}`)
      expect(getPageMetadata(path).robots).toBe('noindex, nofollow')
      expect(getPageMetadata(`${path}/`)).toEqual(getPageMetadata(path))
    }
  })

  it('uses dedicated competencies metadata for normal and static-host routes', () => {
    for (const path of ['/competenze', '/competenze/']) {
      expect(getPageMetadata(path)).toEqual({
        title: competenciesPage.title,
        description: competenciesPage.description,
      })
    }
    expect(getPageMetadata('/competenze/unknown').title).not.toBe(competenciesPage.title)
  })

  it('uses each product page metadata with normal and static-host URLs', () => {
    for (const { path, title, description } of detailedProductPages) {
      expect(getPageMetadata(path)).toEqual({ title, description })
      expect(getPageMetadata(`${path}/`)).toEqual({ title, description })
    }
  })

  it('recognizes normal and static-host work routes without privacy restrictions', () => {
    for (const path of ['/lavori', '/lavori/']) {
      expect(getPageMetadata(path)).toEqual({
        title: worksPage.title,
        description: worksPage.description,
      })
    }
  })
})
