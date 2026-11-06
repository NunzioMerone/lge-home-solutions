import { useState } from 'react'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { Icon } from '../../components/ui/Icon'
import { Skeleton } from '../../components/ui/Skeleton'
import type { WorkPhotoProps } from '../../types/works'
import styles from './Works.module.css'

export function WorkPhoto({ photo, onOpen }: WorkPhotoProps) {
  const [settled, setSettled] = useState(false)
  return (
    <button
      className={styles.photo}
      data-photo-id={photo.id}
      data-loaded={settled}
      type="button"
      aria-label={`Ingrandisci foto: ${photo.alt}`}
      aria-haspopup="dialog"
      onClick={(event) => onOpen(photo, event.currentTarget)}
    >
      <GalleryImage
        photo={photo}
        sizes="(min-width: 1440px) 440px, (min-width: 1000px) 30vw, (min-width: 600px) 44vw, 100vw"
        onSettled={() => setSettled(true)}
      />
      {!settled && <Skeleton className={styles.imageSkeleton} />}
      <span className={styles.photoHint} aria-hidden="true">
        <Icon name="external" />
      </span>
    </button>
  )
}
