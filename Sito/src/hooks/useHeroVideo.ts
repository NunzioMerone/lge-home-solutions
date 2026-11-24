import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  desktopHeroVideoSource,
  heroVideoPlaybackRate,
  responsiveHeroVideoSources,
} from '../config/hero'
import { useMotion } from './useMotion'

function subscribeToHeroSource(notify: () => void) {
  const queries = responsiveHeroVideoSources.map(({ media }) => window.matchMedia(media))
  for (const query of queries) query.addEventListener('change', notify)
  return () => {
    for (const query of queries) query.removeEventListener('change', notify)
  }
}

function getHeroSource() {
  return (
    responsiveHeroVideoSources.find(({ media }) => window.matchMedia(media).matches) ??
    desktopHeroVideoSource
  )
}

export function useHeroVideo(pageActive: boolean) {
  const source = useSyncExternalStore(
    subscribeToHeroSource,
    getHeroSource,
    () => desktopHeroVideoSource,
  )
  const { reducedMotion } = useMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set())
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
