import { useId } from 'react'
import { workCaseStudyDrafts } from '../../data/workCaseStudyDrafts'
import { workCategories } from '../../data/works'
import { useHydrated } from '../../hooks/useHydrated'
import type { WorkCaseStudiesProps } from '../../types/works'
import { Icon } from '../../components/ui/Icon'
import { WorkPhoto } from './WorkPhoto'
import styles from './WorkCaseStudies.module.css'

const fields = [
  ['solution', 'La soluzione'],
  ['installation', 'La posa'],
  ['contribution', 'Il contributo di LGE'],
  ['result', 'Il risultato atteso'],
] as const

export default function WorkCaseStudies({ onOpen }: WorkCaseStudiesProps) {
  const heading = useId()
  const interactive = useHydrated()
  const featuredPhotos = workCaseStudyDrafts.flatMap(({ photos }) => photos)
  return (
    <section className={styles.section} aria-labelledby={heading}>
      <header className={styles.intro}>
        <h3 id={heading}>Esempi di progetto</h3>
        <p>
          Le fotografie provengono dall’archivio LGE. Ogni racconto illustra un possibile progetto,
          con esempi di esigenze, scelte di posa e risultati attesi.
        </p>
      </header>
      {workCaseStudyDrafts.map(({ id, category, title, need, photos, ...story }) => (
        <article key={id} className={styles.study} aria-labelledby={id}>
          <div className={styles.photos}>
            {photos.map((item) => (
              <WorkPhoto
                key={item.id}
                photo={item}
                sizes="(min-width: 1180px) 540px, (min-width: 750px) 47vw, 100vw"
                interactive={interactive}
                onOpen={(photo, trigger) => onOpen({ photos: featuredPhotos, photo, trigger })}
              />
            ))}
          </div>
          <div className={styles.copy}>
            <p className={styles.category}>
              {workCategories.find((item) => item.id === category)?.title}
            </p>
            <h4 id={id}>{title}</h4>
            <p className={styles.need}>{need}</p>
            <details className={styles.details}>
              <summary>
                Leggi il progetto<span className="sr-only">: {title}</span>
                <Icon name="down" />
              </summary>
              <dl>
                {fields.map(([key, label]) => (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{story[key]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </div>
        </article>
      ))}
    </section>
  )
}
