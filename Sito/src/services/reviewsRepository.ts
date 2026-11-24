import { googleMapsBrowserKey } from '../config/googlePlaces'
import type { ReviewRepository } from '../types/reviews'

let pending: ReturnType<ReviewRepository['load']> | undefined

export const reviewsRepository: ReviewRepository = {
  load(signal) {
    if (signal.aborted) return Promise.reject(signal.reason)
    if (!googleMapsBrowserKey) return Promise.reject(new Error('Google Maps key unavailable'))

    // Coalesce overlapping requests without keeping the returned reviews in a cache.
    pending ??= import('./googlePlacesReviews')
      .then(({ fetchGooglePlacesReviews }) => fetchGooglePlacesReviews())
      .finally(() => {
        pending = undefined
      })
    return pending
  },
}
