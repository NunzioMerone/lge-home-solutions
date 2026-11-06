import { gsap } from 'gsap'
import type { ProductPath } from '../types/content'
import type { ProductImageTransition } from '../types/productTransition'
import styles from '../components/ui/ProductTransition.module.css'
import { waitForImage } from './imageReady'
import { getImagePaintBounds, relativeImageBounds } from './imageGeometry'

/** Keep a live image above the route change, so its crop evolves without stretching. */
export function createProductImageTransition(
  card: HTMLAnchorElement,
  image: HTMLImageElement,
  path: ProductPath,
  onComplete: () => void,
): ProductImageTransition {
  const origin = (card.querySelector('[data-product-photo]') ?? image).getBoundingClientRect()
  const photoStyle = getComputedStyle(image)
  // Responsive candidates expose rounded density-corrected natural sizes in the DOM.
  // The declared asset dimensions retain the original aspect ratio.
  const naturalWidth = Number(image.getAttribute('width')) || image.naturalWidth
  const naturalHeight = Number(image.getAttribute('height')) || image.naturalHeight
  const sourcePaint = getImagePaintBounds({
    bounds: image.getBoundingClientRect(),
    naturalWidth,
    naturalHeight,
    objectFit: photoStyle.objectFit,
    objectPosition: photoStyle.objectPosition,
  })
  const veil = document.createElement('div')
  const frame = document.createElement('div')
  const photo = document.createElement('img')
  veil.className = styles.veil ?? ''
  frame.className = styles.frame ?? ''
  photo.className = styles.image ?? ''
  photo.src = image.currentSrc || image.src
  photo.decoding = 'sync'
  photo.alt = ''
  veil.setAttribute('aria-hidden', 'true')
  frame.setAttribute('aria-hidden', 'true')
  frame.setAttribute('data-product-transition', path)
  frame.append(photo)
  document.body.append(veil, frame)
  gsap.set(veil, { opacity: 0 })
  gsap.set(frame, {
    autoRound: false,
    top: origin.top,
    left: origin.left,
    width: origin.width,
    height: origin.height,
    borderRadius: getComputedStyle(card).borderRadius,
  })
  gsap.set(photo, {
    autoRound: false,
    ...relativeImageBounds(sourcePaint, origin),
  })
  const timeline = gsap.timeline({ paused: true })
  const controller = new AbortController()
  const initialWidth = window.innerWidth
  let arrivalFrame = 0
  let destination: HTMLElement | null = null
  let completed = false
  const cancel = () => {
    if (completed) return
    completed = true
    controller.abort()
    cancelAnimationFrame(arrivalFrame)
    timeline.kill()
    frame.remove()
    veil.remove()
    destination?.removeAttribute('data-arriving')
    window.clearTimeout(timeout)
    window.removeEventListener('resize', resize)
    window.removeEventListener('wheel', cancel)
    window.removeEventListener('touchmove', cancel)
    onComplete()
  }
  // An interrupted route or unavailable destination must never leave an overlay behind.
  const timeout = window.setTimeout(cancel, 4500)
  // Mobile browser chrome changes height during navigation; the image geometry depends on width.
  const resize = () => {
    if (Math.abs(window.innerWidth - initialWidth) > 1) cancel()
  }
  window.addEventListener('resize', resize)
  window.addEventListener('wheel', cancel, { passive: true, once: true })
  window.addEventListener('touchmove', cancel, { passive: true, once: true })

  return {
    path,
    cancel,
    arrive(target, heading) {
      if (destination || completed) return
      destination = target
      target.setAttribute('data-arriving', 'true')
      arrivalFrame = requestAnimationFrame(() => {
        if (completed) return
        const bounds = target.getBoundingClientRect()
        const targetPhoto = target.querySelector('img')
        const destinationStyle = targetPhoto ? getComputedStyle(targetPhoto) : null
        const destinationPaint = getImagePaintBounds({
          bounds: targetPhoto?.getBoundingClientRect() ?? bounds,
          naturalWidth,
          naturalHeight,
          objectFit: destinationStyle?.objectFit ?? 'contain',
          objectPosition: destinationStyle?.objectPosition ?? '50% 50%',
        })
        gsap.set(veil, { opacity: 1 })
        timeline
          .to(
            frame,
            {
              autoRound: false,
              top: bounds.top,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height,
              borderRadius: getComputedStyle(target).borderRadius,
              duration: 1.15,
              ease: 'power3.inOut',
            },
            0,
          )
          .to(
            photo,
            {
              autoRound: false,
              ...relativeImageBounds(destinationPaint, bounds),
              duration: 1.15,
              ease: 'power3.inOut',
            },
            0,
          )
          .to(veil, { opacity: 0, duration: 0.65, ease: 'power2.out' }, 0.4)
          .call(() => {
            const finish = () => {
              if (completed) return
              cancel()
              heading.focus({ preventScroll: true })
            }
            if (targetPhoto) {
              void waitForImage(targetPhoto, { signal: controller.signal }).then(finish)
            } else finish()
          })
          .play(0)
      })
    },
  }
}
