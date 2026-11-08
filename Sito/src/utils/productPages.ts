import { lazy } from 'react'
import type { ComponentType } from 'react'
import {
  atelierGibusPage,
  interiorDoorsPage,
  securityDoorsPage,
  shuttersPage,
  windowsPage,
} from '../data/products'
import type { ProductDetailProps } from '../types/productTransition'

function createProductPage(load: () => Promise<ComponentType<ProductDetailProps>>) {
  let prepared: ComponentType<ProductDetailProps> | undefined
  let pending: Promise<{ default: ComponentType<ProductDetailProps> }> | undefined

  function loadPage() {
    pending ??= load().then(
      (Page) => {
        prepared = Page
        return { default: Page }
      },
      (error: unknown) => {
        pending = undefined
        throw error
      },
    )
    return pending
  }

  const LazyPage = lazy(loadPage)
  return {
    prepare: () => (prepared ? undefined : loadPage()),
    getPage: () => prepared ?? LazyPage,
  }
}

export const deferredProductPages = new Map<string, ReturnType<typeof createProductPage>>([
  [
    windowsPage.path,
    createProductPage(() =>
      import('../pages/ProductDetail/ProductDetail').then((page) => page.ProductDetail),
    ),
  ],
  [
    shuttersPage.path,
    createProductPage(() => import('../pages/Shutters/Shutters').then((page) => page.Shutters)),
  ],
  [
    securityDoorsPage.path,
    createProductPage(() =>
      import('../pages/SecurityDoors/SecurityDoors').then((page) => page.SecurityDoors),
    ),
  ],
  [
    atelierGibusPage.path,
    createProductPage(() =>
      import('../pages/AtelierGibus/AtelierGibus').then((page) => page.AtelierGibus),
    ),
  ],
  [
    interiorDoorsPage.path,
    createProductPage(() =>
      import('../pages/InteriorDoors/InteriorDoors').then((page) => page.InteriorDoors),
    ),
  ],
] as const)
