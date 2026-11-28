import { useEffect, useRef, useState } from 'react'
import type { SectionIndexProps } from '../../types/sectionIndex'
import { Icon } from './Icon'
import { PageLink } from './PageLink'
import styles from './SectionIndex.module.css'

export function SectionIndex({ label, items, className = '', activeId }: SectionIndexProps) {
  const disclosure = useRef<HTMLDetailsElement>(null)
  const summary = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>()
  const trackSections = activeId === undefined

  useEffect(() => {
    if (!open || !disclosure.current) return
    const details = disclosure.current
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !details.contains(event.target)) {
        details.open = false
      }
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

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
          : Math.max(
              Number.parseFloat(getComputedStyle(target).scrollMarginTop) + 1,
              window.innerHeight / 4,
            )
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
    <nav className={`${styles.dock} ${className}`} aria-label={label}>
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
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
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
