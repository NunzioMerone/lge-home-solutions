import { Link } from 'react-router-dom'
import type { HeroProductCardProps } from '../../../types/hero'
import { Icon } from '../../ui/Icon'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { useProductTransition } from '../../../hooks/useProductTransition'
import styles from './HeroProducts.module.css'

export function HeroProductCard({ product, description }: HeroProductCardProps) {
  const { openFromCard } = useProductTransition()
  return (
    <Link
      className={styles.card}
      data-photo={product.id}
      to={product.path}
      onClick={(event) => openFromCard(event, product.path)}
      aria-label={`Scopri ${product.title}`}
      aria-describedby={`hero-description-${product.id}`}
    >
      <div className={styles.photoFrame} data-product-photo>
        <ResponsiveImage
          photo={product.id}
          collection="hero"
          className={styles.photo}
          sizes="(min-width: 1500px) 18vw, (min-width: 700px) 270px, 76vw"
          decorative
        />
      </div>
      <div className={styles.infoPanel}>
        <div className={styles.panelHeading}>
          <h3>{product.title}</h3>
          <Icon name="arrow" className={styles.categoryArrow} />
        </div>
        <p id={`hero-description-${product.id}`}>{description}</p>
      </div>
    </Link>
  )
}
