import type { RefObject } from 'react'
import type { PhotoId, Product } from './content'

export interface HeroProductCardProps {
  product: Product
  description: string
}

export type HeroDescriptions = Record<PhotoId, string>

export interface HeroVideoProps {
  backdropRef: RefObject<HTMLDivElement | null>
  videoRef: RefObject<HTMLVideoElement | null>
  source: HeroVideoSource | null
  visible: boolean
  onError: (src: string) => void
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
