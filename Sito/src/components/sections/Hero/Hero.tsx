import { heroCopy } from '../../../data/hero'
import { useHeroEntrance } from '../../../hooks/useHeroEntrance'
import { HeroVideo } from './HeroVideo'
import type { PageActivityProps } from '../../../types/navigation'
import styles from './Hero.module.css'

export function Hero({ active }: PageActivityProps) {
  const rootRef = useHeroEntrance()
  return (
    <section ref={rootRef} className={styles.hero} id="inizio" aria-labelledby="hero-title">
      <HeroVideo active={active} />
      <div className={`container ${styles.content}`}>
        <div className={styles.introduction} data-introduction>
          <p className={styles.eyebrow} data-hero-eyebrow>
            LGE Home Solutions
          </p>
          <h1 id="hero-title">
            <span className="sr-only">
              {heroCopy.prefix} {heroCopy.phrases[0]}
            </span>
            <span className={styles.headingVisual} aria-hidden="true">
              <span className={styles.prefix} data-hero-prefix>
                {heroCopy.prefix}
              </span>
              <span className={styles.suffixSlot}>
                {heroCopy.phrases.map((phrase) => (
                  <span className={styles.reserve} key={phrase}>
                    {phrase}
                  </span>
                ))}
                <span className={styles.live} data-hero-live>
                  <span data-hero-text>{heroCopy.phrases[0]}</span>
                </span>
              </span>
            </span>
          </h1>
          <p className={styles.subtitle} data-hero-subtitle>
            {heroCopy.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
