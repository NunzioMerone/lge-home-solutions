import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { gibusCatalogGroups, gibusCatalogsId, gibusCatalogUrl } from '../../data/atelierGibus'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { GibusCatalogGroupId } from '../../types/atelierGibus'
import styles from './AtelierGibus.module.css'

export function GibusCatalogs() {
  const section = useSectionReveal()
  const compact = useMediaQuery('(max-width: 899px)')
  const [openGroups, setOpenGroups] = useState<ReadonlySet<GibusCatalogGroupId>>(
    () => new Set(['pergole']),
  )
  const toggleGroup = (id: GibusCatalogGroupId) => {
    setOpenGroups((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section
      id={gibusCatalogsId}
      className={`section ${styles.catalogs}`}
      aria-labelledby="gibus-catalogs-title"
      tabIndex={-1}
      ref={section}
    >
      <div className={`container ${styles.catalogLayout}`}>
        <header data-reveal>
          <h2 id="gibus-catalogs-title">
            Cataloghi <em>Gibus.</em>
          </h2>
          <p className={styles.body}>
            Modelli, finiture e configurazioni. Apri il catalogo della soluzione che ti interessa.
          </p>
          <a
            className={styles.inlineLink}
            data-analytics-catalog
            href={gibusCatalogUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tutti i cataloghi Gibus <Icon name="external" />
            <span className="sr-only"> (nuova scheda)</span>
          </a>
        </header>
        <div className={styles.catalogGroups} data-reveal>
          {gibusCatalogGroups.map((group) => {
            const expanded = !compact || openGroups.has(group.id)
            const panelId = `gibus-catalogs-${group.id}`
            return (
              <div className={styles.catalogGroup} key={group.id}>
                <h3>
                  {compact ? (
                    <button
                      type="button"
                      className={styles.catalogToggle}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggleGroup(group.id)}
                    >
                      {group.title}
                      <Icon name="chevron-right" />
                    </button>
                  ) : (
                    group.title
                  )}
                </h3>
                <ul id={panelId} className={styles.catalogList} role="list" hidden={!expanded}>
                  {group.solutions.map((solution) => (
                    <li key={solution.id}>
                      <a
                        data-analytics-catalog
                        href={solution.catalogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{solution.title}</span>
                        <small>PDF</small>
                        <Icon name="external" />
                        <span className="sr-only"> (nuova scheda)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
