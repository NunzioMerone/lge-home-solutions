import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useMotion } from './useMotion'
import type { LoopCarouselOptions } from '../types/carousel'

export function useLoopCarousel({
  paused = false,
  delay = 4200,
  continuousSpeed,
  onSelect,
}: LoopCarouselOptions = {}) {
  const { reducedMotion } = useMotion()
  const [selected, setSelected] = useState(0)
  const focusRequested = useRef(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const continuous = continuousSpeed !== undefined
  const plugins = useMemo(
    () =>
      continuousSpeed === undefined
        ? []
        : [
            AutoScroll({
              speed: continuousSpeed,
              startDelay: 1200,
              playOnInit: false,
              stopOnFocusIn: false,
            }),
          ],
    [continuousSpeed],
  )
  const [viewportRef, api] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      duration: 45,
      watchFocus: false,
      watchDrag: continuous
        ? (_api, event) => !(event.target instanceof Element && event.target.closest('button'))
        : true,
      watchResize: (_api: unknown, entries: ResizeObserverEntry[]) =>
        entries.some((entry) => entry.contentRect.width > 0),
    },
    plugins,
  )

  useEffect(() => {
    if (!api) return
    const sync = () => setSelected(api.selectedScrollSnap())
    const select = () => {
      sync()
      onSelect?.()
    }
    api.on('select', select).on('reInit', sync)
    sync()
    return () => {
      api.off('select', select).off('reInit', sync)
    }
  }, [api, onSelect])

  useLayoutEffect(() => {
    if (!focusRequested.current) return
    focusRequested.current = false
    api?.slideNodes()[selected]?.querySelector<HTMLElement>('[tabindex="0"]')?.focus({
      preventScroll: true,
    })
  }, [api, selected])

  useEffect(() => {
    if (!api) return
    if (reducedMotion) {
      api.scrollTo(api.selectedScrollSnap(), true)
      return
    }
    if (paused) return
    const viewport = regionRef.current ?? api.rootNode()
    let timer: number | undefined
    let visible = false
    let hovered = viewport.matches(':hover') && window.matchMedia('(hover: hover)').matches
    const hasReadingFocus = (element: EventTarget | null) =>
      element instanceof Element &&
      viewport.contains(element) &&
      (!continuous || element.matches(':focus-visible'))
    let focused = hasReadingFocus(document.activeElement)
    let dragging = false
    const clearAdvance = () => window.clearTimeout(timer)
    const stop = () => {
      clearAdvance()
      api.plugins().autoScroll?.stop()
    }
    const schedule = () => {
      clearAdvance()
      if (!visible || document.hidden || hovered || focused || dragging) {
        stop()
        return
      }
      if (continuous) {
        if (api.scrollSnapList().length > 1) api.plugins().autoScroll?.play()
      } else timer = window.setTimeout(() => api.scrollNext(), delay)
    }
    const enter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      hovered = true
      stop()
    }
    const leave = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      hovered = false
      schedule()
    }
    const focusIn = (event: FocusEvent) => {
      focused = hasReadingFocus(event.target)
      schedule()
    }
    const focusOut = (event: FocusEvent) => {
      focused = hasReadingFocus(event.relatedTarget)
      schedule()
    }
    const pointerDown = () => {
      dragging = true
      stop()
    }
    const pointerUp = () => {
      dragging = false
      schedule()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        schedule()
      },
      { threshold: 0.2 },
    )
    observer.observe(viewport)
    api
      .on('select', clearAdvance)
      .on('settle', schedule)
      .on('reInit', schedule)
      .on('pointerDown', pointerDown)
      .on('pointerUp', pointerUp)
    viewport.addEventListener('pointerenter', enter)
    viewport.addEventListener('pointerleave', leave)
    if (continuous) {
      // Stop before drag handling or a control click changes the carousel position.
      viewport.addEventListener('pointerdown', stop, true)
      viewport.addEventListener('pointerup', schedule)
      viewport.addEventListener('pointercancel', schedule)
    }
    viewport.addEventListener('focusin', focusIn)
    viewport.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      stop()
      observer.disconnect()
      api
        .off('select', clearAdvance)
        .off('settle', schedule)
        .off('reInit', schedule)
        .off('pointerDown', pointerDown)
        .off('pointerUp', pointerUp)
      viewport.removeEventListener('pointerenter', enter)
      viewport.removeEventListener('pointerleave', leave)
      viewport.removeEventListener('pointerdown', stop, true)
      viewport.removeEventListener('pointerup', schedule)
      viewport.removeEventListener('pointercancel', schedule)
      viewport.removeEventListener('focusin', focusIn)
      viewport.removeEventListener('focusout', focusOut)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [api, continuous, delay, paused, reducedMotion])

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        !api ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
      )
        return
      event.preventDefault()
      const previous = api.selectedScrollSnap()
      focusRequested.current = true
      if (event.key === 'ArrowLeft') api.scrollPrev(reducedMotion)
      else if (event.key === 'ArrowRight') api.scrollNext(reducedMotion)
      else api.scrollTo(event.key === 'Home' ? 0 : api.scrollSnapList().length - 1, reducedMotion)
      if (api.selectedScrollSnap() === previous) focusRequested.current = false
    },
    [api, reducedMotion],
  )

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index, reducedMotion),
    [api, reducedMotion],
  )
  const scrollPrev = useCallback(() => api?.scrollPrev(reducedMotion), [api, reducedMotion])
  const scrollNext = useCallback(() => api?.scrollNext(reducedMotion), [api, reducedMotion])

  return {
    regionRef,
    viewportRef,
    selected,
    onKeyDown,
    scrollTo,
    scrollPrev,
    scrollNext,
  }
}
