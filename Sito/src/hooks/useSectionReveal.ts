import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from '../config/motion'
import { useMotion } from './useMotion'
import type { SectionRevealOptions } from '../types/ui'

export function useSectionReveal({
  duration = motion.duration,
  stagger = motion.stagger,
}: SectionRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || reducedMotion) return
    let reveal: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      const items = root.querySelectorAll('[data-reveal]')
      reveal = gsap.timeline({ paused: true })
      reveal.fromTo(
        items,
        {
          opacity: 0,
          x: (_index: number, element: HTMLElement) =>
            element.dataset.revealDirection === 'right' ? motion.partnerDistance : 0,
          y: (_index: number, element: HTMLElement) =>
            element.dataset.revealDirection === 'right' ? 0 : motion.distance,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger,
          ease: motion.sectionEase,
        },
      )
      const lines = root.querySelectorAll('[data-heading-line]')
      if (lines.length)
        reveal.fromTo(
          lines,
          { scaleX: 0 },
          { scaleX: 1, duration: motion.headingLineDuration, ease: motion.sectionEase },
          motion.headingLineDelay,
        )
    }, root)
    let entered = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || entered) return
        entered = true
        reveal?.play()
        observer.disconnect()
      },
      { rootMargin: '0px 0px -22% 0px' },
    )
    observer.observe(root.querySelector('header[data-reveal]') ?? root)
    const finishForKeyboard = () => {
      entered = true
      observer.disconnect()
      reveal?.progress(1)
    }
    root.addEventListener('focusin', finishForKeyboard)
    return () => {
      observer.disconnect()
      root.removeEventListener('focusin', finishForKeyboard)
      context.revert()
    }
  }, [reducedMotion, duration, stagger])
  return ref
}
