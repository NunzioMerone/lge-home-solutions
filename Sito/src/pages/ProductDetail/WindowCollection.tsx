import { useId, useRef, useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { windowCollection, windowMaterials, windowOpenings } from '../../data/infissi'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { WindowOpening } from '../../types/infissi'
import { assetUrl } from '../../utils/assetUrl'
import styles from './ProductDetail.module.css'

export function WindowCollection() {
  const section = useSectionReveal()
  const id = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState(0)
  const [opening, setOpening] = useState<WindowOpening>('battente')
  const material = windowMaterials[selectedMaterial] ?? windowMaterials[0]
  const active = material.models[opening]
  const imagePath = `img/infissi/${active.id}`

  return (
    <section
      className={`section ${styles.collection}`}
      id={windowCollection.id}
      aria-labelledby="window-collection-title"
      tabIndex={-1}
      ref={section}
    >
      <div className="container">
        <header className={styles.collectionHeader} data-reveal>
          <h2 id="window-collection-title">
            La luce prende <em>forma.</em>
          </h2>
          <p>
            Scegli il materiale, poi confronta battente e scorrevole per capire quale apertura si
            adatta meglio alla tua casa.
          </p>
        </header>

        <div data-reveal>
          <p className={styles.choiceLabel} id={`${id}-materials`}>
            Materiale
          </p>
          <div className={styles.materialTabs} role="tablist" aria-labelledby={`${id}-materials`}>
            {windowMaterials.map((option, index) => (
              <button
                key={option.id}
                ref={(element) => {
                  buttons.current[index] = element
                }}
                type="button"
                role="tab"
                data-material={option.id}
                id={`${id}-${option.id}`}
                aria-controls={`${id}-material`}
                aria-selected={option.id === material.id}
                tabIndex={option.id === material.id ? 0 : -1}
                onClick={() => setSelectedMaterial(index)}
                onKeyDown={(event) => {
                  let next: number
                  if (event.key === 'ArrowRight') next = (index + 1) % windowMaterials.length
                  else if (event.key === 'ArrowLeft')
                    next = (index + windowMaterials.length - 1) % windowMaterials.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = windowMaterials.length - 1
                  else return
                  event.preventDefault()
                  setSelectedMaterial(next)
                  buttons.current[next]?.focus()
                }}
              >
                <span className={styles.materialSample} aria-hidden="true" />
                <span>{option.name}</span>
                <span className={styles.selectedMark} aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                    <path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
          <div
            className={styles.collectionCard}
            id={`${id}-material`}
            role="tabpanel"
            aria-labelledby={`${id}-${material.id}`}
          >
            <div className={styles.materialBar}>
              <h3>{material.headline}</h3>
              <div className={styles.openingChoice} role="group" aria-labelledby={`${id}-opening`}>
                <span className={styles.choiceLabel} id={`${id}-opening`}>
                  Tipo di apertura
                </span>
                <div className={styles.openings}>
                  {windowOpenings.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={option.id === opening}
                      aria-controls={`${id}-model`}
                      onClick={() => setOpening(option.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {option.id === 'battente' ? (
                          <path d="M4 5h16v14h-6M4 5l10-2v18L4 19V5Zm7 6v2" />
                        ) : (
                          <path d="M2.5 5h19v14h-19zM12 5v14m3-7h3.5m-1.5-1.5 1.5 1.5-1.5 1.5" />
                        )}
                      </svg>
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.model} id={`${id}-model`}>
              <figure className={styles.modelImage} data-model={active.id}>
                <img
                  key={active.id}
                  src={assetUrl(`${imagePath}-${active.image.width}.webp`)}
                  srcSet={`${assetUrl(`${imagePath}-${active.image.small}.webp`)} ${active.image.small}w, ${assetUrl(`${imagePath}-${active.image.width}.webp`)} ${active.image.width}w`}
                  sizes="(min-width: 1660px) 840px, (min-width: 800px) 53vw, 91vw"
                  width={active.image.width}
                  height={active.image.height}
                  alt={active.image.alt}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Ambientazione COSMET</figcaption>
              </figure>
              <div className={styles.modelCopy} key={active.id}>
                <div aria-live="polite" aria-atomic="true">
                  <p className="eyebrow">{opening}</p>
                  <h4>{active.name}</h4>
                  <p className={styles.body}>{active.description}</p>
                </div>
                <div className={styles.modelLinks}>
                  {active.brochureUrl && (
                    <a
                      className={styles.inlineLink}
                      href={active.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sfoglia la brochure PDF <Icon name="external" />
                      <span className="sr-only"> {active.name} (nuova scheda)</span>
                    </a>
                  )}
                  <a
                    className={styles.inlineLink}
                    href={active.configurationUrl ?? active.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {active.configurationUrl ? 'Configura questo modello' : 'Scopri il modello'}{' '}
                    <Icon name="external" />
                    <span className="sr-only"> {active.name} (nuova scheda)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className={styles.collectionLink}
          href={windowCollection.catalogUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutti i modelli COSMET <Icon name="external" />
          <span className="sr-only"> (nuova scheda)</span>
        </a>
      </div>
    </section>
  )
}
