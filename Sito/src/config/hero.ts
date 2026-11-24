import type { HeroVideoSource, ResponsiveHeroVideoSource } from '../types/hero'

export const heroVideoPlaybackRate = 1

export const desktopHeroVideoSource: HeroVideoSource = {
  video: 'media/hero/hero-desktop-rev21.mp4',
  poster: 'media/hero/hero-desktop-rev21-poster.jpg',
  width: 1920,
  height: 1080,
}

// The video and its poster both use the first matching composition.
export const responsiveHeroVideoSources: readonly ResponsiveHeroVideoSource[] = [
  {
    media: '(max-aspect-ratio: 2/3)',
    video: 'media/hero/hero-mobile-rev21.mp4',
    efficientVideo: 'media/hero/hero-mobile-rev21-hevc.mp4',
    poster: 'media/hero/hero-mobile-rev21-poster.jpg',
    width: 720,
    height: 1280,
  },
  {
    media: '(max-aspect-ratio: 1/1)',
    video: 'media/hero/hero-tablet-portrait-rev21.mp4',
    poster: 'media/hero/hero-tablet-portrait-rev21-poster.jpg',
    width: 960,
    height: 1280,
  },
  {
    media: '(max-aspect-ratio: 3/2)',
    video: 'media/hero/hero-tablet-rev21.mp4',
    poster: 'media/hero/hero-tablet-rev21-poster.jpg',
    width: 1280,
    height: 960,
  },
  {
    media: '(max-width: 1199px)',
    video: 'media/hero/hero-wide-compact-rev21.mp4',
    poster: 'media/hero/hero-wide-compact-rev21-poster.jpg',
    width: 1280,
    height: 720,
  },
]

export const heroHeadlineMotion = {
  initialDelay: 0.45,
  revealDuration: 2.6,
  holdDuration: 5.5,
  exitDuration: 1.6,
  betweenDuration: 0.3,
} as const
