import { memo, startTransition, useCallback, useState } from 'react'
import type { GalleryImageLoadState, GalleryLightboxPhotoProps } from '../../../types/gallery'
import { decodeGalleryImage, galleryImageUrl } from '../../../utils/galleryImages'
import { Skeleton } from '../../ui/Skeleton'
import dialogStyles from '../../ui/MediaDialog.module.css'
import styles from './GalleryLightbox.module.css'

export const GalleryLightboxPhoto = memo(function GalleryLightboxPhoto({
  photo,
  detailWidth,
  active,
}: GalleryLightboxPhotoProps) {
  const [preview, setPreview] = useState<GalleryImageLoadState>('loading')
  const [detail, setDetail] = useState<GalleryImageLoadState>('loading')
  const setFrame = useCallback(
    (frame: HTMLDivElement | null) => {
      // Reserve the exact photo geometry before either image has downloaded.
      frame?.style.setProperty('--photo-ratio', String(photo.width / photo.height))
    },
    [photo.width, photo.height],
  )
  const failed = preview === 'failed' && detail === 'failed'
  const loading = !failed && preview !== 'ready' && detail !== 'ready'

  return (
    <div
      ref={setFrame}
      className={`${dialogStyles.media} ${styles.photo}`}
      role="img"
      aria-label={photo.alt}
      aria-busy={loading}
      data-photo-id={photo.id}
      data-preview-ready={preview === 'ready'}
      data-detail-ready={detail === 'ready'}
    >
      <img
        className={styles.previewImage}
        src={galleryImageUrl(photo, photo.previewWidths[0])}
        width={photo.width}
        height={photo.height}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority={active ? 'high' : 'auto'}
        draggable={false}
        onLoad={(event) => {
          event.stopPropagation()
          const image = event.currentTarget
          void decodeGalleryImage(image).then((ready) => {
            if (image.isConnected) setPreview(ready ? 'ready' : 'failed')
          })
        }}
        onError={() => setPreview('failed')}
      />
      <img
        className={styles.detailImage}
        src={galleryImageUrl(photo, detailWidth)}
        width={photo.width}
        height={photo.height}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority={active ? 'high' : 'low'}
        draggable={false}
        onLoad={(event) => {
          event.stopPropagation()
          const image = event.currentTarget
          void decodeGalleryImage(image).then((ready) => {
            if (image.isConnected) {
              startTransition(() => setDetail(ready ? 'ready' : 'failed'))
            }
          })
        }}
        onError={() => setDetail('failed')}
      />
      {loading && <Skeleton className={styles.loading} />}
      {failed && <span className={styles.imageError}>Fotografia non disponibile.</span>}
    </div>
  )
})
