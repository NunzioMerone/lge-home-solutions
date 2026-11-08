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
import { deferredProductPages } from '../../utils/productPages'
import { waitForImage } from '../../utils/imageReady'

export function ProductTransitionProvider({ children }: ProductTransitionProviderProps) {
  const active = useRef<ProductImageTransition | null>(null)
  const pending = useRef<AbortController | null>(null)
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
      if (!image) return
      event.preventDefault()
      if (active.current || pending.current) return
      const open = () => {
        active.current = createProductImageTransition(card, image, path, () => {
          active.current = null
        })
        try {
          flushSync(() =>
            navigate(path, { state: { productPhotoPreview: image.currentSrc || image.src } }),
          )
        } catch (error) {
          active.current?.cancel()
          throw error
        }
      }
      const pagePreparation = deferredProductPages.get(path)?.prepare()
      const photoReady = image.complete && image.naturalWidth > 0
      if (!pagePreparation && photoReady) {
        open()
        return
      }
      const controller = new AbortController()
      pending.current = controller
      card.setAttribute('aria-busy', 'true')
      if (!photoReady) image.loading = 'eager'
      const settle = (ready: boolean) => {
        if (pending.current === controller) pending.current = null
        if (controller.signal.aborted) return
        controller.abort()
        if (!card.isConnected) return
        if (ready) open()
        else navigate(path)
      }
      const timeout = window.setTimeout(() => settle(false), 2200)
      controller.signal.addEventListener(
        'abort',
        () => {
          window.clearTimeout(timeout)
          card.removeAttribute('aria-busy')
        },
        { once: true },
      )
      void Promise.all([
        pagePreparation,
        photoReady || waitForImage(image, { signal: controller.signal }),
      ]).then(
        ([, ready]) => settle(ready),
        () => settle(false),
      )
    },
    [navigate, reducedMotion],
  )

  const arrive = useCallback<ProductTransitionContextValue['arrive']>((image, heading) => {
    active.current?.arrive(image, heading)
  }, [])

  useEffect(() => {
    pending.current?.abort()
    pending.current = null
    if (active.current && (active.current.path !== pathname || reducedMotion)) {
      active.current.cancel()
    }
  }, [pathname, reducedMotion])
  useEffect(
    () => () => {
      pending.current?.abort()
      active.current?.cancel()
    },
    [],
  )

  return (
    <ProductTransitionContext.Provider value={{ openFromCard, arrive }}>
      {children}
    </ProductTransitionContext.Provider>
  )
}
