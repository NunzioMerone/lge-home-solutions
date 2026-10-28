import { competencies, recognitions } from '../../../data/competencies'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { Icon } from '../../ui/Icon'
import styles from './Certifications.module.css'

export function Certifications() {
  const ref = useSectionReveal()
  return (
    <section
      className={styles.section}
      id="competenze"
      aria-labelledby="competencies-title"
      ref={ref}
    >
      <div className={styles.headingPanel}>
        <header className={`${styles.introduction} container`} data-reveal>
          <h2 id="competencies-title" className={styles.title}>
            La qualità nasce dalla <em>competenza</em>
          </h2>
          <p className={styles.description}>
            Dalla scelta dei materiali alla posa, uniamo preparazione tecnica, precisione e
            attenzione per risultati che durano nel tempo.
          </p>
        </header>
      </div>
      <div className={`${styles.content} container`}>
        <div className={styles.grid}>
          {competencies.map((item) => (
            <article key={item.id} className={styles.card} data-reveal>
              <div className={styles.icon}>
                <Icon name={item.icon} />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.label}>{item.label}</p>
                <h3>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.recognitions} aria-labelledby="recognitions-title">
          <h3 id="recognitions-title" className={styles.recognitionsTitle} data-reveal>
            Riconoscimenti e collaborazioni
          </h3>
          <ul className={styles.recognitionGrid}>
            {recognitions.map((item) => (
              <li key={item.id} className={styles.recognition} data-reveal>
                <span className={styles.recognitionIcon}>
                  <Icon name={item.icon} />
                </span>
                <div>
                  <p className={styles.label}>{item.label}</p>
                  <h4>{item.title}</h4>
                  <p className={styles.recognitionDescription}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
