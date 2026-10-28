import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gallery } from '../../../data/gallery'
import type { GalleryLightboxProps } from '../../../types/gallery'
import { Icon } from '../../ui/Icon'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import styles from './GalleryLightbox.module.css'

export function GalleryLightbox({ photo, trigger, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const category = gallery.find((item) => item.photo === photo)?.category ?? 'LGE'

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
      className={styles.dialog}
      aria-label={`Fotografia ingrandita: ${category}`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={styles.media}>
        <ResponsiveImage photo={photo} sizes="(min-width: 1200px) 800px, 95vw" critical />
      </div>
      <button
        className={styles.close}
        type="button"
        aria-label="Chiudi fotografia"
        onClick={onClose}
      >
        <Icon name="close" />
      </button>
    </dialog>,
    document.body,
  )
}
