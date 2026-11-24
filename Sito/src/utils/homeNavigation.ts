import type { NavigationType } from 'react-router-dom'
import type { HomeScrollTarget, ScrollPosition } from '../types/navigation'

export function getHomeScrollTarget(
  navigationType: NavigationType,
  hash: string,
  saved: ScrollPosition | undefined,
  wasOnHome: boolean,
): HomeScrollTarget {
  if (navigationType === 'POP' && saved) return { kind: 'position', position: saved }
  if (hash) {
    try {
      return {
        kind: 'anchor',
        id: decodeURIComponent(hash.slice(1)),
        // Let CSS decide whether to animate an in-page link, including reduced motion.
        behavior: wasOnHome && navigationType !== 'POP' ? 'auto' : 'instant',
      }
    } catch {
      // A malformed anchor still leaves the page usable at its beginning.
    }
  }
  return { kind: 'position', position: { x: 0, y: 0 } }
}
