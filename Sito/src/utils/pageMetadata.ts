import { privacyPage } from '../config/privacy'
import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { blogPage } from '../config/blog'
import { blogPosts } from '../data/blog'
import { getBlogPostFromPath } from './blog'
import { site } from '../config/site'
import { detailedProductPages, products } from '../data/products'
import type { PageMetadata } from '../types/privacy'

export function getPageMetadata(pathname: string): PageMetadata {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === blogPage.path) {
    return { title: blogPage.title, description: blogPage.description }
  }
  if (path.startsWith(`${blogPage.path}/`)) {
    const post = getBlogPostFromPath(path, blogPosts)
    return post
      ? { title: post.seoTitle, description: post.seoDescription }
      : {
          title: 'Articolo non trovato — Blog LGE Home Solutions',
          description: blogPage.description,
          robots: 'noindex, nofollow',
        }
  }
  const detailedProduct = detailedProductPages.find((page) => page.path === path)
  if (detailedProduct) {
    return { title: detailedProduct.title, description: detailedProduct.description }
  }
  if (path === privacyPage.path) {
    return {
      title: privacyPage.title,
      description: privacyPage.description,
      ...(!privacyPage.approved ? { robots: 'noindex, nofollow' } : {}),
    }
  }
  if (path === competenciesPage.path) {
    return {
      title: competenciesPage.title,
      description: competenciesPage.description,
    }
  }
  if (path === worksPage.path) {
    return {
      title: worksPage.title,
      description: worksPage.description,
    }
  }
  const product = products.find((item) => item.path === path)
  if (path !== '/' && !product) {
    return {
      title: `Pagina non trovata — ${site.name}`,
      description: site.description,
      robots: 'noindex, nofollow',
    }
  }
  return {
    title: path === '/' ? site.title : `${product?.title ?? 'Pagina'} — ${site.name}`,
    description: site.description,
  }
}
