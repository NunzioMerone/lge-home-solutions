import { useHydrated } from '../../hooks/useHydrated'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { GalleryLightbox } from '../../components/sections/Gallery/GalleryLightbox'
import { allWorkPhotos, workCategories, workCollections } from '../../data/works'
import { parseWorkFilter } from '../../utils/works'
import type { GalleryLightboxProps } from '../../types/gallery'
import WorkCaseStudies from './WorkCaseStudies'
import { WorkFilters } from './WorkFilters'
import { WorkGallery } from './WorkGallery'
import { WorksHero } from './WorksHero'
import { WorksContact } from './WorksContact'
import { WorkCategoryLabel } from './WorkCategoryLabel'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import styles from './Works.module.css'

const showFeatured = import.meta.env.VITE_PUBLIC_PREVIEW !== 'false'

export function Works() {
  const [params] = useSearchParams()
  const { hash } = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useSectionReveal()
  const hydrated = useHydrated()
  const selected = parseWorkFilter(
    hydrated ? params.get('categoria') : null,
    workCategories,
    showFeatured,
  )
  const featured = selected === 'in-evidenza'
  const [lightbox, setLightbox] = useState<Omit<GalleryLightboxProps, 'onClose'> | null>(null)
  const collection = workCollections.find((item) => item.id === selected)
  const photos = collection?.photos ?? allWorkPhotos
  const title = featured ? 'In evidenza' : (collection?.title ?? 'Tutti i lavori')

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let id: string
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      return
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
      if (id === 'works-content') contentRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [hash])

  useEffect(() => {
    const closeLightbox = () => setLightbox(null)
    window.addEventListener('popstate', closeLightbox)
    return () => window.removeEventListener('popstate', closeLightbox)
  }, [])

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#works-content">
        Vai alle fotografie
      </a>
      <Header />
      <main className={styles.main}>
        <WorksHero />
        <WorkFilters selected={selected} showFeatured={showFeatured} />
        <div
          className={`container ${styles.collections}`}
          id="works-content"
          tabIndex={-1}
          ref={contentRef}
        >
          <header className={styles.collectionHeading} ref={headingRef}>
            <h2 id="work-gallery-title">
              <span className={styles.fixedTitle} data-reveal>
                I nostri lavori
              </span>
              <span className={styles.categorySlot} aria-live="polite" aria-atomic="true">
                {selected !== 'tutti' && <WorkCategoryLabel key={selected} title={title} />}
              </span>
            </h2>
          </header>
          {showFeatured && (featured || !hydrated) && (
            <div id="in-evidenza" className={styles.featuredView} data-selected={featured}>
              <WorkCaseStudies onOpen={setLightbox} />
            </div>
          )}
          {!featured && (
            <WorkGallery
              key={selected}
              photos={photos}
              title={title}
              onOpen={(photo, trigger) => setLightbox({ photos, photo, trigger })}
            />
          )}
        </div>
        <WorksContact />
      </main>
      <Footer />
      {lightbox && <GalleryLightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}
