import { privacyPage } from '../config/privacy'
import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { site } from '../config/site'
import { atelierGibusPage, interiorDoorsPage, products } from '../data/products'
import { windowsPage } from '../data/windowComfort'
import type { PageMetadata } from '../types/privacy'

export function getPageMetadata(pathname: string): PageMetadata {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/prodotti/infissi') return windowsPage
  const detailedProduct = [atelierGibusPage, interiorDoorsPage].find((page) => page.path === path)
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
  return {
    title: path === '/' ? site.title : `${product?.title ?? 'Pagina'} — ${site.name}`,
    description: site.description,
  }
}
