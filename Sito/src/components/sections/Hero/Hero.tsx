import { useCallback, useRef } from 'react'
import { heroCopy, heroHeadlineChapters } from '../../../data/hero'
import { useHeroEntrance } from '../../../hooks/useHeroEntrance'
import { getHeroHeadlineAtTime } from '../../../utils/heroHeadline'
import { HeroVideo } from './HeroVideo'
import type { PageActivityProps } from '../../../types/navigation'
import styles from './Hero.module.css'

export function Hero({ active }: PageActivityProps) {
  const rootRef = useHeroEntrance()
  const headlineRef = useRef<HTMLSpanElement>(null)
  const leadRef = useRef<HTMLSpanElement>(null)
  const continuationRef = useRef<HTMLSpanElement>(null)
  const syncHeadline = useCallback((time: number) => {
    const headline = headlineRef.current
    const lead = leadRef.current
    const secondLine = continuationRef.current
    if (!headline || !lead || !secondLine) return
    const { phrase, opacity, maskPosition, leadOpacity, continuation } = getHeroHeadlineAtTime(time)
    const mask = `${maskPosition}% 0%`
    const alpha = String(opacity)
    const leadAlpha = String(leadOpacity)
    const secondPhrase = continuation?.phrase ?? ''
    const secondAlpha = String(continuation?.opacity ?? 0)

    if (lead.textContent !== phrase) lead.textContent = phrase
    if (lead.style.maskPosition !== mask) lead.style.maskPosition = mask
    if (lead.style.opacity !== leadAlpha) lead.style.opacity = leadAlpha
    if (secondLine.textContent !== secondPhrase) secondLine.textContent = secondPhrase
    if (secondLine.style.opacity !== secondAlpha) secondLine.style.opacity = secondAlpha
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
                {heroHeadlineChapters.map(({ startFrame, phrase, continuation }) => (
                  <span className={styles.reserve} key={startFrame}>
                    {phrase}
                    {continuation && (
                      <span className={styles.continuation}>{continuation.phrase}</span>
                    )}
                  </span>
                ))}
                <span ref={headlineRef} className={styles.live}>
                  <span ref={leadRef} className={styles.lead} data-hero-text>
                    {heroCopy.phrases.light}
                  </span>
                  <span
                    ref={continuationRef}
                    className={styles.continuation}
                    data-hero-continuation
                  />
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
