import { useState } from 'react'
import { gulfAwningPhoto } from '../../data/gallery'
import { galleryImageUrl } from '../../utils/galleryImages'
import { Skeleton } from '../../components/ui/Skeleton'
import { SettledImage } from '../../components/ui/SettledImage'
import styles from './WorksHero.module.css'

const photoSources = [...gulfAwningPhoto.previewWidths, 1120, gulfAwningPhoto.fullWidth]
  .map((width) => `${galleryImageUrl(gulfAwningPhoto, width)} ${width}w`)
  .join(', ')

export function WorksHero() {
  const [settled, setSettled] = useState(false)
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1>
            Realizzazioni <em>LGE</em>
          </h1>
          <p>
            Una selezione di progetti realizzati per portare design, comfort e qualità nelle case
            dei nostri clienti.
          </p>
        </div>
      </div>
      <div className={styles.media} data-settled={settled}>
        {!settled && <Skeleton className={styles.placeholder} />}
        <SettledImage
          src={galleryImageUrl(gulfAwningPhoto, gulfAwningPhoto.previewWidths[1])}
          srcSet={photoSources}
          sizes="(min-width: 700px) 68vw, 100vw"
          width={gulfAwningPhoto.width}
          height={gulfAwningPhoto.height}
          alt={gulfAwningPhoto.alt}
          decoding="async"
          fetchPriority="high"
          onSettled={() => setSettled(true)}
        />
      </div>
    </header>
  )
}
