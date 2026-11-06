import { useState } from 'react'
import type { GalleryLightboxSlideProps } from '../../../types/gallery'
import { Icon } from '../../ui/Icon'
import { Skeleton } from '../../ui/Skeleton'
import { GalleryImage } from './GalleryImage'
import dialogStyles from '../../ui/MediaDialog.module.css'
import styles from './GalleryLightbox.module.css'

export function GalleryLightboxSlide({
  photo,
  active,
  navigable,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxSlideProps) {
  const [settled, setSettled] = useState(false)
  return (
    <div className={styles.slideContent} data-lightbox-content data-navigable={navigable}>
      <div className={`${dialogStyles.media} ${styles.photo}`}>
        <GalleryImage
          photo={photo}
          full
          fetchPriority={active ? 'high' : 'low'}
          onSettled={() => setSettled(true)}
        />
        {!settled && <Skeleton className={styles.loading} />}
      </div>
      <button
        className={dialogStyles.close}
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
            onClick={onPrevious}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            className={`${styles.navigation} ${styles.next}`}
            data-lightbox-control="next"
            aria-label="Fotografia successiva"
            onClick={onNext}
          >
            <Icon name="chevron-right" />
          </button>
        </>
      )}
    </div>
  )
}
