import type { DecodableImage } from '../types/media'
import type { GalleryPhoto } from '../types/gallery'
import { assetUrl } from './assetUrl'

export function galleryImageUrl(photo: GalleryPhoto, width: number): string {
  const directory =
    photo.status === 'local-preview'
      ? `references/${photo.collection}/preview`
      : `img/${photo.collection ?? 'gallery-real'}`
  return assetUrl(`${directory}/${photo.id}-${width}.webp`)
}

export function lightboxImageWidth(photo: GalleryPhoto, compact: boolean): number {
  return compact ? Math.min(photo.previewWidths[1], photo.fullWidth) : photo.fullWidth
}

/** A completed request can still require an expensive decode before its first paint. */
export async function decodeGalleryImage(image: DecodableImage): Promise<boolean> {
  try {
    await image.decode()
    return image.naturalWidth > 0
  } catch {
    return false
  }
}
