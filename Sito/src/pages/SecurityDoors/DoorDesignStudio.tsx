import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { securityDoorSystems } from '../../data/securityDoors'
import { DoorSystemPhoto } from './DoorSystemPhoto'
import styles from './SecurityDoors.module.css'

export function DoorDesignStudio() {
  const [system, setSystem] = useState<(typeof securityDoorSystems)[number]>(securityDoorSystems[0])

  return (
    <div className={styles.studio} data-reveal>
      <div className={styles.systemControls} role="group" aria-label="Scegli la famiglia di porte">
        {securityDoorSystems.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={system.id === option.id}
            aria-controls="tehni-selected-system"
            onClick={() => setSystem(option)}
          >
            {option.name}
          </button>
        ))}
      </div>

      <div id="tehni-selected-system" className={styles.systemPanel}>
        <DoorSystemPhoto key={system.id} system={system} />

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
          <a
            className={styles.panelCatalogLink}
            href={system.catalog}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Sfoglia il catalogo ${system.name} (PDF, nuova scheda)`}
          >
            Sfoglia il catalogo <Icon name="external" />
          </a>
          <p className={styles.studioNote}>
            Strumento ufficiale TEHNi · Si apre in una nuova scheda
          </p>
        </div>
      </div>
    </div>
  )
}
