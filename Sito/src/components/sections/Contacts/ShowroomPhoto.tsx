import { useState } from 'react'
import { assetUrl } from '../../../utils/assetUrl'
import { Skeleton } from '../../ui/Skeleton'
import styles from './Contacts.module.css'

export function ShowroomPhoto() {
  const [settled, setSettled] = useState(false)
  return (
    <figure className={styles.photo} data-reveal>
      {!settled && <Skeleton className={styles.photoSkeleton} />}
      <img
        src={assetUrl('img/showroom/showroom-placeholder-960.webp')}
        srcSet={`${assetUrl('img/showroom/showroom-placeholder-640.webp')} 640w, ${assetUrl('img/showroom/showroom-placeholder-960.webp')} 960w, ${assetUrl('img/showroom/showroom-placeholder-1672.webp')} 1672w`}
        sizes="(min-width: 1200px) 47vw, (min-width: 800px) 760px, 92vw"
        width="1672"
        height="941"
        alt="Qui ci sarà una foto del vostro showroom"
        loading="lazy"
        decoding="async"
        onLoad={() => setSettled(true)}
        onError={() => setSettled(true)}
      />
    </figure>
  )
}
