import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { GalleryLightbox } from '../../components/sections/Gallery/GalleryLightbox'
import { Icon } from '../../components/ui/Icon'
import { outdoorShowcaseId, outdoorSolutions as chapters } from '../../data/atelierGibus'
import { useMotion } from '../../hooks/useMotion'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { GalleryLightboxState } from '../../types/gallery'
import pageStyles from './AtelierGibus.module.css'
import styles from './AtelierShowcase.module.css'

gsap.registerPlugin(ScrollTrigger)

const approach = 0.34
const settle = 0.2
const desktopShowcase =
  '(min-width: 1100px) and (min-height: 580px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const photos = chapters.map(({ photo }) => photo)
const photoSizes =
  '(min-width: 1660px) 950px, (min-width: 1100px) and (hover: hover) and (pointer: fine) 58vw, (min-width: 900px) and (orientation: landscape) 52vw, 91vw'

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
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)
  const { reducedMotion } = useMotion()
  const { hash, key } = useLocation()

  useLayoutEffect(() => {
    const pinnedStage = chapterList.current
    if (reducedMotion || !pinnedStage || !steps.current) return
    const firstStep = steps.current.firstElementChild
    const lastStep = steps.current.lastElementChild
    if (!firstStep || !lastStep) return
    const copies = Array.from(pinnedStage.querySelectorAll<HTMLElement>(`.${styles.chapterCopy}`))
    const media = gsap.matchMedia()
    media.add(desktopShowcase, () => {
      let selected = -1
      const sync = ({ progress }: ScrollTrigger) => {
        const position = progress * chapters.length
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

      ScrollTrigger.create({
        trigger: firstStep,
        endTrigger: lastStep,
        start: () => `top ${stageCenter(pinnedStage)}px`,
        end: () => `bottom ${stageCenter(pinnedStage)}px`,
        onUpdate: sync,
        onRefresh: sync,
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
  }, [reducedMotion])

  useLayoutEffect(() => {
    const id = hash.slice(1)
    const chapterIndex = chapters.findIndex((chapter) => chapter.id === id)
    if (id !== outdoorShowcaseId && chapterIndex === -1) return
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id)
      const centered = centerStep(chapterList.current, steps.current?.children[chapterIndex])
      target?.focus({ preventScroll: true })
      if (!centered) {
        target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, key, reducedMotion])

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
            Sole, ombra e <em>riparo.</em>
          </h2>
          <p>
            Pergole, tende e vetrate per rendere balconi, terrazzi e giardini più accoglienti,
            secondo il tuo modo di vivere all’aperto.
          </p>
        </header>
        <div className={styles.journey} data-reduced-motion={reducedMotion}>
          <ol ref={chapterList} className={styles.chapters} role="list">
            {chapters.map(({ photo, ...chapter }, index) => (
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
                <div className={styles.chapterPhoto}>
                  <button
                    className={pageStyles.photoButton}
                    type="button"
                    aria-label={`Ingrandisci foto: ${photo.alt}`}
                    aria-haspopup="dialog"
                    onClick={(event) => setLightbox({ photo, trigger: event.currentTarget })}
                  >
                    <GalleryImage photo={photo} sizes={photoSizes} />
                  </button>
                  <span className={styles.photoCredit}>Foto Gibus</span>
                </div>
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
              <div key={chapter.id} />
            ))}
          </div>
        </div>
      </div>
      {lightbox && (
        <GalleryLightbox {...lightbox} photos={photos} onClose={() => setLightbox(null)} />
      )}
    </section>
  )
}
