import type { NavigationType } from 'react-router-dom'
import type { HomeScrollTarget, ScrollPosition } from '../types/navigation'

export function getHomeScrollTarget(
  navigationType: NavigationType,
  hash: string,
  saved: ScrollPosition | undefined,
): HomeScrollTarget {
  if (navigationType === 'POP' && saved) return { kind: 'position', position: saved }
  if (hash) {
    try {
      return { kind: 'anchor', id: decodeURIComponent(hash.slice(1)) }
    } catch {
      // A malformed anchor still leaves the page usable at its beginning.
    }
  }
  return { kind: 'position', position: { x: 0, y: 0 } }
}
