import type { PhotoId, Product } from './content'

export interface HeroProductCardProps {
  product: Product
  description: string
}

export type HeroDescriptions = Record<PhotoId, string>

export interface HeroVideoProps {
  active: boolean
  onTimeChange: (time: number) => void
}

export interface HeroHeadlineCue {
  startFrame: number
  phrase: string
  revealFrames?: number
  continuation?: {
    phrase: string
    startFrame: number
    revealFrames: number
  }
}

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
