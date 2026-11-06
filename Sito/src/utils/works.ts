import { worksPage } from '../config/works'
import type { GalleryPhoto } from '../types/gallery'
import type {
  WorkCategory,
  WorkCollection,
  WorkColumnCount,
  WorkFilter,
  WorkPhotoColumn,
} from '../types/works'

export function orderWorkPhotos(photos: readonly GalleryPhoto[], category: WorkCategory) {
  const matching = photos.filter((photo) => photo.category === category.galleryCategory)
  const featuredOrder = new Map(category.featuredIds.map((id, index) => [id, index]))
  return matching.sort(
    (left, right) =>
      (featuredOrder.get(left.id) ?? category.featuredIds.length) -
      (featuredOrder.get(right.id) ?? category.featuredIds.length),
  )
}

export function parseWorkFilter(
  value: string | null,
  categories: readonly WorkCategory[],
): WorkFilter {
  return categories.find((category) => category.id === value)?.id ?? 'tutti'
}

export function getWorkCategoryPath(filter: WorkFilter) {
  return filter === 'tutti' ? worksPage.path : `${worksPage.path}?categoria=${filter}`
}

export function interleaveWorkPhotos(collections: readonly WorkCollection[]) {
  const photos: GalleryPhoto[] = []
  const count = Math.max(0, ...collections.map((collection) => collection.photos.length))
  for (let index = 0; index < count; index++) {
    for (const collection of collections) {
      const photo = collection.photos[index]
      if (photo) photos.push(photo)
    }
  }
  return photos
}

export function distributeWorkPhotos(photos: readonly GalleryPhoto[], columns: WorkColumnCount) {
  const result: WorkPhotoColumn[] = Array.from({ length: columns }, () => ({
    photos: [],
    relativeHeight: 0,
  }))
  const [first, ...remaining] = result
  if (!first) return []
  for (const photo of photos) {
    const column = remaining.reduce(
      (shortest, item) => (item.relativeHeight < shortest.relativeHeight ? item : shortest),
      first,
    )
    column.photos.push(photo)
    column.relativeHeight += photo.height / photo.width
  }
  return result.map((column) => column.photos)
}
