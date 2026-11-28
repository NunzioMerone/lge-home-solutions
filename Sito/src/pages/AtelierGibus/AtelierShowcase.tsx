import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GalleryLightbox } from '../../components/sections/Gallery/GalleryLightbox'
import { Icon } from '../../components/ui/Icon'
import { outdoorShowcaseId, outdoorSolutions as chapters } from '../../data/atelierGibus'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useMotion } from '../../hooks/useMotion'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { GibusLightboxState } from '../../types/atelierGibus'
import { AtelierGallery } from './AtelierGallery'
import styles from './AtelierShowcase.module.css'

const approach = 0.34
const settle = 0.2
const desktopShowcase =
  '(min-width: 1100px) and (min-height: 580px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function stageCenter(stage: HTMLElement) {
  return Number.parseFloat(getComputedStyle(stage).top) + stage.offsetHeight / 2
}

function centerStep(stage: HTMLElement | null, step: Element | undefined) {
  const bounds = step?.getBoundingClientRect()
  if (!stage || !bounds?.height) return false
  window.scrollTo({
    top: window.scrollY + bounds.top + bounds.height / 2 - stageCenter(stage),
    behavior: 'instant',
  })
  return true
}

function copyMotion(position: number, first: boolean, last: boolean) {
  if (!first && position < settle) {
    const progress = gsap.utils.clamp(0, 1, (position + approach) / (approach + settle))
    return {
      opacity: progress,
      offset: 126 * (1 - progress),
      blur: 8 * (1 - progress),
      details: gsap.utils.clamp(0, 1, (progress - 0.58) / 0.42),
    }
  }

  if (!last && position > 1 - approach) {
    const progress = gsap.utils.clamp(0, 1, (position - 1 + approach) / (approach + settle))
    return {
      opacity: (1 - progress) ** 1.3,
      offset: -106 * progress,
      blur: 2 * progress,
      details: 1 - progress,
    }
  }

  return { opacity: 1, offset: 0, blur: 0, details: 1 }
}

