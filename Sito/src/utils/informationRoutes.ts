import type { ComponentType } from 'react'
import { matchPath } from 'react-router-dom'
import { deferredProductPages } from './productPages'
import { privacyPage } from '../config/privacy'
import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { blogPage } from '../config/blog'
import { createDeferredPage } from './deferredPage'

const article = createDeferredPage(
  import.meta.glob<ComponentType>('/src/pages/Blog/BlogArticle.tsx', { import: 'BlogArticle' }),
)

export const informationRoutes = [
  {
    path: privacyPage.path,
    page: createDeferredPage(
      import.meta.glob<ComponentType>('/src/pages/PrivacyPolicy/PrivacyPolicy.tsx', {
        import: 'PrivacyPolicy',
      }),
    ),
  },
  {
    path: competenciesPage.path,
    page: createDeferredPage(
      import.meta.glob<ComponentType>('/src/pages/Competencies/Competencies.tsx', {
        import: 'Competencies',
      }),
    ),
  },
  {
    path: worksPage.path,
    page: createDeferredPage(
      import.meta.glob<ComponentType>('/src/pages/Works/Works.tsx', { import: 'Works' }),
    ),
  },
  {
    path: blogPage.path,
    page: createDeferredPage(
      import.meta.glob<ComponentType>('/src/pages/Blog/Blog.tsx', { import: 'Blog' }),
    ),
  },
  { path: `${blogPage.path}/:slug`, page: article },
  { path: `${blogPage.path}/*`, page: article },
]

export function getRoutePage(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return (
    deferredProductPages.get(path) ??
    informationRoutes.find((route) => matchPath(route.path, path))?.page
  )
}
