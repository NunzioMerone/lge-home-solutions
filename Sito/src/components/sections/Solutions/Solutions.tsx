import { HeroProductCarousel } from '../Hero/HeroProductCarousel'
import { useSectionImages } from '../../../hooks/useSectionImages'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import styles from './Solutions.module.css'

export function Solutions() {
  const ref = useSectionReveal({ duration: 0.9, stagger: 0.08, rootMargin: '0px 0px -48px 0px' })
  const imagesReady = useSectionImages(ref)

  return (
    <section
      className={styles.section}
      id="prodotti"
      aria-labelledby="solutions-title"
      data-defer-images={!imagesReady || undefined}
      ref={ref}
    >
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
