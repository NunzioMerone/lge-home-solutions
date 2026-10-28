import { gallery } from '../../../data/gallery'
import { useLoopCarousel } from '../../../hooks/useLoopCarousel'
import type { GalleryCarouselProps } from '../../../types/gallery'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { CarouselArrow } from '../../ui/CarouselArrow'
import styles from './GalleryCarousel.module.css'

// Two sets keep Embla's loop outside the five visible positions.
const slides = [0, 1].flatMap((copy) =>
  gallery.map((item) => ({ ...item, key: `${item.id}-${copy}` })),
)

export function GalleryCarousel({ paused, onOpen }: GalleryCarouselProps) {
  const { regionRef, viewportRef, selected, onKeyDown, scrollTo, scrollPrev, scrollNext } =
    useLoopCarousel({ paused })
  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="I nostri lavori"
      aria-roledescription="carosello"
      onKeyDown={onKeyDown}
    >
      <p id="gallery-instructions" className="sr-only">
        Usa i tasti freccia per scorrere le fotografie e Invio per ingrandirle.
      </p>
      <div className={styles.stage}>
        <div className={styles.viewport} ref={viewportRef} id="gallery-carousel-viewport">
          <div className={styles.track}>
            {slides.map((item, index) => {
              const depth = Math.abs(getLoopOffset(index, selected, slides.length))
              const visible = depth <= 2
              return (
                <div
                  key={item.key}
                  className={styles.slide}
                  data-depth={Math.min(depth, 3)}
                  aria-hidden={!visible}
                  inert={!visible}
                  role="group"
                  aria-roledescription="diapositiva"
                  aria-label={`${(index % gallery.length) + 1} di ${gallery.length}`}
                >
                  <button
                    className={styles.photo}
                    type="button"
                    tabIndex={depth === 0 ? 0 : -1}
                    aria-current={depth === 0 ? 'true' : undefined}
                    aria-label={`Ingrandisci foto: ${item.category}`}
                    aria-describedby="gallery-instructions"
                    aria-haspopup="dialog"
                    onClick={(event) => onOpen(item.photo, event.currentTarget)}
                  >
                    <ResponsiveImage
                      photo={item.photo}
                      sizes="(min-width: 1200px) 480px, (min-width: 700px) 42vw, 71vw"
                      decorative
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.arrows} role="group" aria-label="Navigazione fotografie">
          <CarouselArrow
            direction="previous"
            label="Fotografia precedente"
            controlsId="gallery-carousel-viewport"
            onClick={scrollPrev}
          />
          <CarouselArrow
            direction="next"
            label="Fotografia successiva"
            controlsId="gallery-carousel-viewport"
            onClick={scrollNext}
          />
        </div>
      </div>
      <div className={styles.pagination} role="group" aria-label="Posizioni della galleria">
        {gallery.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-label={`Mostra fotografia ${index + 1} di ${gallery.length}`}
            aria-current={selected % gallery.length === index ? 'true' : undefined}
            onClick={() =>
              scrollTo(
                (selected +
                  getLoopOffset(index, selected % gallery.length, gallery.length) +
                  slides.length) %
                  slides.length,
              )
            }
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}
