import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  desktopHeroVideoSource,
  heroVideoPlaybackRate,
  responsiveHeroVideoSources,
} from '../config/hero'
import type { HeroVideoSource } from '../types/hero'
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

function observeVideoTime(video: HTMLVideoElement, onTimeChange: (time: number) => void) {
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

export function useHeroVideo(pageActive: boolean, onTimeChange: (time: number) => void) {
  const [source, setSource] = useState<HeroVideoSource | null>(null)
  const { reducedMotion } = useMotion()
  const backdropRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pausedAt = useRef<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set())
  const videoEnabled = source !== null && !reducedMotion && !failedVideos.has(source.video)
  const active = pageActive && visible && videoEnabled

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop) return
    let inView = false
    const chooseSource = () => {
      // Keep the displayed rendition and frame through a resize or rotation while paused.
      if (inView && !document.hidden && pausedAt.current === null) setSource(getHeroSource())
    }
    // A direct showroom or product anchor can open the home with the hero already offscreen.
    const syncVisibility = () => {
      chooseSource()
      setVisible(inView && !document.hidden)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = (entry?.intersectionRatio ?? 0) >= 0.2
        syncVisibility()
      },
      { threshold: 0.2 },
    )
    observer.observe(backdrop)
    const unsubscribeSource = subscribeToHeroSource(chooseSource)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      unsubscribeSource()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  useLayoutEffect(() => {
    const video = videoRef.current
    if (video && pausedAt.current !== null) video.currentTime = pausedAt.current
    onTimeChange(video?.currentTime ?? 0)
  }, [source, videoEnabled, onTimeChange])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) return
    video.defaultPlaybackRate = heroVideoPlaybackRate
    video.playbackRate = heroVideoPlaybackRate
    const stopObservingTime = observeVideoTime(video, onTimeChange)
    video.muted = true
    const syncPlayback = () => {
      if (video === videoRef.current) setPaused(video.paused)
    }
    video.addEventListener('play', syncPlayback)
    video.addEventListener('pause', syncPlayback)
    if (pausedAt.current === null && video.paused) void video.play().catch(syncPlayback)
    syncPlayback()
    return () => {
      video.removeEventListener('play', syncPlayback)
      video.removeEventListener('pause', syncPlayback)
      stopObservingTime()
      video.pause()
    }
  }, [source, active, onTimeChange])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video || !active) return
    if (video.paused) {
      pausedAt.current = null
      // A direct user gesture also permits playback when automatic playback was blocked.
      void video.play().catch(() => {
        if (video === videoRef.current) setPaused(video.paused)
      })
    } else {
      video.pause()
      pausedAt.current = video.currentTime
    }
    setPaused(video.paused)
  }

  return {
    backdropRef,
    videoRef,
    visible: active,
    paused,
    togglePlayback,
    source: videoEnabled ? source : null,
    onError: (video: string) =>
      setFailedVideos((previous) =>
        previous.has(video) ? previous : new Set([...previous, video]),
      ),
  }
}
