import { gsap } from 'gsap'
import type { ProductPath } from '../types/content'
import type { ProductImageTransition } from '../types/productTransition'
import styles from '../components/ui/ProductTransition.module.css'

/** Keep a live image above the route change, so its crop evolves without stretching. */
export function createProductImageTransition(
  card: HTMLAnchorElement,
  image: HTMLImageElement,
  path: ProductPath,
  onComplete: () => void,
): ProductImageTransition {
  const origin = card.getBoundingClientRect()
  const photoStyle = getComputedStyle(image)
  const veil = document.createElement('div')
  const frame = document.createElement('div')
  const photo = document.createElement('img')
  veil.className = styles.veil ?? ''
  frame.className = styles.frame ?? ''
  photo.className = styles.image ?? ''
  photo.src = image.currentSrc || image.src
  photo.alt = ''
  veil.setAttribute('aria-hidden', 'true')
  frame.setAttribute('aria-hidden', 'true')
  frame.append(photo)
  document.body.append(veil, frame)
  gsap.set(veil, { opacity: 0 })
  gsap.set(frame, {
    top: origin.top,
    left: origin.left,
    width: origin.width,
    height: origin.height,
    borderRadius: getComputedStyle(card).borderRadius,
  })
  gsap.set(photo, { objectPosition: photoStyle.objectPosition, transform: photoStyle.transform })
  const timeline = gsap.timeline()
  let destination: HTMLElement | null = null
  let completed = false
  const cancel = () => {
    if (completed) return
    completed = true
    timeline.kill()
    frame.remove()
    veil.remove()
    destination?.removeAttribute('data-arriving')
    window.clearTimeout(timeout)
    window.removeEventListener('resize', cancel)
    window.removeEventListener('wheel', cancel)
    window.removeEventListener('touchmove', cancel)
    onComplete()
  }
  // An interrupted route or unavailable destination must never leave an overlay behind.
  const timeout = window.setTimeout(cancel, 3000)
  window.addEventListener('resize', cancel, { once: true })
  window.addEventListener('wheel', cancel, { passive: true, once: true })
  window.addEventListener('touchmove', cancel, { passive: true, once: true })

  return {
    path,
    cancel,
    arrive(target, heading) {
      if (destination || completed) return
      destination = target
      target.setAttribute('data-arriving', 'true')
      const bounds = target.getBoundingClientRect()
      gsap.set(veil, { opacity: 1 })
      timeline
        .to(
          frame,
          {
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
        .to(photo, { scale: 1, duration: 1.15, ease: 'power3.inOut' }, 0)
        .to(veil, { opacity: 0, duration: 0.65, ease: 'power2.out' }, 0.4)
        .call(() => {
          cancel()
          heading.focus({ preventScroll: true })
        })
    },
  }
}
