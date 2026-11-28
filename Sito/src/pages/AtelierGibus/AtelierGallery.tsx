import { useRef } from 'react'
import { useSectionImages } from '../../hooks/useSectionImages'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { GalleryPagination } from '../../components/sections/Gallery/GalleryPagination'
import { CarouselArrow } from '../../components/ui/CarouselArrow'
import { useLoopCarousel } from '../../hooks/useLoopCarousel'
import type { GibusGalleryProps } from '../../types/atelierGibus'
import pageStyles from './AtelierGibus.module.css'
import styles from './AtelierShowcase.module.css'

const photoSizes =
  '(min-width: 1660px) 950px, (min-width: 1100px) and (hover: hover) and (pointer: fine) 58vw, (min-width: 900px) and (orientation: landscape) 52vw, 91vw'

export function AtelierGallery({
  id,
  title,
  photos,
  showGalleryImages,
  onOpen,
}: GibusGalleryProps) {
  const stage = useRef<HTMLDivElement>(null)
  const ready = useSectionImages(stage, showGalleryImages)
  const { regionRef, viewportRef, selected, onKeyDown, scrollTo, scrollPrev, scrollNext } =
    useLoopCarousel({ paused: true, active: ready })
  const viewportId = `${id}-photos`

  return (
    <div
      className={styles.chapterPhoto}
      ref={regionRef}
      role="region"
      aria-label={`Foto Gibus · ${title}`}
      aria-roledescription="carosello"
      onKeyDown={onKeyDown}
      data-defer-images={!ready || undefined}
    >
      <div className={styles.photoStage} ref={stage}>
        <div className={styles.photoViewport} id={viewportId} ref={viewportRef}>
          <div className={styles.photoTrack}>
            {photos.map((photo, index) => {
              const active = index === selected
              const distance = Math.abs(index - selected)
              const neighbor = distance === 1 || distance === photos.length - 1
              return (
                <div
                  className={styles.photoSlide}
                  key={photo.id}
                  aria-hidden={!active}
                  inert={!active}
                >
                  <button
                    className={`${pageStyles.photoButton} ${styles.openPhoto}`}
                    type="button"
                    tabIndex={active ? 0 : -1}
                    aria-label={`Ingrandisci foto: ${photo.alt}`}
                    aria-haspopup="dialog"
                    onClick={(event) => onOpen(photo, event.currentTarget)}
                  >
                    {(active || (ready && neighbor)) && (
                      <GalleryImage
                        photo={photo}
                        sizes={photoSizes}
                        loading={active && index !== 0 ? 'eager' : 'lazy'}
                      />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <span className={styles.photoCredit}>Foto Gibus</span>
        <div className={styles.photoArrows} role="group" aria-label="Navigazione fotografie">
          <CarouselArrow
            direction="previous"
            label="Fotografia precedente"
            controlsId={viewportId}
            onClick={scrollPrev}
            showOnMobile
          />
          <CarouselArrow
            direction="next"
            label="Fotografia successiva"
            controlsId={viewportId}
            onClick={scrollNext}
            showOnMobile
          />
        </div>
      </div>
      <GalleryPagination count={photos.length} selected={selected} onSelect={scrollTo} />
    </div>
  )
}
