import { useCallback, useEffect, useRef, useState } from 'react'
import type { ShowroomFrame } from '../types/showroom'

const rotationDelay = 4500

export function useShowroomCarousel(count: number, autoplay: boolean, reducedMotion: boolean) {
  const regionRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState<ShowroomFrame>({
    current: null,
    previous: null,
    target: 0,
    loadState: 'loading',
  })

  const advance = useCallback(
    (step: -1 | 1) => {
      setFrame((currentFrame) => {
        const target = (currentFrame.target + step + count) % count
        if (target === currentFrame.current) return { ...currentFrame, target, loadState: 'ready' }
        if (target === currentFrame.previous)
          return {
            current: target,
            previous: reducedMotion ? null : currentFrame.current,
            target,
            loadState: 'ready',
          }
        return { ...currentFrame, target, loadState: 'loading' }
      })
    },
    [count, reducedMotion],
  )

  const settle = (index: number, ready: boolean) => {
    setFrame((currentFrame) => {
      if (currentFrame.target !== index || currentFrame.loadState !== 'loading') return currentFrame
      if (!ready) return { ...currentFrame, loadState: 'failed' }
      return {
        current: index,
        previous: reducedMotion ? null : currentFrame.current,
        target: index,
        loadState: 'ready',
      }
    })
  }

  const finishFade = (index: number) => {
    setFrame((currentFrame) =>
      currentFrame.current === index && currentFrame.previous !== null
        ? { ...currentFrame, previous: null }
        : currentFrame,
    )
  }

  const canRotate = autoplay && !reducedMotion && count > 1 && frame.loadState !== 'loading'
  useEffect(() => {
    const region = regionRef.current
    if (!region || !canRotate) return

    let visible = false
    let hovered = window.matchMedia('(hover: hover)').matches && region.matches(':hover')
    let focused = region.contains(document.activeElement)
    let timer: number | undefined

    const schedule = () => {
      window.clearTimeout(timer)
      if (visible && !document.hidden && !hovered && !focused)
        timer = window.setTimeout(() => advance(1), rotationDelay)
    }
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      hovered = event.type === 'pointerenter'
      schedule()
    }
    const onFocus = (event: FocusEvent) => {
      const destination = event.type === 'focusin' ? event.target : event.relatedTarget
      focused = destination instanceof Node && region.contains(destination)
      schedule()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = (entry?.intersectionRatio ?? 0) >= 0.25
        schedule()
      },
      { threshold: 0.25 },
    )

    observer.observe(region)
    region.addEventListener('pointerenter', onPointer)
    region.addEventListener('pointerleave', onPointer)
    region.addEventListener('focusin', onFocus)
    region.addEventListener('focusout', onFocus)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      region.removeEventListener('pointerenter', onPointer)
      region.removeEventListener('pointerleave', onPointer)
      region.removeEventListener('focusin', onFocus)
      region.removeEventListener('focusout', onFocus)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [advance, canRotate, frame.target])

  return { regionRef, frame, advance, settle, finishFade }
}
