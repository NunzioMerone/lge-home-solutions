import type { HeroVideoFormat, HeroVideoSource } from '../types/hero'

export const heroVideoMedia = {
  portrait: '(max-width: 1199px) and (orientation: portrait)',
  compact: '(max-width: 1199px)',
} as const

export const heroVideoPlaybackRate = 0.85

export const heroVideoSources = {
  desktop: {
    video: 'media/hero/hero-desktop-rev06.mp4',
    poster: 'media/hero/hero-desktop-rev06-poster.jpg',
    width: 1920,
    height: 1080,
  },
  tablet: {
    video: 'media/hero/hero-tablet-rev06.mp4',
    poster: 'media/hero/hero-tablet-rev06-poster.jpg',
    width: 1280,
    height: 960,
  },
  mobile: {
    video: 'media/hero/hero-mobile-rev06.mp4',
    poster: 'media/hero/hero-mobile-rev06-poster.jpg',
    width: 720,
    height: 1280,
  },
} satisfies Record<HeroVideoFormat, HeroVideoSource>

export const heroHeadlineMotion = {
  initialDelay: 0.45,
  revealDuration: 2.6,
  holdDuration: 5.5,
  exitDuration: 1.6,
  betweenDuration: 0.3,
} as const
