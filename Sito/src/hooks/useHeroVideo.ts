import { useEffect, useRef, useState } from 'react'
import { heroVideoMedia, heroVideoPlaybackRate, heroVideoSources } from '../config/hero'
import type { HeroVideoSource } from '../types/hero'
import { useMediaQuery } from './useMediaQuery'
import { useMotion } from './useMotion'

export function useHeroVideo(pageActive: boolean) {
  const portrait = useMediaQuery(heroVideoMedia.portrait)
  const compact = useMediaQuery(heroVideoMedia.compact)
  const largeTablet = useMediaQuery(heroVideoMedia.largeTablet)
  const { reducedMotion } = useMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set())
  const standardFormat = portrait ? 'mobile' : compact ? 'tablet' : 'desktop'
  const source: HeroVideoSource = heroVideoSources[largeTablet ? 'largeTablet' : standardFormat]
  const videoEnabled = !reducedMotion && !failedVideos.has(source.video)

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
  }, [source.video, videoEnabled, pageActive])

  return {
    videoRef,
    source,
    videoEnabled,
    onError: () =>
      setFailedVideos((previous) =>
        previous.has(source.video) ? previous : new Set([...previous, source.video]),
      ),
  }
}
