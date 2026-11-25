import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  desktopHeroVideoSource,
  heroVideoPlaybackRate,
  responsiveHeroVideoSources,
} from '../config/hero'
import type { HeroVideoProps } from '../types/hero'
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

function observeVideoTime(video: HTMLVideoElement, onTimeChange: HeroVideoProps['onTimeChange']) {
  const syncTime = () => onTimeChange(video.currentTime)
  let frameRequest: number | undefined

  if (typeof video.requestVideoFrameCallback === 'function') {
    const syncFrame: VideoFrameRequestCallback = (_, { mediaTime }) => {
      onTimeChange(mediaTime)
      frameRequest = video.requestVideoFrameCallback(syncFrame)
    }
    frameRequest = video.requestVideoFrameCallback(syncFrame)
  } else {
    video.addEventListener('timeupdate', syncTime)
  }
  video.addEventListener('seeked', syncTime)
  syncTime()

  return () => {
    if (frameRequest !== undefined) video.cancelVideoFrameCallback(frameRequest)
    video.removeEventListener('timeupdate', syncTime)
    video.removeEventListener('seeked', syncTime)
  }
}

export function useHeroVideo(pageActive: boolean, onTimeChange: HeroVideoProps['onTimeChange']) {
  const source = useSyncExternalStore(
    subscribeToHeroSource,
    getHeroSource,
    () => desktopHeroVideoSource,
  )
  const { reducedMotion } = useMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set())
  const videoEnabled = !reducedMotion && !failedVideos.has(source.video)

  useLayoutEffect(() => {
    onTimeChange(videoRef.current?.currentTime ?? 0)
  }, [source.video, videoEnabled, onTimeChange])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoEnabled || !pageActive) return
    video.defaultPlaybackRate = heroVideoPlaybackRate
    video.playbackRate = heroVideoPlaybackRate
    const stopObservingTime = observeVideoTime(video, onTimeChange)
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
      stopObservingTime()
      video.pause()
    }
  }, [source.video, videoEnabled, pageActive, onTimeChange])

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
