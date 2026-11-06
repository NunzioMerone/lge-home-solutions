import { useLayoutEffect, useRef, useState } from 'react'
import { useProductTransition } from '../../../hooks/useProductTransition'
import type { ProductHeroProps } from '../../../types/productTransition'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { Skeleton } from '../../ui/Skeleton'
import type { PhotoId } from '../../../types/content'
import styles from './ProductHero.module.css'

export function ProductHero({ product, title, description, children }: ProductHeroProps) {
  const image = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const { arrive } = useProductTransition()
  const [settledPhoto, setSettledPhoto] = useState<PhotoId | null>(null)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (image.current && heading.current) arrive(image.current, heading.current)
  }, [arrive, product.id])

  return (
    <section className={styles.hero} aria-labelledby="product-title">
      <div ref={image} className={styles.image} data-photo={product.id}>
        {settledPhoto !== product.id && <Skeleton className={styles.imageSkeleton} />}
        <ResponsiveImage
          key={product.id}
          photo={product.id}
          collection="hero"
          sizes="(min-width: 900px) 55vw, 100vw"
          critical
          onSettled={() => setSettledPhoto(product.id)}
        />
      </div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Il design per il tuo benessere</p>
        <h1 ref={heading} id="product-title" tabIndex={-1}>
          {title ?? product.title}
        </h1>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    </section>
  )
}
