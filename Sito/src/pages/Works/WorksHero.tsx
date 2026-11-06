import { useState } from 'react'
import { assetUrl } from '../../utils/assetUrl'
import { Skeleton } from '../../components/ui/Skeleton'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import styles from './Works.module.css'

export function WorksHero() {
  const [settled, setSettled] = useState(false)
  const ref = useSectionReveal({ duration: 1.3, stagger: 0.12 })
  return (
    <header className={styles.hero} ref={ref}>
      <div className={styles.heroBackdrop} aria-hidden="true" data-reveal>
        {!settled && <Skeleton className={styles.heroSkeleton} />}
        <img
          src={assetUrl('img/hero-scene/desktop-1280.webp')}
          srcSet={`${assetUrl('img/hero-scene/desktop-960.webp')} 960w, ${assetUrl('img/hero-scene/desktop-1280.webp')} 1280w, ${assetUrl('img/hero-scene/desktop-1672.webp')} 1672w`}
          sizes="100vw"
          width="1672"
          height="941"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setSettled(true)}
          onError={() => setSettled(true)}
        />
      </div>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <h1 data-reveal>
            I nostri <em>lavori</em>
          </h1>
          <p className={styles.heroDescription} data-reveal>
            Una selezione di progetti realizzati per portare design, comfort e qualità nelle case
            dei nostri clienti.
          </p>
        </div>
      </div>
    </header>
  )
}
