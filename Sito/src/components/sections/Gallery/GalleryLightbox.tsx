import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useEmblaCarousel from 'embla-carousel-react'
import type { GalleryLightboxControl, GalleryLightboxProps } from '../../../types/gallery'
import { useMotion } from '../../../hooks/useMotion'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { GalleryLightboxSlide } from './GalleryLightboxSlide'
import dialogStyles from '../../ui/MediaDialog.module.css'
import styles from './GalleryLightbox.module.css'

function focusedControl(): GalleryLightboxControl | null {
  const control = document.activeElement?.getAttribute('data-lightbox-control')
  return control === 'close' || control === 'previous' || control === 'next' ? control : null
}

export function GalleryLightbox({ photo, trigger, onClose, photos }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const focusRequested = useRef<GalleryLightboxControl | null>(null)
  const backdropPointerDown = useRef(false)
  const collection = photos?.length ? photos : [photo]
  const initialIndex = Math.max(
    0,
    collection.findIndex((item) => item.id === photo.id),
  )
  const [index, setIndex] = useState(initialIndex)
  const { reducedMotion } = useMotion()
  const current = collection[index] ?? photo
  const count = collection.length
  const [viewportRef, api] = useEmblaCarousel({
    loop: count > 1,
    startIndex: initialIndex,
    duration: reducedMotion ? 0 : 32,
    watchFocus: false,
    watchSlides: false,
    watchDrag: (_carousel, event) =>
      !(event.target instanceof Element && event.target.closest('button')),
  })

  useEffect(() => {
    if (!api) return
    const sync = () => {
      focusRequested.current = focusedControl()
      setIndex(api.selectedScrollSnap())
    }
    api.on('select', sync).on('reInit', sync)
    return () => {
      api.off('select', sync).off('reInit', sync)
    }
  }, [api])

  useLayoutEffect(() => {
    const control = focusRequested.current
    if (!control) return
    focusRequested.current = null
    dialogRef.current
      ?.querySelector<HTMLButtonElement>(
        `[data-active="true"] [data-lightbox-control="${control}"]`,
      )
      ?.focus({ preventScroll: true })
  }, [index])

  useEffect(() => {
    if (!api || count < 2) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      if (event.key === 'ArrowLeft') api.scrollPrev(reducedMotion)
      else api.scrollNext(reducedMotion)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [api, count, reducedMotion])

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    dialog.showModal()
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
      onPointerDownCapture={(event) => {
        backdropPointerDown.current =
          !(event.target instanceof Element) || !event.target.closest('[data-lightbox-content]')
      }}
      onPointerCancel={() => {
        backdropPointerDown.current = false
      }}
      onClick={(event) => {
        const inside =
          event.target instanceof Element && event.target.closest('[data-lightbox-content]')
        if (backdropPointerDown.current && !inside) onClose()
        backdropPointerDown.current = false
      }}
    >
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track}>
          {collection.map((item, slideIndex) => {
            const active = slideIndex === index
            const nearby = Math.abs(getLoopOffset(slideIndex, index, count)) <= 1
            return (
              <div
                className={styles.slide}
                key={item.id}
                data-active={active}
                aria-hidden={!active}
                inert={!active}
                role="group"
                aria-roledescription="fotografia"
                aria-label={`${slideIndex + 1} di ${count}`}
              >
                {nearby && (
                  <GalleryLightboxSlide
                    photo={item}
                    active={active}
                    navigable={count > 1}
                    onClose={onClose}
                    onPrevious={() => api?.scrollPrev(reducedMotion)}
                    onNext={() => api?.scrollNext(reducedMotion)}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {index + 1} / {count}
      </p>
    </dialog>,
    document.body,
  )
}
