import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  desktopHeroVideoSource,
  heroVideoPlaybackRate,
  responsiveHeroVideoSources,
} from '../config/hero'
import type { HeroVideoProps, HeroVisibility } from '../types/hero'
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
  const source = useSyncExternalStore(subscribeToHeroSource, getHeroSource, () => null)
  const { reducedMotion } = useMotion()
  const backdropRef = useRef<HTMLDivElement>(null)
  const [visibility, setVisibility] = useState<HeroVisibility>('unseen')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set())
  const videoEnabled =
    source !== null && visibility !== 'unseen' && !reducedMotion && !failedVideos.has(source.video)
  const playing = pageActive && visibility === 'visible' && videoEnabled

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop) return
    let inView = false
    // A direct showroom or product anchor can open the home with the hero already offscreen.
    const syncVisibility = () => {
      if (inView && !document.hidden) setVisibility('visible')
      else setVisibility((previous) => (previous === 'unseen' ? previous : 'hidden'))
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = (entry?.intersectionRatio ?? 0) >= 0.2
        syncVisibility()
      },
      { threshold: 0.2 },
    )
    observer.observe(backdrop)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  useLayoutEffect(() => {
    onTimeChange(videoRef.current?.currentTime ?? 0)
  }, [source, videoEnabled, onTimeChange])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !playing) return
    video.defaultPlaybackRate = heroVideoPlaybackRate
    video.playbackRate = heroVideoPlaybackRate
    const stopObservingTime = observeVideoTime(video, onTimeChange)
    video.muted = true
    if (video.paused) void video.play().catch(() => undefined)
    return () => {
      stopObservingTime()
      video.pause()
    }
  }, [source, playing, onTimeChange])

  return {
    backdropRef,
    videoRef,
    playing,
    source: videoEnabled ? source : null,
    onError: (video: string) =>
      setFailedVideos((previous) =>
        previous.has(video) ? previous : new Set([...previous, video]),
      ),
  }
}
