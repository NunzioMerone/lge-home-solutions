import type { MouseEvent, ReactNode } from 'react'
import type { Product, ProductPath } from './content'

export interface ProductTransitionContextValue {
  openFromCard: (event: MouseEvent<HTMLAnchorElement>, path: ProductPath) => void
  arrive: (image: HTMLElement, heading: HTMLElement) => void
}

export interface ProductTransitionProviderProps {
  children: ReactNode
}

export interface ProductImageTransition {
  path: ProductPath
  cancel: () => void
  arrive: (image: HTMLElement, heading: HTMLElement) => void
}

export interface ProductDetailProps {
  product: Product
}
