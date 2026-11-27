import { useState } from 'react'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { Icon } from '../../components/ui/Icon'
import { Skeleton } from '../../components/ui/Skeleton'
import type { WorkPhotoProps } from '../../types/works'
import { galleryImageUrl } from '../../utils/galleryImages'
import styles from './Works.module.css'

export function WorkPhoto({ photo, interactive, onOpen }: WorkPhotoProps) {
  const [settled, setSettled] = useState(false)
  return (
    <a
      className={styles.photo}
      data-photo-id={photo.id}
      data-loaded={settled}
      href={galleryImageUrl(photo, photo.fullWidth)}
      aria-label={`Ingrandisci foto: ${photo.alt}`}
      aria-haspopup={interactive ? 'dialog' : undefined}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
          return
        event.preventDefault()
        onOpen(photo, event.currentTarget)
      }}
      onKeyDown={(event) => {
        if (event.key !== ' ' || event.repeat) return
        event.preventDefault()
        onOpen(photo, event.currentTarget)
      }}
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
    </a>
  )
}
