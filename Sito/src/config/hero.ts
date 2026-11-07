import type { HeroVideoFormat, HeroVideoSource } from '../types/hero'

export const heroVideoMedia = {
  portrait: '(max-width: 1199px) and (orientation: portrait)',
  compact: '(max-width: 1199px)',
  largeTablet: '(min-width: 1000px) and (max-width: 1199px) and (min-height: 650px)',
} as const

export const heroVideoPlaybackRate = 1

export const heroVideoSources = {
  desktop: {
    video: 'media/hero/hero-desktop-rev20.mp4',
    poster: 'media/hero/hero-desktop-rev20-poster.jpg',
    width: 1920,
    height: 1080,
  },
  largeTablet: {
    video: 'media/hero/hero-tablet-rev19.mp4',
    poster: 'media/hero/hero-tablet-rev19-poster.jpg',
    width: 1280,
    height: 960,
  },
  tablet: {
    video: 'media/hero/hero-tablet-compact-rev19.mp4',
    poster: 'media/hero/hero-tablet-compact-rev19-poster.jpg',
    width: 1280,
    height: 960,
  },
  mobile: {
    video: 'media/hero/hero-mobile-rev19.mp4',
    efficientVideo: 'media/hero/hero-mobile-rev19-hevc.mp4',
    poster: 'media/hero/hero-mobile-rev19-poster.jpg',
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
