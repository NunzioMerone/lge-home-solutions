import type { PhotoId, Product } from './content'

export interface HeroProductCardProps {
  product: Product
  description: string
}

export type HeroDescriptions = Record<PhotoId, string>

export type HeroVideoFormat = 'desktop' | 'tablet' | 'mobile'

export interface HeroVideoSource {
  video: string
  efficientVideo?: string
  poster: string
  width: number
  height: number
}
