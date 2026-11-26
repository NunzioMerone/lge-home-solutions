import { useState } from 'react'
import type { GalleryImageProps } from '../../../types/gallery'
import { galleryImageUrl } from '../../../utils/galleryImages'

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
  const [failed, setFailed] = useState(false)
  const source = (width: number) => galleryImageUrl(photo, width)
  if (failed) {
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
    <img
      src={source(full ? photo.fullWidth : photo.previewWidths[0])}
      srcSet={full ? undefined : widths.map((width) => `${source(width)} ${width}w`).join(', ')}
      sizes={
        full ? undefined : (sizes ?? '(min-width: 1200px) 480px, (min-width: 700px) 42vw, 74vw')
      }
      width={photo.width}
      height={photo.height}
      alt={alt ?? (full ? photo.alt : '')}
      loading={loading ?? (full ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable={false}
      onLoad={onSettled}
      onError={() => {
        setFailed(true)
        onSettled?.()
      }}
    />
  )
}
