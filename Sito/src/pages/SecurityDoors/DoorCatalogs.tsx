import { Icon } from '../../components/ui/Icon'
import { securityDoorMaterials } from '../../data/securityDoors'
import { assetUrl } from '../../utils/assetUrl'
import styles from './SecurityDoors.module.css'

export function DoorCatalogs() {
  return (
    <div data-reveal>
      <h3 className={styles.catalogHeading}>
        Cataloghi da <em>sfogliare</em>
      </h3>
      <div className={styles.catalogGroups}>
        {securityDoorMaterials.map((material) => (
          <div className={styles.catalogGroup} key={material.id}>
            <h4>{material.label}</h4>
            <ul className={styles.catalogList} role="list">
              {material.systems.map((system) => (
                <li key={system.id}>
                  <a
                    className={styles.catalog}
                    data-analytics-catalog
                    href={system.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Apri il catalogo ${system.name} (${material.catalogFormat}, nuova scheda)`}
                  >
                    <img
                      className={styles.catalogPhoto}
                      src={assetUrl(`img/${material.photoDirectory}/${system.id}-480.webp`)}
                      data-system={system.id}
                      alt=""
                      width="80"
                      height="80"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className={styles.catalogName}>{system.name}</p>
                      <p className={styles.body}>{system.catalogDescription}</p>
                    </div>
                    <span className={styles.catalogFormat}>
                      {material.catalogFormat} <Icon name="external" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              className={styles.inlineLink}
              data-analytics-catalog
              href={material.catalogIndex}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tutti i cataloghi {material.brand} <Icon name="external" />
              <span className="sr-only"> (nuova scheda)</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
