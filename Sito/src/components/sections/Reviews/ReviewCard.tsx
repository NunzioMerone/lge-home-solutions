import type { ReviewCardProps } from '../../../types/reviews'
import { assetUrl } from '../../../utils/assetUrl'
import { RatingStars } from './RatingStars'
import { ReviewText } from './ReviewText'
import styles from './Reviews.module.css'

export function ReviewCard({
  review,
  active = false,
  expanded,
  onToggleExpanded,
}: ReviewCardProps) {
  return (
    <article
      className={styles.card}
      data-has-comment={Boolean(review.text)}
      tabIndex={active ? 0 : -1}
      aria-label={`Recensione di ${review.author}`}
      aria-describedby={active ? 'reviews-instructions' : undefined}
    >
      <div className={styles.rating}>
        <img
          className={styles.googleMark}
          src={assetUrl('img/reviews/google-g.png')}
          alt="Google"
          width="36"
          height="36"
          loading="lazy"
        />
        <div>
          <div className={styles.ratingValue}>
            <strong>{review.rating.toLocaleString('it-IT', { minimumFractionDigits: 1 })}</strong>
            <RatingStars rating={review.rating} />
          </div>
          <span className={styles.ratingLabel} translate="no">
            Google Maps
          </span>
        </div>
      </div>
      {review.text && (
        <div className={styles.quote}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <ReviewText text={review.text} expanded={expanded} onToggleExpanded={onToggleExpanded} />
        </div>
      )}
      <footer className={styles.author}>
        <span className={styles.avatar} data-tone={review.avatarTone} aria-hidden="true">
          {review.initials}
          {review.authorPhotoUrl && (
            <img
              src={review.authorPhotoUrl}
              alt=""
              width="36"
              height="36"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.hidden = true
              }}
            />
          )}
        </span>
        <div className={styles.authorDetails}>
          <div className={styles.authorName}>
            <strong>
              {review.authorUrl ? (
                <a href={review.authorUrl} target="_blank" rel="noopener noreferrer">
                  {review.author}
                </a>
              ) : (
                review.author
              )}
            </strong>
          </div>
          {review.reviewUrl ? (
            <small>
              <a
                href={review.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  review.publishedLabel
                    ? `${review.publishedLabel} – Apri la recensione di ${review.author} su Google Maps (nuova scheda)`
                    : `Apri la recensione di ${review.author} su Google Maps (nuova scheda)`
                }
              >
                {review.publishedLabel ?? 'Apri su Google Maps'}
              </a>
            </small>
          ) : (
            review.publishedLabel && <small>{review.publishedLabel}</small>
          )}
        </div>
      </footer>
    </article>
  )
}
