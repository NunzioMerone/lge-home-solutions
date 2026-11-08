import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { securityDoorSystems } from '../../data/securityDoors'
import { assetUrl } from '../../utils/assetUrl'
import styles from './SecurityDoors.module.css'

export function DoorDesignStudio() {
  const [system, setSystem] = useState<(typeof securityDoorSystems)[number]>(securityDoorSystems[0])
  const imagePath = `img/tehni/${system.id}`

  return (
    <div className={styles.studio} data-reveal>
      <div className={styles.systemControls} role="group" aria-label="Scegli la famiglia di porte">
        {securityDoorSystems.map((option, index) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={system.id === option.id}
            aria-controls="tehni-selected-system"
            onClick={() => setSystem(option)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {option.name}
          </button>
        ))}
      </div>

      <div id="tehni-selected-system" className={styles.systemPanel}>
        <figure className={styles.systemPhoto}>
          <img
            key={system.id}
            src={assetUrl(`${imagePath}-800.webp`)}
            srcSet={`${assetUrl(`${imagePath}-480.webp`)} 480w, ${assetUrl(`${imagePath}-800.webp`)} 800w`}
            sizes="(min-width: 1480px) 800px, (min-width: 800px) 53vw, 91vw"
            width="800"
            height="545"
            alt={system.photoAlt}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Foto TEHNi</figcaption>
        </figure>

        <div className={styles.systemCopy}>
          <div aria-live="polite" aria-atomic="true">
            <p className="eyebrow">{system.eyebrow}</p>
            <h3>{system.headline}</h3>
            <p className={styles.systemDescription}>{system.description}</p>
          </div>
          <a
            className={styles.lightButton}
            href={system.configurator}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apri il configuratore <Icon name="external" />
            <span className="sr-only"> {system.name} (nuova scheda)</span>
          </a>
          <p className={styles.studioNote}>
            Strumento ufficiale TEHNi · Si apre in una nuova scheda
          </p>
        </div>
      </div>
    </div>
  )
}
