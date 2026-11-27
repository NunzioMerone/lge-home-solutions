import { useCallback, useEffect, useState } from 'react'
import { useHydrated } from '../../hooks/useHydrated'
import { MotionContext } from '../../config/motionContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { MotionProviderProps } from '../../types/ui'

const motionPreferenceKey = 'lge-reduced-motion'

function storedPreference(): boolean {
  try {
    return sessionStorage.getItem(motionPreferenceKey) === 'true'
  } catch {
    return false
  }
}

export function MotionProvider({ children }: MotionProviderProps) {
  const systemReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [preference, setUserReducedMotion] = useState(storedPreference)
  const userReducedMotion = useHydrated() && preference
  const reducedMotion = systemReducedMotion || userReducedMotion
  const toggleMotion = useCallback(() => {
    setUserReducedMotion((previous) => !previous)
  }, [])

  useEffect(() => {
    try {
      if (preference) {
        sessionStorage.setItem(motionPreferenceKey, 'true')
      } else {
        sessionStorage.removeItem(motionPreferenceKey)
      }
    } catch {
      /* Preference remains available for this visit. */
    }
  }, [preference])

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
    return () => {
      delete document.documentElement.dataset.motion
    }
  }, [reducedMotion])

  return (
    <MotionContext.Provider
      value={{ reducedMotion, systemReducedMotion, userReducedMotion, toggleMotion }}
    >
      {children}
    </MotionContext.Provider>
  )
}
