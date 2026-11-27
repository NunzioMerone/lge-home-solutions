import type { DecodableImage } from '../types/media'
import type { GalleryPhoto } from '../types/gallery'
import { assetUrl } from './assetUrl'

export function galleryImageBasePath(photo: GalleryPhoto): string {
  return `img/${photo.collection ?? 'gallery-real'}/${photo.id}`
}

export function galleryImagePath(photo: GalleryPhoto, width: number): string {
  return `${galleryImageBasePath(photo)}-${width}.webp`
}

export function galleryImageUrl(photo: GalleryPhoto, width: number): string {
  return assetUrl(galleryImagePath(photo, width))
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
