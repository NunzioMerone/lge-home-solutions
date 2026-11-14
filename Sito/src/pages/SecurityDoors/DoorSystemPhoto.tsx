import { useEffect, useRef, useState } from 'react'
import { Skeleton } from '../../components/ui/Skeleton'
import { assetUrl } from '../../utils/assetUrl'
import { decodeGalleryImage } from '../../utils/galleryImages'
import type { SecurityDoorPhotoProps, SecurityDoorPhotoStatus } from '../../types/securityDoors'
import styles from './SecurityDoors.module.css'

export function DoorSystemPhoto({ system }: SecurityDoorPhotoProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [status, setStatus] = useState<SecurityDoorPhotoStatus>('loading')
  const path = `img/tehni/${system.id}`

  useEffect(() => {
    const image = imageRef.current
    if (!image) return
    let active = true
    void decodeGalleryImage(image).then((ready) => {
      if (active) setStatus(ready ? 'ready' : 'failed')
    })
    return () => {
      active = false
    }
  }, [system.id])

  return (
    <figure className={styles.systemPhoto} aria-busy={status === 'loading'}>
      {status === 'loading' && <Skeleton className={styles.systemPhotoSkeleton} />}
      <img
        ref={imageRef}
        src={assetUrl(`${path}-800.webp`)}
        srcSet={`${assetUrl(`${path}-480.webp`)} 480w, ${assetUrl(`${path}-800.webp`)} 800w`}
        sizes="(min-width: 1480px) 800px, (min-width: 800px) 53vw, 91vw"
        width="800"
        height="545"
        alt={status === 'failed' ? '' : system.photoAlt}
        data-ready={status === 'ready'}
        loading="lazy"
        decoding="async"
      />
      {status === 'failed' && (
        <span className={styles.systemPhotoFallback}>Foto temporaneamente non disponibile</span>
      )}
      <figcaption>Foto TEHNi</figcaption>
    </figure>
  )
}
