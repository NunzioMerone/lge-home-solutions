import { importLibrary, setOptions } from '@googlemaps/js-api-loader'
import { googleMapsBrowserKey, lgeGooglePlace } from '../config/googlePlaces'
import type { GoogleReview, ReviewDataset } from '../types/reviews'

setOptions({
  key: googleMapsBrowserKey,
  language: 'it',
  region: 'IT',
  authReferrerPolicy: 'origin',
})

function getHttpsUrl(value: string | null | undefined) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}

function toGoogleReview(review: google.maps.places.Review, index: number) {
  const { authorAttribution, rating } = review
  const author = authorAttribution?.displayName.trim()
  if (!author || (rating !== 1 && rating !== 2 && rating !== 3 && rating !== 4 && rating !== 5)) {
    return []
  }

  const reviewUrl = getHttpsUrl(review.googleMapsURI)
  return [
    {
      id: reviewUrl ?? `review-${index}`,
      author,
      initials: Array.from(author)[0]?.toLocaleUpperCase('it-IT') ?? '',
      avatarTone: 'teal',
      rating,
      text: review.originalText?.trim() || review.text?.trim() || null,
      publishedLabel: review.relativePublishTimeDescription?.trim() || null,
      authorUrl: getHttpsUrl(authorAttribution?.uri),
      authorPhotoUrl: getHttpsUrl(authorAttribution?.photoURI),
      reviewUrl,
    } satisfies GoogleReview,
  ]
}

export async function fetchGooglePlacesReviews(): Promise<ReviewDataset> {
  const { Place } = await importLibrary('places')
  const place = new Place({ id: lgeGooglePlace.id, requestedLanguage: 'it', requestedRegion: 'it' })
  await place.fetchFields({
    fields: ['reviews', 'rating', 'userRatingCount', 'googleMapsLinks', 'attributions'],
  })

  return {
    source: 'google-places',
    items: (place.reviews ?? []).flatMap(toGoogleReview),
    average: place.rating ?? null,
    totalCount: place.userRatingCount ?? null,
    url: getHttpsUrl(place.googleMapsLinks?.reviewsURI) ?? lgeGooglePlace.reviewsUrl,
    attributions: (place.attributions ?? []).flatMap(({ provider, providerURI }) =>
      provider ? [{ provider, url: getHttpsUrl(providerURI) }] : [],
    ),
  }
}
