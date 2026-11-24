import { useCallback, useState } from 'react'
import { useLoopCarousel } from '../../../hooks/useLoopCarousel'
import type { ReviewsCarouselProps } from '../../../types/reviews'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { ReviewCard } from './ReviewCard'
import { ReviewPagination } from './ReviewPagination'
import { CarouselArrow } from '../../ui/CarouselArrow'
import styles from './ReviewsCarousel.module.css'

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const closeExpandedReview = useCallback(() => setExpandedId(null), [])
  const {
    regionRef,
    viewportRef,
    selected,
    snapCount,
    onKeyDown,
    scrollTo,
    scrollPrev,
    scrollNext,
  } = useLoopCarousel({
    continuousSpeed: 0.27,
    paused: expandedId !== null || reviews.length < 2,
    onSelect: closeExpandedReview,
  })
  const scrollable = snapCount > 1

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Recensioni Google"
      aria-roledescription={scrollable ? 'carosello' : undefined}
      onKeyDown={scrollable ? onKeyDown : undefined}
    >
      {scrollable && (
        <p id="reviews-instructions" className="sr-only">
          Usa i tasti freccia per scorrere le recensioni. Lo scorrimento automatico si ferma durante
          la lettura e le interazioni.
        </p>
      )}
      <div className={styles.viewport} ref={viewportRef} id="reviews-carousel-viewport">
        <div className={styles.track}>
          {reviews.map((review, index) => {
            const visible =
              !scrollable || Math.abs(getLoopOffset(index, selected, reviews.length)) <= 2
            return (
              <div
                key={review.id}
                className={styles.slide}
                aria-hidden={!visible}
                inert={!visible}
                role="group"
                aria-roledescription={scrollable ? 'diapositiva' : undefined}
                aria-label={`${index + 1} di ${reviews.length}`}
              >
                <ReviewCard
                  review={review}
                  active={scrollable && index === selected}
                  expanded={expandedId === review.id}
                  onToggleExpanded={() =>
                    setExpandedId((id) => (id === review.id ? null : review.id))
                  }
                />
              </div>
            )
          })}
        </div>
      </div>
      {scrollable && (
        <div className={styles.controls}>
          <CarouselArrow
            direction="previous"
            label="Recensione precedente"
            controlsId="reviews-carousel-viewport"
            onClick={scrollPrev}
          />
          <ReviewPagination reviews={reviews} selected={selected} onSelect={scrollTo} />
          <CarouselArrow
            direction="next"
            label="Recensione successiva"
            controlsId="reviews-carousel-viewport"
            onClick={scrollNext}
          />
        </div>
      )}
    </div>
  )
}
