import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { securityDoorMaterials } from '../../data/securityDoors'
import type { SecurityDoorSystem } from '../../types/securityDoors'
import { DoorSystemPhoto } from './DoorSystemPhoto'
import styles from './SecurityDoors.module.css'

export function DoorDesignStudio() {
  const [system, setSystem] = useState<SecurityDoorSystem>(securityDoorMaterials[0].systems[0])
  const material =
    securityDoorMaterials.find((option) => option.systems.includes(system)) ??
    securityDoorMaterials[0]

  return (
    <div className={styles.studio} data-reveal>
      <div
        className={styles.materialControls}
        role="group"
        aria-label="Scegli il materiale della porta"
      >
        {securityDoorMaterials.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={material.id === option.id}
            aria-controls="door-system-controls door-selected-system"
            onClick={() => setSystem(option.id === material.id ? system : option.systems[0])}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div
        id="door-system-controls"
        className={styles.systemControls}
        role="group"
        aria-label="Scegli la famiglia di porte"
      >
        {material.systems.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={system.id === option.id}
            aria-controls="door-selected-system"
            onClick={() => setSystem(option)}
          >
            {option.name}
          </button>
        ))}
      </div>

      <div id="door-selected-system" className={styles.systemPanel}>
        <DoorSystemPhoto key={system.id} system={system} material={material} />

        <div className={styles.systemCopy}>
          <div aria-live="polite" aria-atomic="true">
            <p className="eyebrow">{system.eyebrow}</p>
            <h3>{system.headline}</h3>
            <p className={styles.systemDescription}>{system.description}</p>
          </div>
          {system.configurator && (
            <a
              className={styles.lightButton}
              href={system.configurator}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apri il configuratore <Icon name="external" />
              <span className="sr-only"> {system.name} (nuova scheda)</span>
            </a>
          )}
          <a
            className={styles.panelCatalogLink}
            data-analytics-catalog
            href={system.catalog}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Sfoglia il catalogo ${system.name} (${material.catalogFormat}, nuova scheda)`}
          >
            Sfoglia il catalogo <Icon name="external" />
          </a>
          {system.configurator && (
            <p className={styles.studioNote}>
              Strumento ufficiale {material.brand} · Si apre in una nuova scheda
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
