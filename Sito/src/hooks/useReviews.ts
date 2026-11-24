import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { googleMapsBrowserKey } from '../config/googlePlaces'
import { googleReviewSnapshot } from '../data/reviews'
import { reviewsRepository } from '../services/reviewsRepository'
import type { ReviewsState } from '../types/reviews'

export function useReviews(
  sectionRef: RefObject<HTMLElement | null>,
  useGooglePlaces: boolean,
): ReviewsState {
  const loadLiveReviews = useGooglePlaces && Boolean(googleMapsBrowserKey)
  const [state, setState] = useState<ReviewsState>(
    loadLiveReviews ? { status: 'loading' } : { status: 'ready', data: googleReviewSnapshot },
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!loadLiveReviews || !section) return

    const controller = new AbortController()
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        void reviewsRepository
          .load(controller.signal)
          .then((data) => {
            if (!controller.signal.aborted) setState({ status: 'ready', data })
          })
          .catch(() => {
            if (!controller.signal.aborted) setState({ status: 'error' })
          })
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      controller.abort()
    }
  }, [loadLiveReviews, sectionRef])

  return state
}
