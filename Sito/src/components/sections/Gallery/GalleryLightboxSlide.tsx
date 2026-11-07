import { memo } from 'react'
import type { GalleryLightboxSlideProps } from '../../../types/gallery'
import { Icon } from '../../ui/Icon'
import { lightboxImageWidth } from '../../../utils/galleryImages'
import { GalleryLightboxPhoto } from './GalleryLightboxPhoto'
import dialogStyles from '../../ui/MediaDialog.module.css'
import styles from './GalleryLightbox.module.css'

export const GalleryLightboxSlide = memo(function GalleryLightboxSlide({
  photo,
  active,
  navigable,
  compact,
  navigationReady = true,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxSlideProps) {
  const detailWidth = lightboxImageWidth(photo, compact)
  return (
    <div className={styles.slideContent} data-lightbox-content data-navigable={navigable}>
      <GalleryLightboxPhoto
        key={detailWidth}
        photo={photo}
        detailWidth={detailWidth}
        active={active}
      />
      <button
        className={`${dialogStyles.close} ${styles.close}`}
        type="button"
        data-lightbox-control="close"
        aria-label="Chiudi fotografia"
        onClick={onClose}
      >
        <Icon name="close" />
      </button>
      {navigable && (
        <>
          <button
            type="button"
            className={`${styles.navigation} ${styles.previous}`}
            data-lightbox-control="previous"
            aria-label="Fotografia precedente"
            disabled={!navigationReady}
            onClick={onPrevious}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            className={`${styles.navigation} ${styles.next}`}
            data-lightbox-control="next"
            aria-label="Fotografia successiva"
            disabled={!navigationReady}
            onClick={onNext}
          >
            <Icon name="chevron-right" />
          </button>
        </>
      )}
    </div>
  )
})
