import { useEffect, useRef, useState } from 'react'
import { getActiveArticleSection } from '../utils/articleNavigation'
import type { BlogSection } from '../types/blog'

export function useActiveArticleSection(sections: readonly BlogSection[] | undefined) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  useEffect(() => {
    const root = bodyRef.current
    if (!root || !sections) return

    const ids = new Set(sections.map((section) => section.id))
    // Observe stable section boxes; their children can animate without moving the reading line.
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-blog-section]')).filter(
      (element) => ids.has(element.id),
    )
    const first = elements[0]
    if (!first) return

    let frame = 0
    let currentId: string | null | undefined
    const update = () => {
      frame = 0
      const headingOffset = Number.parseFloat(getComputedStyle(first).scrollMarginTop) || 0
      const nextId = getActiveArticleSection(
        elements.map((element) => ({ id: element.id, top: element.getBoundingClientRect().top })),
        Math.min(headingOffset, window.innerHeight / 2),
        window.innerHeight * 0.78,
      )
      if (nextId === currentId) return
      currentId = nextId
      setActiveSectionId(nextId)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(root)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sections])

  return { bodyRef, activeSectionId }
}
