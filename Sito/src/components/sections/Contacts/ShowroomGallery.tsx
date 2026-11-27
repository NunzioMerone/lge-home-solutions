import { useState } from 'react'
import { showroomPhotos } from '../../../data/showroomPhotos'
import { useMotion } from '../../../hooks/useMotion'
import { useShowroomCarousel } from '../../../hooks/useShowroomCarousel'
import type { GalleryLightboxState } from '../../../types/gallery'
import type { PageActivityProps } from '../../../types/navigation'
import { galleryImageUrl } from '../../../utils/galleryImages'
import { CarouselArrow } from '../../ui/CarouselArrow'
import { Icon } from '../../ui/Icon'
import { Skeleton } from '../../ui/Skeleton'
import { SettledImage } from '../../ui/SettledImage'
import { GalleryLightbox } from '../Gallery/GalleryLightbox'
import styles from './ShowroomGallery.module.css'

const viewportId = 'showroom-gallery-photos'
const photoSizes =
  '(min-width: 1520px) 720px, (min-width: 1200px) 47vw, (min-width: 820px) 760px, 92vw'

export function ShowroomGallery({ active }: PageActivityProps) {
  const { reducedMotion } = useMotion()
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)
  if (!active && lightbox) setLightbox(null)

  const { regionRef, frame, advance, settle, finishFade } = useShowroomCarousel(
    showroomPhotos.length,
    active && lightbox === null,
    reducedMotion,
  )
  const photo = showroomPhotos[frame.current ?? frame.target] ?? showroomPhotos[0]
  const pending = frame.loadState === 'loading' ? frame.target : null
  const layers = [...new Set([frame.previous, frame.current, pending])]

  return (
    <>
      <div
        className={styles.gallery}
        ref={regionRef}
        role="region"
        aria-label="Foto dello showroom"
        aria-roledescription="carosello"
        data-reveal
        data-reveal-direction="fade"
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          advance(event.key === 'ArrowLeft' ? -1 : 1)
        }}
      >
        <button
          className={styles.open}
          type="button"
          aria-label={`Ingrandisci foto: ${photo.alt}`}
          aria-haspopup="dialog"
          disabled={frame.current === null}
          onClick={(event) => setLightbox({ photo, trigger: event.currentTarget })}
        >
          <span className={styles.stage} id={viewportId} aria-hidden="true">
            {frame.current === null && pending !== null && <Skeleton className={styles.skeleton} />}
            {frame.current === null && pending === null && (
              <span className={styles.error}>Fotografia non disponibile</span>
            )}
            {layers.map((index) => {
              const layer = index === null ? undefined : showroomPhotos[index]
              if (index === null || !layer) return null

              const current = index === frame.current
              return (
                <span
                  className={styles.slide}
                  key={layer.id}
                  data-photo-id={layer.id}
                  data-phase={current ? 'current' : index === pending ? 'pending' : 'outgoing'}
                  data-fading={current && frame.previous !== null}
                  onAnimationEnd={() => finishFade(index)}
                >
                  <SettledImage
                    className={styles.image}
                    src={galleryImageUrl(layer, layer.previewWidths[0])}
                    srcSet={layer.previewWidths
                      .map((width) => `${galleryImageUrl(layer, width)} ${width}w`)
                      .join(', ')}
                    sizes={photoSizes}
                    width={layer.width}
                    height={layer.height}
                    loading={index === 0 ? 'lazy' : 'eager'}
                    decoding="async"
                    draggable={false}
                    alt={layer.alt}
                    decodeBeforeSettling
                    onSettled={(ready) => settle(index, ready)}
                  />
                </span>
              )
            })}
          </span>
          {frame.current !== null && (
            <span className={styles.expand} aria-hidden="true">
              <Icon name="expand" /> Ingrandisci
            </span>
          )}
        </button>
        <div className={styles.controls} role="group" aria-label="Navigazione foto dello showroom">
          <CarouselArrow
            direction="previous"
            label="Foto precedente dello showroom"
            controlsId={viewportId}
            onClick={() => advance(-1)}
            showOnMobile
          />
          <CarouselArrow
            direction="next"
            label="Foto successiva dello showroom"
            controlsId={viewportId}
            onClick={() => advance(1)}
            showOnMobile
          />
        </div>
      </div>
      {lightbox && (
        <GalleryLightbox {...lightbox} photos={showroomPhotos} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