export function AtelierShowcase() {
  const section = useSectionReveal()
  const steps = useRef<HTMLDivElement>(null)
  const chapterList = useRef<HTMLOListElement>(null)
  const [slides, setSlides] = useState({ active: 0, previous: -1 })
  const [lightbox, setLightbox] = useState<GibusLightboxState | null>(null)
  const { reducedMotion } = useMotion()
  const desktop = useMediaQuery(desktopShowcase) && !reducedMotion
  const [trigger, setTrigger] = useState<typeof ScrollTrigger>()
  const pinned = desktop && Boolean(trigger)
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!desktop || trigger) return
    let active = true
    void import('gsap/ScrollTrigger').then(
      ({ ScrollTrigger }) => {
        if (!active) return
        gsap.registerPlugin(ScrollTrigger)
        setTrigger(() => ScrollTrigger)
      },
      // Keep the static list usable when the optional animation chunk is unavailable.
      () => {},
    )
    return () => {
      active = false
    }
  }, [desktop, trigger])

  useLayoutEffect(() => {
    const pinnedStage = chapterList.current
    if (!pinned || !trigger || !pinnedStage || !steps.current) return
    const firstStep = steps.current.firstElementChild
    const lastStep = steps.current.lastElementChild
    if (!firstStep || !lastStep) return
    const copies = Array.from(pinnedStage.querySelectorAll<HTMLElement>(`.${styles.chapterCopy}`))
    const media = gsap.matchMedia()
    media.add(desktopShowcase, () => {
      let selected = -1
      let chapterStep = firstStep.getBoundingClientRect().height
      const sync = ({ progress, start, end }: ScrollTrigger) => {
        // Keep intermediate transitions at the same pace when the final step is shorter.
        const position = chapterStep > 0 ? (progress * (end - start)) / chapterStep : 0
        const index = Math.min(Math.floor(position), chapters.length - 1)
        if (selected !== index) {
          selected = index
          setSlides((current) =>
            current.active === index ? current : { active: index, previous: current.active },
          )
        }

        // Let the next heading appear before the image changes, with body text arriving last.
        copies.forEach((copy, chapterIndex) => {
          const motion = copyMotion(
            position - chapterIndex,
            chapterIndex === 0,
            chapterIndex === chapters.length - 1,
          )
          copy.style.setProperty('--copy-opacity', String(motion.opacity))
          copy.style.setProperty('--copy-offset', `${motion.offset}px`)
          copy.style.setProperty('--copy-blur', `${motion.blur}px`)
          copy.style.setProperty('--copy-details', String(motion.details))
        })
      }

      trigger.create({
        trigger: firstStep,
        endTrigger: lastStep,
        start: () => `top ${stageCenter(pinnedStage)}px`,
        end: () => `bottom ${stageCenter(pinnedStage)}px`,
        onUpdate: sync,
        onRefresh: (trigger) => {
          chapterStep = firstStep.getBoundingClientRect().height
          sync(trigger)
        },
      })

      return () => {
        copies.forEach((copy) => {
          copy.style.removeProperty('--copy-opacity')
          copy.style.removeProperty('--copy-offset')
          copy.style.removeProperty('--copy-blur')
          copy.style.removeProperty('--copy-details')
        })
      }
    })
    return () => media.revert()
  }, [pinned, trigger])

  useLayoutEffect(() => {
    const id = hash.slice(1)
    const chapterIndex = chapters.findIndex((chapter) => chapter.id === id)
    if (chapterIndex === -1) return
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id)
      const centered = centerStep(chapterList.current, steps.current?.children[chapterIndex])
      target?.focus({ preventScroll: true })
      if (!centered) {
        target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, key, pinned])

  return (
    <section
      className={`section ${styles.showcase}`}
      id={outdoorShowcaseId}
      aria-labelledby="gibus-solutions-title"
      ref={section}
      tabIndex={-1}
    >
      <div className="container">
        <header className={styles.header} data-reveal>
          <h2 id="gibus-solutions-title">
            Luce, ombra e <em>riparo.</em>
          </h2>
          <p>
            Pergole, tende e vetrate per rendere balconi, terrazzi e giardini più accoglienti,
            secondo il tuo modo di vivere all’aperto.
          </p>
        </header>
        <div className={styles.journey} data-pinned={pinned}>
          <ol ref={chapterList} className={styles.chapters} role="list">
            {chapters.map((chapter, index) => (
              <li
                id={chapter.id}
                key={chapter.id}
                className={styles.chapter}
                data-active={slides.active === index}
                data-previous={slides.previous === index}
                tabIndex={-1}
                onFocus={() => {
                  if (
                    slides.active === index ||
                    !centerStep(chapterList.current, steps.current?.children[index])
                  )
                    return
                  setSlides({ active: index, previous: slides.active })
                }}
              >
                <AtelierGallery
                  id={chapter.id}
                  title={chapter.title}
                  photos={chapter.photos}
                  showGalleryImages={
                    !pinned || slides.active === index || slides.previous === index
                  }
                  onOpen={(photo, trigger) =>
                    setLightbox({ photo, trigger, photos: chapter.photos })
                  }
                />
                <div className={styles.chapterCopy}>
                  <p className={`eyebrow ${styles.category}`}>{chapter.title}</p>
                  <h3>{chapter.feature}</h3>
                  <p className={styles.description}>{chapter.description}</p>
                  <p className={styles.use}>{chapter.use}</p>
                  <a
                    className={styles.detailLink}
                    href={chapter.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Scopri i modelli Gibus: ${chapter.title} (nuova scheda)`}
                  >
                    Scopri i modelli Gibus <Icon name="external" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <div ref={steps} className={styles.steps} aria-hidden="true">
            {chapters.map((chapter) => (
              <div key={chapter.id} id={`scena-${chapter.id}`} />
            ))}
          </div>
        </div>
      </div>
      {lightbox && <GalleryLightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
