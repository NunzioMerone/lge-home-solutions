import { competencies } from '../../../data/competencies'
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
              <h3>{item.title}</h3>
              <span className={styles.rule} aria-hidden="true" />
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
