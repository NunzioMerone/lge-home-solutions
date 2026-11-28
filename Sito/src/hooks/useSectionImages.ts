import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/** Start native lazy loading when this section approaches the viewport or receives focus. */
export function useSectionImages(ref: RefObject<HTMLElement | null>, enabled = true) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const section = ref.current
    if (!section || !enabled || ready) return

    const enableImages = () => setReady(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) enableImages()
      },
      // The first section touches the bottom edge of the full-height hero on entry.
      { rootMargin: '0px 0px -1px' },
    )
    observer.observe(section)
    section.addEventListener('focusin', enableImages)
    return () => {
      observer.disconnect()
      section.removeEventListener('focusin', enableImages)
    }
  }, [ref, ready, enabled])

  return ready
}
