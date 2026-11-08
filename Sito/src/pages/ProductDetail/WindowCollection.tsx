import { useId, useRef, useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { windowCollection, windowModels } from '../../data/infissi'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { assetUrl } from '../../utils/assetUrl'
import styles from './ProductDetail.module.css'

export function WindowCollection() {
  const section = useSectionReveal()
  const id = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const [selected, setSelected] = useState(0)
  const active = windowModels[selected] ?? windowModels[0]
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
          <div>
            <p className="eyebrow">Modelli e cataloghi COSMET</p>
            <h2 id="window-collection-title">
              La luce prende <em>forma.</em>
            </h2>
          </div>
          <p className={styles.body}>
            Un’apertura cambia il modo di usare una stanza. Confronta tre soluzioni COSMET per
            capire quale profilo, materiale e tipo di apertura si adattano ai tuoi spazi.
          </p>
        </header>

        <div className={styles.collectionCard} data-reveal>
          <div className={styles.modelTabs} role="tablist" aria-label="Modelli COSMET">
            {windowModels.map((model, index) => (
              <button
                key={model.id}
                ref={(element) => {
                  buttons.current[index] = element
                }}
                type="button"
                role="tab"
                id={`${id}-${model.id}`}
                aria-controls={`${id}-model`}
                aria-selected={model.id === active.id}
                tabIndex={model.id === active.id ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  let next: number
                  if (event.key === 'ArrowRight') next = (index + 1) % windowModels.length
                  else if (event.key === 'ArrowLeft')
                    next = (index + windowModels.length - 1) % windowModels.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = windowModels.length - 1
                  else return
                  event.preventDefault()
                  setSelected(next)
                  buttons.current[next]?.focus()
                }}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {model.name}
              </button>
            ))}
          </div>
          <div
            className={styles.model}
            id={`${id}-model`}
            role="tabpanel"
            aria-labelledby={`${id}-${active.id}`}
            tabIndex={0}
          >
            <figure className={styles.modelImage}>
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
              <p className="eyebrow">{active.family}</p>
              <h3>{active.name}</h3>
              <p className={styles.body}>{active.description}</p>
              <p className={styles.modelDetail}>{active.detail}</p>
              <div className={styles.modelLinks}>
                <a
                  className={styles.inlineLink}
                  href={active.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sfoglia la brochure PDF <Icon name="external" />
                  <span className="sr-only"> {active.name} (nuova scheda)</span>
                </a>
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
