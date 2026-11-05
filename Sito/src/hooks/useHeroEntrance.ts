import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { heroHeadlineMotion } from '../config/hero'
import { heroCopy } from '../data/hero'
import { useMotion } from './useMotion'

export function useHeroEntrance() {
  const rootRef = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return
    const introduction = root.querySelector<HTMLElement>('[data-introduction]')
    const live = root.querySelector<HTMLElement>('[data-hero-live]')
    const text = root.querySelector<HTMLElement>('[data-hero-text]')
    if (!introduction || !live || !text) return
    const originalText = text.textContent
    let entrance: gsap.core.Timeline | undefined
    let rotation: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      entrance = gsap.timeline({ paused: true })
      entrance
        .fromTo(
          root.querySelector('[data-hero-eyebrow]'),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          0,
        )
        .fromTo(
          root.querySelector('[data-hero-prefix]'),
          { opacity: 0, y: 6, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power2.out' },
          0.05,
        )
        .fromTo(
          root.querySelector('[data-hero-subtitle]'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          0.2,
        )

      gsap.set(live, { autoAlpha: 0, maskPosition: '100% 0%' })
      const headline = gsap.timeline({
        paused: true,
        repeat: -1,
        delay: heroHeadlineMotion.initialDelay,
        repeatDelay: heroHeadlineMotion.betweenDuration,
      })
      rotation = headline
      heroCopy.phrases.forEach((phrase, index) => {
        headline
          .call(
            () => {
              text.textContent = phrase
            },
            undefined,
            index === 0 ? 0 : `+=${heroHeadlineMotion.betweenDuration}`,
          )
          .fromTo(
            live,
            { autoAlpha: 1, maskPosition: '100% 0%' },
            {
              autoAlpha: 1,
              maskPosition: '0% 0%',
              duration: heroHeadlineMotion.revealDuration,
              ease: 'power1.inOut',
              immediateRender: false,
            },
          )
          .to(
            live,
            {
              autoAlpha: 0,
              duration: heroHeadlineMotion.exitDuration,
              ease: 'power1.inOut',
            },
            `+=${heroHeadlineMotion.holdDuration}`,
          )
      })
    }, root)
    let inView = false
    const syncVisibility = () => {
      const running = inView && !document.hidden
      entrance?.paused(!running)
      rotation?.paused(!running)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        syncVisibility()
      },
      { threshold: 0.1 },
    )
    observer.observe(introduction)
    document.addEventListener('visibilitychange', syncVisibility)
    const revealForKeyboard = () => {
      entrance?.progress(1)
    }
    root.addEventListener('focusin', revealForKeyboard)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
      root.removeEventListener('focusin', revealForKeyboard)
      context.revert()
      text.textContent = originalText
    }
  }, [reducedMotion])

  return rootRef
}
