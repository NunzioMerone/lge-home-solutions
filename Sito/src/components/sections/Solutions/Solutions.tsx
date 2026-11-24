import { useEffect } from 'react'
import { HeroProductCarousel } from '../Hero/HeroProductCarousel'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { deferredProductPages } from '../../../utils/productPages'
import styles from './Solutions.module.css'

export function Solutions() {
  const ref = useSectionReveal({ duration: 0.9, stagger: 0.08, rootMargin: '0px 0px -48px 0px' })

  useEffect(() => {
    const section = ref.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        for (const page of deferredProductPages.values()) {
          void page.prepare()?.catch(() => {})
        }
      },
      { rootMargin: '400px' },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [ref])

  return (
    <section className={styles.section} id="prodotti" aria-labelledby="solutions-title" ref={ref}>
      <div className="container">
        <header className={styles.heading}>
          <h2 id="solutions-title">
            Le nostre <em>soluzioni</em>
          </h2>
        </header>
        <HeroProductCarousel />
      </div>
    </section>
  )
}
