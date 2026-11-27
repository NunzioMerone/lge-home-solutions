import type { ComponentType } from 'react'
import {
  atelierGibusPage,
  interiorDoorsPage,
  securityDoorsPage,
  shuttersPage,
  windowsPage,
} from '../data/products'
import type { ProductDetailProps } from '../types/productTransition'
import { createDeferredPage } from './deferredPage'

const productPage = createDeferredPage<ProductDetailProps>
export const deferredProductPages = new Map<string, ReturnType<typeof productPage>>([
  [
    windowsPage.path,
    productPage(
      import.meta.glob<ComponentType<ProductDetailProps>>(
        '/src/pages/ProductDetail/ProductDetail.tsx',
        { import: 'ProductDetail' },
      ),
    ),
  ],
  [
    shuttersPage.path,
    productPage(
      import.meta.glob<ComponentType<ProductDetailProps>>('/src/pages/Shutters/Shutters.tsx', {
        import: 'Shutters',
      }),
    ),
  ],
  [
    securityDoorsPage.path,
    productPage(
      import.meta.glob<ComponentType<ProductDetailProps>>(
        '/src/pages/SecurityDoors/SecurityDoors.tsx',
        { import: 'SecurityDoors' },
      ),
    ),
  ],
  [
    atelierGibusPage.path,
    productPage(
      import.meta.glob<ComponentType<ProductDetailProps>>(
        '/src/pages/AtelierGibus/AtelierGibus.tsx',
        { import: 'AtelierGibus' },
      ),
    ),
  ],
  [
    interiorDoorsPage.path,
    productPage(
      import.meta.glob<ComponentType<ProductDetailProps>>(
        '/src/pages/InteriorDoors/InteriorDoors.tsx',
        { import: 'InteriorDoors' },
      ),
    ),
  ],
] as const)
