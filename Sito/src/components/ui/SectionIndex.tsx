import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { SectionIndexProps } from '../../types/sectionIndex'
import { Icon } from './Icon'
import { PageLink } from './PageLink'
import styles from './SectionIndex.module.css'

const hasStartedReading = () => window.scrollY > 16
const initialReadingState = () => false

function subscribeToScroll(update: () => void) {
  window.addEventListener('scroll', update, { passive: true })
  return () => window.removeEventListener('scroll', update)
}

export function SectionIndex({ label, items, className = '', activeId }: SectionIndexProps) {
  const disclosure = useRef<HTMLDetailsElement>(null)
  const summary = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>()
  const trackSections = activeId === undefined
  const visible = useSyncExternalStore(subscribeToScroll, hasStartedReading, initialReadingState)

  useEffect(() => {
    if (!visible && disclosure.current) disclosure.current.open = false
  }, [visible])

  useEffect(() => {
    if (!disclosure.current) return
    const details = disclosure.current
    function dismiss(event: Event) {
      if (details.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false
      }
    }
    // On touch WebKit may focus an ancestor between pointerup and click.
    // Keep the links in place during that native tap sequence.
    function dismissAfterTab(event: KeyboardEvent) {
      if (details.open && event.key === 'Tab' && !details.contains(document.activeElement)) {
        details.open = false
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keyup', dismissAfterTab)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keyup', dismissAfterTab)
    }
  }, [])

  useEffect(() => {
    if (!open || !trackSections) return
    const sections = items.map(({ id, scrollStepId }) => ({
      id,
      target: document.getElementById(id),
      step: scrollStepId ? document.getElementById(scrollStepId) : null,
    }))
    let frame = 0
    function update() {
      frame = 0
      let active: string | undefined
      for (const { id, target, step } of sections) {
        if (!target) continue
        const pinned = step && step.getClientRects().length > 0
        const top = (pinned ? step : target).getBoundingClientRect().top
        const readingLine = pinned
          ? window.innerHeight / 2
          : (Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0) + 1
        if (top <= readingLine) active = id
      }
      setCurrent(active)
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [open, items, trackSections])

  return (
    <nav className={`${styles.dock} ${className}`} aria-label={label} data-scrolled={visible}>
      <details
        ref={disclosure}
        onToggle={(event) => setOpen(event.currentTarget.open)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && event.currentTarget.open) {
            event.preventDefault()
            event.currentTarget.open = false
            summary.current?.focus({ preventScroll: true })
          }
        }}
      >
        <summary ref={summary} className={styles.trigger}>
          {label} <Icon name="chevron-right" />
        </summary>
        <ul className={styles.links}>
          {items.map(({ id, label: text }) => (
            <li key={id}>
              <PageLink
                to={`#${id}`}
                aria-current={id === (trackSections ? current : activeId) ? 'location' : undefined}
                onClick={() => {
                  if (disclosure.current) disclosure.current.open = false
                }}
              >
                {text}
              </PageLink>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  )
}
