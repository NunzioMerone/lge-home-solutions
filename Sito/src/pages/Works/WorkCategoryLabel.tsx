import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMotion } from '../../hooks/useMotion'
import type { WorkCategoryLabelProps } from '../../types/works'
import styles from './Works.module.css'

export function WorkCategoryLabel({ title }: WorkCategoryLabelProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const { reducedMotion } = useMotion()

  useLayoutEffect(() => {
    const label = ref.current
    if (!label || reducedMotion) return

    let reveal: gsap.core.Tween | undefined
    const context = gsap.context(() => {
      reveal = gsap.fromTo(
        label,
        { opacity: 0, maskPosition: '100% 0%' },
        {
          opacity: 1,
          maskPosition: '0% 0%',
          duration: 0.9,
          ease: 'power1.inOut',
          paused: true,
        },
      )
    }, label)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        reveal?.play()
        observer.disconnect()
      },
      { rootMargin: '0px 0px -22% 0px' },
    )
    observer.observe(label)
    return () => {
      observer.disconnect()
      context.revert()
    }
  }, [reducedMotion])

  return (
    <span ref={ref} className={styles.categoryLabel}>
      {title}
    </span>
  )
}
