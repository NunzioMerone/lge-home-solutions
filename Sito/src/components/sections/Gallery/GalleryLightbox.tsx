import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type {
  GalleryLightboxControl,
  GalleryLightboxNavigation,
  GalleryLightboxProps,
} from '../../../types/gallery'
import { useMotion } from '../../../hooks/useMotion'
import { GalleryLightboxSlide } from './GalleryLightboxSlide'
import dialogStyles from '../../ui/MediaDialog.module.css'
import styles from './GalleryLightbox.module.css'

const GalleryLightboxCarousel = lazy(() => import('./GalleryLightboxCarousel'))

function focusedControl(): GalleryLightboxControl | null {
  const control = document.activeElement?.getAttribute('data-lightbox-control')
  return control === 'close' || control === 'previous' || control === 'next' ? control : null
}

export function GalleryLightbox({ photo, trigger, onClose, photos }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const navigationRef = useRef<GalleryLightboxNavigation>(null)
  const focusRequested = useRef<GalleryLightboxControl | null>('close')
  const backdropPointerDown = useRef(false)
  const pointerOrigin = useRef<readonly [number, number] | null>(null)
  const collection = photos?.length ? photos : [photo]
  const initialIndex = Math.max(
    0,
    collection.findIndex((item) => item.id === photo.id),
  )
  const [index, setIndex] = useState(initialIndex)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [carouselRevision, setCarouselRevision] = useState(0)
  const { reducedMotion } = useMotion()
  const current = collection[index] ?? photo
  const count = collection.length
  const selectPhoto = (nextIndex: number) => {
    focusRequested.current = focusedControl() ?? focusRequested.current
    setIndex(nextIndex)
  }

  useLayoutEffect(() => {
    const control = focusRequested.current
    if (!control) return
    focusRequested.current = null
    dialogRef.current
      ?.querySelector<HTMLButtonElement>(
        `[data-active="true"] [data-lightbox-control="${control}"]`,
      )
      ?.focus({ preventScroll: true })
  }, [index, carouselRevision])

  useEffect(() => {
    if (count < 2) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      if (event.key === 'ArrowLeft') navigationRef.current?.previous()
      else navigationRef.current?.next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [count])

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    setDialogOpen(true)
    return () => {
      dialog.close()
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      if (trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [trigger])

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${dialogStyles.dialog} ${styles.gallery}`}
      aria-label={`Fotografia ingrandita: ${current.category}`}
      data-navigable={count > 1}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>(
          '[data-active="true"] button:not(:disabled)',
        )
        const first = controls[0]
        const last = controls[controls.length - 1]
        const destination = event.shiftKey ? last : first
        if (document.activeElement === (event.shiftKey ? first : last) && destination) {
          event.preventDefault()
          destination.focus({ preventScroll: true })
        }
      }}
      onPointerDownCapture={(event) => {
        pointerOrigin.current = [event.clientX, event.clientY]
        backdropPointerDown.current =
          !(event.target instanceof Element) || !event.target.closest('[data-lightbox-content]')
      }}
      onPointerUpCapture={(event) => {
        const origin = pointerOrigin.current
        if (origin && Math.hypot(event.clientX - origin[0], event.clientY - origin[1]) > 8) {
          backdropPointerDown.current = false
        }
        pointerOrigin.current = null
      }}
      onPointerCancel={() => {
        backdropPointerDown.current = false
        pointerOrigin.current = null
      }}
      onClick={(event) => {
        const inside =
          event.target instanceof Element && event.target.closest('[data-lightbox-content]')
        if (!event.defaultPrevented && backdropPointerDown.current && !inside) onClose()
        backdropPointerDown.current = false
      }}
    >
      <Suspense
        fallback={
          <div className={styles.fallback} data-active="true" aria-busy="true">
            <GalleryLightboxSlide
              photo={photo}
              active
              navigable={count > 1}
              navigationReady={false}
              onClose={onClose}
              onPrevious={() => navigationRef.current?.previous()}
              onNext={() => navigationRef.current?.next()}
            />
          </div>
        }
      >
        {dialogOpen && (
          <GalleryLightboxCarousel
            ref={navigationRef}
            photos={collection}
            initialIndex={initialIndex}
            selectedIndex={index}
            reducedMotion={reducedMotion}
            onSelect={selectPhoto}
            onReady={() => {
              focusRequested.current = focusedControl() ?? 'close'
              setCarouselRevision((revision) => revision + 1)
            }}
            onClose={onClose}
          />
        )}
      </Suspense>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {index + 1} / {count}
      </p>
    </dialog>,
    document.body,
  )
}
