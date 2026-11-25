import { useCallback, useRef } from 'react'
import { heroCopy } from '../../../data/hero'
import { useHeroEntrance } from '../../../hooks/useHeroEntrance'
import { getHeroHeadlineAtTime } from '../../../utils/heroHeadline'
import { HeroVideo } from './HeroVideo'
import type { PageActivityProps } from '../../../types/navigation'
import styles from './Hero.module.css'

export function Hero({ active }: PageActivityProps) {
  const rootRef = useHeroEntrance()
  const headlineRef = useRef<HTMLSpanElement>(null)
  const syncHeadline = useCallback((time: number) => {
    const headline = headlineRef.current
    if (!headline) return
    const { phrase, opacity, maskPosition } = getHeroHeadlineAtTime(time)
    const mask = `${maskPosition}% 0%`
    const alpha = String(opacity)

    if (headline.textContent !== phrase) headline.textContent = phrase
    if (headline.style.maskPosition !== mask) headline.style.maskPosition = mask
    if (headline.style.opacity !== alpha) headline.style.opacity = alpha
  }, [])

  return (
    <section ref={rootRef} className={styles.hero} id="inizio" aria-labelledby="hero-title">
      <HeroVideo active={active} onTimeChange={syncHeadline} />
      <div className={`container ${styles.content}`}>
        <div className={styles.introduction} data-introduction>
          <p className={styles.eyebrow} data-hero-eyebrow>
            LGE Home Solutions
          </p>
          <h1 id="hero-title">
            <span className="sr-only">
              {heroCopy.prefix} {heroCopy.phrases.light}
            </span>
            <span className={styles.headingVisual} aria-hidden="true">
              <span className={styles.prefix} data-hero-prefix>
                {heroCopy.prefix}
              </span>
              <span className={styles.suffixSlot} data-hero-suffix>
                {Object.values(heroCopy.phrases).map((phrase) => (
                  <span className={styles.reserve} key={phrase}>
                    {phrase}
                  </span>
                ))}
                <span ref={headlineRef} className={styles.live} data-hero-text>
                  {heroCopy.phrases.light}
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
