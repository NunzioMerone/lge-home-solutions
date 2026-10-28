import { useState } from 'react'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import type { GalleryLightboxState } from '../../../types/gallery'
import { GalleryCarousel } from './GalleryCarousel'
import { GalleryLightbox } from './GalleryLightbox'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import styles from './Gallery.module.css'

export function Gallery() {
  const ref = useSectionReveal({ duration: 1.8, stagger: 0.2 })
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)
  return (
    <section
      className={`${styles.section} section`}
      id="lavori"
      aria-labelledby="gallery-title"
      ref={ref}
    >
      <div className="container">
        <header className={styles.heading} data-reveal>
          <h2 id="gallery-title">
            I nostri <em>lavori</em>
          </h2>
        </header>
      </div>
      <div className={styles.rail} data-reveal>
        <GalleryCarousel
          paused={lightbox !== null}
          onOpen={(photo, trigger) => setLightbox({ photo, trigger })}
        />
      </div>
      {lightbox && <GalleryLightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
