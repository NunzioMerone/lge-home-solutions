import { useId } from 'react'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { workCaseStudyDrafts } from '../../data/workCaseStudyDrafts'
import { workCategories } from '../../data/works'
import type { WorkCaseStudiesProps } from '../../types/works'
import { WorkPhoto } from './WorkPhoto'
import styles from './WorkCaseStudies.module.css'

const fields = [
  ['need', 'L’esigenza'],
  ['solution', 'La soluzione'],
  ['installation', 'La posa'],
  ['contribution', 'Il contributo di LGE'],
  ['result', 'Il risultato atteso'],
] as const

export default function WorkCaseStudies({ selected, onOpen }: WorkCaseStudiesProps) {
  const heading = useId()
  const studies = workCaseStudyDrafts.filter(
    ({ category }) => selected === 'tutti' || selected === category,
  )
  if (studies.length === 0) return null
  return (
    <section className={styles.section} aria-labelledby={heading}>
      <header className={styles.heading}>
        <h3 id={heading}>Esempi di progetto</h3>
        <p>
          Le fotografie provengono dall’archivio LGE. Ogni racconto illustra un possibile progetto,
          con esempi di esigenze, scelte di posa e risultati attesi.
        </p>
      </header>
      {studies.map(({ id, category, title, photos, ...story }) => (
        <details className={styles.study} key={id} name={heading}>
          <summary>
            <span className={styles.thumbnail}>
              <GalleryImage photo={photos[0]} sizes="80px" alt="" />
            </span>
            <span className={styles.name}>
              <small>{workCategories.find((item) => item.id === category)?.title}</small>
              <span>{title}</span>
            </span>
            <span className={styles.indicator} aria-hidden="true" />
          </summary>
          <div className={styles.story}>
            <dl>
              {fields.map(([key, label]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>{story[key]}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.photos}>
              {photos.map((item) => (
                <WorkPhoto
                  key={item.id}
                  photo={item}
                  interactive
                  onOpen={(photo, trigger) => onOpen({ photos, photo, trigger })}
                />
              ))}
            </div>
          </div>
        </details>
      ))}
    </section>
  )
}
