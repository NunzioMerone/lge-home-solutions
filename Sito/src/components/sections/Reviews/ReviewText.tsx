import { useId } from 'react'
import { useReviewOverflow } from '../../../hooks/useReviewOverflow'
import type { ReviewTextProps } from '../../../types/reviews'
import styles from './Reviews.module.css'

export function ReviewText({ text, expanded, onToggleExpanded }: ReviewTextProps) {
  const id = useId()
  const { textRef, canExpand } = useReviewOverflow(text)

  return (
    <div className={styles.comment}>
      <blockquote id={id} ref={textRef} data-expanded={expanded}>
        {text}
      </blockquote>
      {(canExpand || expanded) && (
        <button
          className={styles.expandButton}
          type="button"
          onClick={onToggleExpanded}
          aria-expanded={expanded}
          aria-controls={id}
        >
          {expanded ? 'Leggi di meno' : 'Leggi di più'}
        </button>
      )}
    </div>
  )
}
