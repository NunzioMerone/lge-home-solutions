import { useId, useRef, useState } from 'react'
import { windowComfortTopics } from '../../../data/windowComfort'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { assetUrl } from '../../../utils/assetUrl'
import { ComfortSelectorIcon } from './ComfortSelectorIcon'
import styles from './WindowComfort.module.css'

export function WindowComfort() {
  const [selected, setSelected] = useState(0)
  const root = useSectionReveal({ duration: 1.35, stagger: 0.12 })
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()
  const active = windowComfortTopics[selected] ?? windowComfortTopics[0]
  if (!active) return null

  return (
    <section ref={root} className={styles.section} aria-labelledby="comfort-title" id="comfort">
      <div className={`container ${styles.inner}`}>
        <figure className={styles.stage} data-mode={active.id} data-reveal>
          <img
            className={styles.profile}
            src={assetUrl('img/products/cosmet-luce-poly-slim-800.webp')}
            srcSet={`${assetUrl('img/products/cosmet-luce-poly-slim-800.webp')} 574w, ${assetUrl('img/products/cosmet-luce-poly-slim-1400.webp')} 1005w`}
            sizes="(min-width: 900px) 470px, (min-width: 700px) 350px, 90vw"
            width="1838"
            height="2560"
            loading="lazy"
            decoding="async"
            alt="Infisso COSMET Luce Poly Slim visto in sezione, con vetri e camere interne del profilo"
          />
          <figcaption>COSMET · LUCE POLY SLIM</figcaption>
        </figure>
        <div className={styles.information} data-reveal>
          <p className={styles.eyebrow}>La qualità, nei dettagli</p>
          <h2 id="comfort-title">
            Il benessere,<em> da vicino.</em>
          </h2>
          <div className={styles.tabs} role="tablist" aria-label="Scegli un aspetto del comfort">
            {windowComfortTopics.map((topic, index) => (
              <button
                key={topic.id}
                ref={(element) => {
                  buttons.current[index] = element
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${topic.id}`}
                aria-selected={selected === index}
                aria-controls={`${id}-panel-${topic.id}`}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  let next: number
                  if (event.key === 'ArrowRight') next = (index + 1) % windowComfortTopics.length
                  else if (event.key === 'ArrowLeft')
                    next = (index - 1 + windowComfortTopics.length) % windowComfortTopics.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = windowComfortTopics.length - 1
                  else return
                  event.preventDefault()
                  setSelected(next)
                  buttons.current[next]?.focus()
                }}
              >
                <ComfortSelectorIcon topic={topic.id} />
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.panels}>
            {windowComfortTopics.map((topic, index) => (
              <div
                key={topic.id}
                className={styles.panel}
                role="tabpanel"
                id={`${id}-panel-${topic.id}`}
                aria-labelledby={`${id}-tab-${topic.id}`}
                aria-hidden={selected !== index}
                inert={selected !== index}
                tabIndex={selected === index ? 0 : -1}
              >
                <h3>{topic.heading}</h3>
                <p>{topic.description}</p>
                <p className={styles.detail}>{topic.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
