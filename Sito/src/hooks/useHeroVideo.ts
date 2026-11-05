import { useEffect, useRef, useState } from 'react'
import { heroVideoMedia, heroVideoPlaybackRate, heroVideoSources } from '../config/hero'
import type { HeroVideoFormat } from '../types/hero'
import { useMediaQuery } from './useMediaQuery'
import { useMotion } from './useMotion'

export function useHeroVideo() {
  const portrait = useMediaQuery(heroVideoMedia.portrait)
  const compact = useMediaQuery(heroVideoMedia.compact)
  const { reducedMotion } = useMotion()
  const format: HeroVideoFormat = portrait ? 'mobile' : compact ? 'tablet' : 'desktop'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedFormat, setFailedFormat] = useState<HeroVideoFormat | null>(null)
  const videoEnabled = !reducedMotion && failedFormat !== format

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoEnabled) return
    video.defaultPlaybackRate = heroVideoPlaybackRate
    video.playbackRate = heroVideoPlaybackRate
    let inView = false
    let active = true
    const syncPlayback = () => {
      if (!active) return
      if (inView && !document.hidden) {
        video.muted = true
        // Browsers that deny autoplay keep the poster visible.
        void video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        syncPlayback()
      },
      { threshold: 0.1 },
    )
    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      active = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [format, videoEnabled])

  return {
    videoRef,
    format,
    source: heroVideoSources[format],
    videoEnabled,
    onError: () => setFailedFormat(format),
  }
}
