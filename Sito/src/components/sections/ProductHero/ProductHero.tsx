import { useHydrated } from '../../../hooks/useHydrated'
import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { heroPhotos } from '../../../data/heroPhotos'
import { useProductTransition } from '../../../hooks/useProductTransition'
import type { ProductHeroProps } from '../../../types/productTransition'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { Skeleton } from '../../ui/Skeleton'
import type { PhotoId } from '../../../types/content'
import styles from './ProductHero.module.css'

export function ProductHero({
  product,
  eyebrow = 'Il design per il tuo benessere',
  title,
  description,
  imageOverlay,
  children,
}: ProductHeroProps) {
  const image = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const { arrive } = useProductTransition()
  const [settledPhoto, setSettledPhoto] = useState<{ id: PhotoId; ready: boolean } | null>(null)
  const loaded = settledPhoto?.id === product.id && settledPhoto.ready
  const location = useLocation()
  const state: unknown = useHydrated() ? location.state : null
  // Keep the card's painted bitmap while the larger responsive candidate decodes.
  const preview =
    !loaded &&
    state &&
    typeof state === 'object' &&
    'productPhotoPreview' in state &&
    typeof state.productPhotoPreview === 'string'
      ? state.productPhotoPreview
      : null
  const asset = heroPhotos[product.id]
  const descriptionParagraphs = typeof description === 'string' ? [description] : description

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (image.current && heading.current) arrive(image.current, heading.current)
  }, [arrive, product.id])

  return (
    <section className={styles.hero} aria-labelledby="product-title">
      <div ref={image} className={styles.image} data-photo={product.id}>
        {preview && (
          <img
            className={styles.photo}
            src={preview}
            width={asset.width}
            height={asset.height}
            alt={asset.alt}
            decoding="sync"
          />
        )}
        {!preview && settledPhoto?.id !== product.id && (
          <Skeleton className={styles.imageSkeleton} />
        )}
        <ResponsiveImage
          key={product.id}
          photo={product.id}
          collection="hero"
          sizes={
            product.id === 'outdoor'
              ? '(min-width: 1200px) 50vw, (min-width: 900px) and (orientation: landscape) 50vw, 100vw'
              : '(min-width: 900px) 55vw, 100vw'
          }
          className={preview ? `${styles.photo} ${styles.upgrade}` : styles.photo}
          critical
          decorative={Boolean(preview)}
          onSettled={(ready) => setSettledPhoto({ id: product.id, ready })}
        />
        {(loaded || preview) && imageOverlay}
      </div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 ref={heading} id="product-title" tabIndex={-1}>
          {title ?? product.title}
        </h1>
        <div className={styles.description}>
          {descriptionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {children}
      </div>
    </section>
  )
}
