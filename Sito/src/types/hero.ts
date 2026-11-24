import type { PhotoId, Product } from './content'

export interface HeroProductCardProps {
  product: Product
  description: string
}

export type HeroDescriptions = Record<PhotoId, string>

export interface HeroVideoSource {
  video: string
  efficientVideo?: string
  poster: string
  width: number
  height: number
}

export interface ResponsiveHeroVideoSource extends HeroVideoSource {
  media: string
}
