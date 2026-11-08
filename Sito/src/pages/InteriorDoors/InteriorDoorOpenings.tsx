import { useState } from 'react'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { GalleryLightbox } from '../../components/sections/Gallery/GalleryLightbox'
import { Icon } from '../../components/ui/Icon'
import { interiorDoorOpenings } from '../../data/interiorDoors'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { GalleryLightboxState } from '../../types/gallery'
import styles from './InteriorDoors.module.css'

const catalogPhotos = interiorDoorOpenings.map(({ photo }) => photo)

export function InteriorDoorOpenings() {
  const section = useSectionReveal()
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)
  const [opening, setOpening] = useState<(typeof interiorDoorOpenings)[number]>(
    interiorDoorOpenings[0],
  )
  const { photo } = opening

  return (
    <section className="section" aria-labelledby="interior-openings-title" ref={section}>
      <div className="container">
        <header className={styles.openingsHeader} data-reveal>
          <p className="eyebrow">APERTURE E INGOMBRI</p>
          <h2 id="interior-openings-title">
            Come si apre <em>il tuo spazio?</em>
          </h2>
          <p className={styles.body}>
            Confronta le tre aperture e guarda come si inseriscono negli ambienti.
          </p>
        </header>

        <div className={styles.openingInteractive} data-reveal>
          <div className={styles.openingControls} role="group" aria-label="Tipi di apertura">
            {interiorDoorOpenings.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={opening.id === option.id}
                aria-controls="interior-opening-detail"
                onClick={() => setOpening(option)}
              >
                {option.title}
              </button>
            ))}
          </div>

          <div className={styles.openingPanel} id="interior-opening-detail">
            <figure className={styles.openingPhoto}>
              <button
                type="button"
                aria-label={`Ingrandisci foto: ${photo.alt}`}
                aria-haspopup="dialog"
                onClick={(event) => setLightbox({ photo, trigger: event.currentTarget })}
              >
                <GalleryImage
                  key={photo.id}
                  photo={photo}
                  sizes="(min-width: 1186px) 594px, (min-width: 740px) 50vw, 91vw"
                />
              </button>
              <figcaption>Foto di catalogo I-PEA</figcaption>
            </figure>
            <div className={styles.openingDetail}>
              <div aria-live="polite">
                <h3>{opening.headline}</h3>
                <p className={styles.body}>{opening.detail}</p>
              </div>
              <p className={styles.openingModel}>I-PEA · {opening.model}</p>
              <a
                className={styles.inlineLink}
                href={opening.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vedi la foto nel catalogo <Icon name="external" />
                <span className="sr-only"> ({opening.model}, nuova scheda)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {lightbox && (
        <GalleryLightbox {...lightbox} photos={catalogPhotos} onClose={() => setLightbox(null)} />
      )}
    </section>
  )
}
