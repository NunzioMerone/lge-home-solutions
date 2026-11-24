import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function getAnchorId(hash: string) {
  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return ''
  }
}

export function useAnchorNavigation(...sectionIds: string[]) {
  const { hash, key } = useLocation()
  const navigationType = useNavigationType()
  const anchorId = getAnchorId(hash)
  const targetId = sectionIds.length === 0 || sectionIds.includes(anchorId) ? anchorId : ''

  useLayoutEffect(() => {
    if (!targetId) return
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      target?.focus({ preventScroll: true })
      target?.scrollIntoView({
        block: 'start',
        behavior: navigationType === 'POP' ? 'instant' : 'auto',
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [key, navigationType, targetId])
}
