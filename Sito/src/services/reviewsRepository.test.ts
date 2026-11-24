import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { lgeGooglePlace } from '../config/googlePlaces'

const { importLibrary, setOptions, fetchFields } = vi.hoisted(() => ({
  importLibrary: vi.fn(),
  setOptions: vi.fn(),
  fetchFields: vi.fn(),
}))

vi.mock('@googlemaps/js-api-loader', () => ({ importLibrary, setOptions }))

describe('reviewsRepository', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.resetAllMocks()
    vi.stubEnv('VITE_GOOGLE_MAPS_API_KEY', 'test-browser-key')
  })

  afterEach(() => vi.unstubAllEnvs())

  it('loads the overall Google rating separately from the displayed reviews', async () => {
    const reviewUrl = 'https://www.google.com/maps/reviews/example'
    const profileUrl = 'https://www.google.com/maps/contrib/example'
    const reviewsUrl = 'https://www.google.com/maps/place/example/reviews'
    const authorAttribution = { displayName: 'Ada Rossi', uri: profileUrl }
    const place = vi.fn(
      class {
        rating = 4.7
        userRatingCount = 23
        googleMapsLinks = { reviewsURI: reviewsUrl }
        fetchFields = fetchFields
        reviews = [
          {
            authorAttribution,
            rating: 5,
            originalText: 'Ottimo lavoro.',
            text: 'Great work.',
            googleMapsURI: reviewUrl,
            relativePublishTimeDescription: 'un mese fa',
          },
          { authorAttribution: { displayName: 'Luca Verdi' }, rating: 4 },
          { authorAttribution: null, rating: 5 },
        ]
      },
    )
    importLibrary.mockResolvedValue({ Place: place })
    fetchFields.mockResolvedValue(undefined)
    const { reviewsRepository } = await import('./reviewsRepository')

    const signal = new AbortController().signal
    const data = await reviewsRepository.load(signal)

    expect(place).toHaveBeenCalledWith(expect.objectContaining({ id: lgeGooglePlace.id }))
    expect(data).toMatchObject({
      source: 'google-places',
      average: 4.7,
      totalCount: 23,
      url: reviewsUrl,
    })
    expect(data.items).toMatchObject([
      { author: 'Ada Rossi', rating: 5, text: 'Ottimo lavoro.', authorUrl: profileUrl, reviewUrl },
      { author: 'Luca Verdi', rating: 4, text: null, publishedLabel: null },
    ])
  })

  it('shares overlapping requests and lets a new load fetch fresh data after a failure', async () => {
    importLibrary.mockResolvedValue({
      Place: class {
        fetchFields = fetchFields
      },
    })
    fetchFields.mockRejectedValueOnce(new Error('Google unavailable')).mockResolvedValue(undefined)
    const { reviewsRepository } = await import('./reviewsRepository')
    const signal = new AbortController().signal

    const first = reviewsRepository.load(signal)
    expect(reviewsRepository.load(signal)).toBe(first)
    await expect(first).rejects.toThrow('Google unavailable')
    await expect(reviewsRepository.load(signal)).resolves.toMatchObject({
      items: [],
      average: null,
      totalCount: null,
      url: lgeGooglePlace.reviewsUrl,
    })
    expect(fetchFields).toHaveBeenCalledTimes(2)
    expect(setOptions).toHaveBeenCalledTimes(1)
  })
})
