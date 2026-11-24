import type { ReactNode } from 'react'

export interface GoogleReview {
  id: string
  author: string
  initials: string
  avatarTone: 'teal' | 'blue' | 'plum' | 'olive' | 'ochre'
  rating: 1 | 2 | 3 | 4 | 5
  text: string | null
  publishedLabel: string | null
  authorUrl?: string | undefined
  authorPhotoUrl?: string | undefined
  reviewUrl?: string | undefined
}

export interface ReviewAttribution {
  provider: string
  url: string | undefined
}

export interface ReviewDataset {
  items: readonly GoogleReview[]
  source: 'google-manual' | 'google-places'
  average: number | null
  totalCount: number | null
  checkedAt?: string
  attributions?: readonly ReviewAttribution[]
  url: string
}

export interface ReviewRepository {
  load: (signal: AbortSignal) => Promise<ReviewDataset>
}

export type ReviewsState =
  { status: 'loading' } | { status: 'ready'; data: ReviewDataset } | { status: 'error' }

export interface RatingStarsProps {
  rating: number
}

export interface ReviewCardProps {
  review: GoogleReview
  active?: boolean
  expanded: boolean
  onToggleExpanded: () => void
}

export interface ReviewsCarouselProps {
  reviews: readonly GoogleReview[]
}

export interface ElfsightReviewsProps {
  widgetId: string
  children: ReactNode
}

export interface ReviewPaginationProps extends ReviewsCarouselProps {
  selected: number
  onSelect: (index: number) => void
}

export interface ReviewTextProps {
  text: string
  expanded: boolean
  onToggleExpanded: () => void
}
