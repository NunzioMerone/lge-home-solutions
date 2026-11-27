import { useState } from 'react'
import type { GalleryImageProps } from '../../../types/gallery'
import { galleryImageUrl } from '../../../utils/galleryImages'
import { SettledImage } from '../../ui/SettledImage'

export function GalleryImage({
  photo,
  alt,
  full = false,
  includeFullWidth = false,
  sizes,
  loading,
  fetchPriority,
  onSettled,
}: GalleryImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const source = (width: number) => galleryImageUrl(photo, width)
  const src = source(full ? photo.fullWidth : photo.previewWidths[0])
  if (failedSource === src) {
    return (
      <span role="img" aria-label={photo.alt}>
        Immagine temporaneamente non disponibile
      </span>
    )
  }
  const widths =
    includeFullWidth && !photo.previewWidths.includes(photo.fullWidth)
      ? [...photo.previewWidths, photo.fullWidth]
      : photo.previewWidths
  return (
    <SettledImage
      src={src}
      srcSet={full ? undefined : widths.map((width) => `${source(width)} ${width}w`).join(', ')}
      sizes={
        full ? undefined : (sizes ?? '(min-width: 1200px) 480px, (min-width: 700px) 42vw, 74vw')
      }
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={loading ?? (full ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable={false}
      onSettled={(ready) => {
        setFailedSource(ready ? null : src)
        onSettled?.()
      }}
    />
  )
}
