import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { ProductOptionDetails } from '../../components/ui/ProductOptionDetails'
import options from '../../components/ui/ProductOptionDetails.module.css'
import { securityDoorMaterials } from '../../data/securityDoors'
import type { SecurityDoorSystem } from '../../types/securityDoors'
import { DoorSystemPhoto } from './DoorSystemPhoto'
import styles from './SecurityDoors.module.css'

const doorOptions = securityDoorMaterials.flatMap((material) =>
  material.systems.map((system) => ({ material, system })),
)

export function DoorDesignStudio() {
  const [system, setSystem] = useState<SecurityDoorSystem>(securityDoorMaterials[0].systems[0])
  const material =
    securityDoorMaterials.find((option) => option.systems.includes(system)) ??
    securityDoorMaterials[0]

  return (
    <div className={styles.studio} data-reveal>
      <div
        className={`${styles.materialControls} ${options.controls}`}
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
        className={`${styles.systemControls} ${options.controls}`}
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
          {doorOptions.map(({ material: family, system: option }) => (
            <ProductOptionDetails
              key={option.id}
              label={`${family.label} · ${family.brand} ${option.name}`}
              active={option.id === system.id}
            >
              <div aria-live="polite" aria-atomic="true">
                <p className="eyebrow">{option.eyebrow}</p>
                <h3>{option.headline}</h3>
                <p className={styles.systemDescription}>{option.description}</p>
              </div>
              {option.configurator && (
                <a
                  className={styles.lightButton}
                  href={option.configurator}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apri il configuratore <Icon name="external" />
                  <span className="sr-only"> {option.name} (nuova scheda)</span>
                </a>
              )}
              <a
                className={styles.panelCatalogLink}
                data-analytics-catalog
                href={option.catalog}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sfoglia il catalogo <Icon name="external" />
                <span className="sr-only">
                  {' '}
                  {option.name} ({family.catalogFormat}, nuova scheda)
                </span>
              </a>
              {option.configurator && (
                <p className={styles.studioNote}>
                  Strumento ufficiale {family.brand} · Si apre in una nuova scheda
                </p>
              )}
            </ProductOptionDetails>
          ))}
        </div>
      </div>
    </div>
  )
}
