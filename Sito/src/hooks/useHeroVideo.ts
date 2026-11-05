import { useEffect, useRef, useState } from 'react'
import { heroVideoMedia, heroVideoPlaybackRate, heroVideoSources } from '../config/hero'
import type { HeroVideoFormat, HeroVideoSource } from '../types/hero'
import { useMediaQuery } from './useMediaQuery'
import { useMotion } from './useMotion'

export function useHeroVideo(pageActive: boolean) {
  const portrait = useMediaQuery(heroVideoMedia.portrait)
  const compact = useMediaQuery(heroVideoMedia.compact)
  const { reducedMotion } = useMotion()
  const format: HeroVideoFormat = portrait ? 'mobile' : compact ? 'tablet' : 'desktop'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedFormat, setFailedFormat] = useState<HeroVideoFormat | null>(null)
  const videoEnabled = !reducedMotion && failedFormat !== format
  const source: HeroVideoSource = heroVideoSources[format]

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoEnabled || !pageActive) return
    video.defaultPlaybackRate = heroVideoPlaybackRate
    video.playbackRate = heroVideoPlaybackRate
    let inView = false
    let active = true
    let playPending = false
    const syncPlayback = () => {
      if (!active) return
      if (inView && !document.hidden) {
        video.muted = true
        if (!video.paused || playPending) return
        playPending = true
        // Browsers that deny autoplay keep the poster visible.
        void video
          .play()
          .catch(() => undefined)
          .finally(() => {
            playPending = false
          })
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        syncPlayback()
      },
      { threshold: 0 },
    )
    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      active = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [format, videoEnabled, pageActive])

  return {
    videoRef,
    format,
    source,
    videoEnabled,
    onError: () => setFailedFormat(format),
  }
}
