import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function useBlogPageEntry() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (hash) {
      let id: string
      try {
        id = decodeURIComponent(hash.slice(1))
      } catch {
        return
      }
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id)
        target?.scrollIntoView({ block: 'start', behavior: 'instant' })
        target?.focus({ preventScroll: true })
      })
      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, hash])

  return mainRef
}
