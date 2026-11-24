import { useReviews } from '../../../hooks/useReviews'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { elfsightReviewsWidgetId } from '../../../config/elfsightReviews'
import { lgeGooglePlace } from '../../../config/googlePlaces'
import { assetUrl } from '../../../utils/assetUrl'
import { ElfsightReviews } from './ElfsightReviews'
import { ReviewsCarousel } from './ReviewsCarousel'
import { RatingStars } from './RatingStars'
import { Skeleton, SkeletonText } from '../../ui/Skeleton'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import styles from './Reviews.module.css'

function ReviewsSkeleton() {
  return (
    <div className={styles.loadingCards} role="status" aria-label="Preparazione delle recensioni">
      {[0, 1, 2].map((item) => (
        <div className={styles.loadingCard} key={item} aria-hidden="true">
          <Skeleton className={styles.loadingRating} />
          <SkeletonText lines={5} />
          <Skeleton className={styles.loadingAuthor} />
        </div>
      ))}
    </div>
  )
}

export function Reviews() {
  const ref = useSectionReveal()
  const state = useReviews(ref, !elfsightReviewsWidgetId)
  const data = state.status === 'ready' ? state.data : null
  const average = elfsightReviewsWidgetId ? null : (data?.average ?? null)
  const totalCount = elfsightReviewsWidgetId ? null : (data?.totalCount ?? null)
  const carousel = data?.items.length ? <ReviewsCarousel reviews={data.items} /> : null

  return (
    <section
      className={`${styles.section} section`}
      id="recensioni"
      aria-labelledby="reviews-title"
      ref={ref}
    >
      <div className="container">
        <div className={styles.headingRow}>
          <header className={styles.heading} data-reveal>
            <h2 id="reviews-title">
              Cosa dicono di <em>noi</em>
            </h2>
            <p>Le parole di chi ha scelto LGE per la propria casa.</p>
          </header>
          <div className={styles.summaryReveal} data-reveal data-reveal-direction="right">
            <a
              className={styles.googleSummary}
              href={data?.url ?? lgeGooglePlace.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={assetUrl('img/reviews/google-g.png')}
                alt=""
                width="44"
                height="44"
                loading="lazy"
              />
              <div>
                {average !== null && totalCount !== null && (
                  <>
                    <span className={styles.summaryText}>
                      <strong>
                        {average.toLocaleString('it-IT', {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                        <span>/5</span>
                      </strong>
                      <span>
                        {totalCount.toLocaleString('it-IT')}{' '}
                        {totalCount === 1 ? 'recensione' : 'recensioni'}
                      </span>
                    </span>
                    <RatingStars rating={average} />
                  </>
                )}
                <span className={styles.readReviews}>
                  Leggi tutte su <span translate="no">Google Maps</span>
                  <span className="sr-only"> (nuova scheda)</span>
                </span>
              </div>
            </a>
          </div>
        </div>
        <div data-reveal>
          {elfsightReviewsWidgetId ? (
            <ElfsightReviews widgetId={elfsightReviewsWidgetId}>{carousel}</ElfsightReviews>
          ) : carousel ? (
            carousel
          ) : state.status === 'loading' ? (
            <ReviewsSkeleton />
          ) : state.status === 'ready' ? (
            <p className={styles.status}>Consulta le recensioni su Google Maps.</p>
          ) : (
            <p role="status" className={styles.status}>
              Recensioni temporaneamente non disponibili.
            </p>
          )}
          {data?.attributions?.length ? (
            <ul className={styles.attributions} aria-label="Fonti dei dati">
              {data.attributions.map(({ provider, url }) => (
                <li key={`${provider}-${url ?? ''}`}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {provider}
                    </a>
                  ) : (
                    provider
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}
