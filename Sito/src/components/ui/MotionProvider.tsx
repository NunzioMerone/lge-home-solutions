import { useEffect } from 'react'
import { MotionContext } from '../../config/motionContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { MotionProviderProps } from '../../types/ui'

export function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
    return () => {
      delete document.documentElement.dataset.motion
    }
  }, [reducedMotion])

  return <MotionContext.Provider value={{ reducedMotion }}>{children}</MotionContext.Provider>
}
