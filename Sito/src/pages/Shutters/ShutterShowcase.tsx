import { useState } from 'react'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { ProductOptionDetails } from '../../components/ui/ProductOptionDetails'
import options from '../../components/ui/ProductOptionDetails.module.css'
import { Icon } from '../../components/ui/Icon'
import { cosmetShutterBrochure, shutterGroups } from '../../data/shutters'
import styles from './Shutters.module.css'

const initialGroup = shutterGroups[0]

const solutions = shutterGroups.flatMap((group) =>
  group.overview ? [group.overview, ...group.options] : group.options,
)

export function ShutterShowcase() {
  const [selected, setSelected] = useState(initialGroup.overview ?? initialGroup.options[0])
  const activeGroup = shutterGroups.find(
    (group) => group.overview === selected || group.options.includes(selected),
  )

  return (
    <div className={styles.studio} data-reveal>
      <div
        className={`${styles.controls} ${options.controls}`}
        role="group"
        aria-label="Tipi di oscuranti"
      >
        {shutterGroups.map((group) => (
          <div key={group.id}>
            <button
              className={styles.primaryControl}
              type="button"
              aria-pressed={group === activeGroup}
              aria-controls={`shutters-${group.id}-options shutters-product`}
              onClick={() => setSelected(group.overview ?? group.options[0])}
            >
              {group.name}
            </button>
            <div
              id={`shutters-${group.id}-options`}
              className={styles.subControls}
              role="group"
              aria-label={group.optionsLabel}
              hidden={group !== activeGroup}
            >
              {group.options.map((option) => (
                <button
                  key={option.photo.id}
                  type="button"
                  aria-pressed={selected === option}
                  aria-controls="shutters-product"
                  onClick={() => setSelected(option)}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.product} id="shutters-product">
        <figure className={styles.media} data-photo={selected.photo.id}>
          <GalleryImage
            key={selected.photo.id}
            photo={selected.photo}
            alt={selected.photo.alt}
            sizes="auto, (min-width: 1440px) 730px, (min-width: 1040px) 52vw, (min-width: 740px) 51vw, (min-width: 550px) 480px, 91vw"
          />
          <figcaption>{selected.caption}</figcaption>
        </figure>

        <div className={styles.productCopy}>
          {solutions.map((option) => (
            <ProductOptionDetails
              key={option.photo.id}
              active={option === selected}
              label={option.name}
            >
              <div aria-live="polite" aria-atomic="true">
                <h3>{option.name}</h3>
                <p className={styles.feature}>{option.headline}</p>
                <p className={styles.body}>{option.detail}</p>
              </div>
              {option.references.length > 0 && (
                <div className={styles.actions}>
                  {option.references.map(({ label, url }) => (
                    <a
                      key={url}
                      className={styles.inlineLink}
                      data-analytics-catalog={url === cosmetShutterBrochure.url || undefined}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label} <Icon name="external" />
                      <span className="sr-only"> (nuova scheda)</span>
                    </a>
                  ))}
                </div>
              )}
            </ProductOptionDetails>
          ))}
        </div>
      </div>
    </div>
  )
}
