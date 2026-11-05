import { useCallback, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProductTransitionContext } from '../../config/productTransitionContext'
import { useMotion } from '../../hooks/useMotion'
import type {
  ProductImageTransition,
  ProductTransitionContextValue,
  ProductTransitionProviderProps,
} from '../../types/productTransition'
import { createProductImageTransition } from '../../utils/productImageTransition'

export function ProductTransitionProvider({ children }: ProductTransitionProviderProps) {
  const active = useRef<ProductImageTransition | null>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { reducedMotion } = useMotion()

  const openFromCard = useCallback<ProductTransitionContextValue['openFromCard']>(
    (event, path) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        reducedMotion
      )
        return
      const card = event.currentTarget
      const image = card.querySelector('img')
      if (!image?.complete || !image.naturalWidth) return
      event.preventDefault()
      if (active.current) return
      active.current = createProductImageTransition(card, image, path, () => {
        active.current = null
      })
      try {
        flushSync(() => navigate(path))
      } catch (error) {
        active.current?.cancel()
        throw error
      }
    },
    [navigate, reducedMotion],
  )

  const arrive = useCallback<ProductTransitionContextValue['arrive']>((image, heading) => {
    active.current?.arrive(image, heading)
  }, [])

  useEffect(() => {
    if (active.current && (active.current.path !== pathname || reducedMotion)) {
      active.current.cancel()
    }
  }, [pathname, reducedMotion])
  useEffect(() => () => active.current?.cancel(), [])

  return (
    <ProductTransitionContext.Provider value={{ openFromCard, arrive }}>
      {children}
    </ProductTransitionContext.Provider>
  )
}
