import timeline from '../../references/hero-video-partners/edit-rev24.json'
import encoding from '../../references/hero-video-partners/edit-rev25.json'
import type { HeroVideoSource, ResponsiveHeroVideoSource } from '../types/hero'

// The lighter encodes use the same shot boundaries and headline cues.
export const heroVideoEdit = { ...timeline, ...encoding }

export const heroVideoPlaybackRate = 1
export const heroVideoFrameRate = heroVideoEdit.outputFrameRate

const revision = heroVideoEdit.revision

export const desktopHeroVideoSource: HeroVideoSource = {
  video: `media/hero/hero-desktop-${revision}.mp4`,
  poster: `media/hero/hero-desktop-${revision}-poster.webp`,
  width: 1920,
  height: 1080,
}

// The video and its poster both use the first matching composition.
export const responsiveHeroVideoSources: readonly ResponsiveHeroVideoSource[] = [
  {
    media: '(max-aspect-ratio: 2/3)',
    video: `media/hero/hero-mobile-${revision}.mp4`,
    efficientVideo: `media/hero/hero-mobile-${revision}-hevc.mp4`,
    poster: `media/hero/hero-mobile-${revision}-poster.webp`,
    width: 720,
    height: 1280,
  },
  {
    media: '(max-aspect-ratio: 1/1)',
    video: `media/hero/hero-tablet-portrait-${revision}.mp4`,
    poster: `media/hero/hero-tablet-portrait-${revision}-poster.webp`,
    width: 960,
    height: 1280,
  },
  {
    media: '(max-aspect-ratio: 3/2)',
    video: `media/hero/hero-tablet-${revision}.mp4`,
    poster: `media/hero/hero-tablet-${revision}-poster.webp`,
    width: 1280,
    height: 960,
  },
  {
    media: '(max-width: 1199px)',
    video: `media/hero/hero-wide-compact-${revision}.mp4`,
    poster: `media/hero/hero-wide-compact-${revision}-poster.webp`,
    width: 1280,
    height: 720,
  },
]

export const heroHeadlineMotion = {
  revealFrames: 96,
  exitFrames: 32,
} as const
