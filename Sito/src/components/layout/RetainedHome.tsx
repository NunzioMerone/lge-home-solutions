import { useLayoutEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import type { ScrollPosition } from '../../types/navigation'
import { Home } from '../../pages/Home/Home'
import { getHomeScrollTarget } from '../../utils/homeNavigation'

/** Retain the visited homepage, including its media and carousel positions. */
export function RetainedHome() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const active = location.pathname === '/'
  const [homeLocation, setHomeLocation] = useState<Location | null>(active ? location : null)
  const positions = useRef(new Map<string, ScrollPosition>())

  // Guarded render adjustment keeps the previous route's context frozen while hidden.
  if (active && homeLocation?.key !== location.key) setHomeLocation(location)

  useLayoutEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    if (!active) return
    const savedPositions = positions.current
    let position = { x: window.scrollX, y: window.scrollY }
    const remember = () => {
      position = { x: window.scrollX, y: window.scrollY }
    }
    const target = getHomeScrollTarget(
      navigationType,
      location.hash,
      savedPositions.get(location.key),
    )
    if (target.kind === 'position') {
      window.scrollTo({ left: target.position.x, top: target.position.y, behavior: 'instant' })
    } else {
      document.getElementById(target.id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    remember()
    window.addEventListener('scroll', remember, { passive: true })
    return () => {
      window.removeEventListener('scroll', remember)
      savedPositions.set(location.key, position)
    }
  }, [active, location.hash, location.key, navigationType])

  if (!homeLocation) return null
  return (
    <div hidden={!active} inert={!active} data-retained-home>
      <Routes location={homeLocation}>
        <Route path="/" element={<Home active={active} />} />
      </Routes>
    </div>
  )
}
