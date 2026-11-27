import { PageLink } from '../../ui/PageLink'
import type { HeroProductCardProps } from '../../../types/hero'
import { Icon } from '../../ui/Icon'
import { ResponsiveImage } from '../../ui/ResponsiveImage'
import { useProductTransition } from '../../../hooks/useProductTransition'
import { deferredProductPages } from '../../../utils/productPages'
import styles from './HeroProducts.module.css'

export function HeroProductCard({ product, description }: HeroProductCardProps) {
  const { openFromCard } = useProductTransition()
  const preparePage = () => {
    void deferredProductPages
      .get(product.path)
      ?.prepare()
      ?.catch(() => {})
  }
  return (
    <PageLink
      className={styles.card}
      data-photo={product.id}
      to={product.path}
      onPointerEnter={preparePage}
      onFocus={preparePage}
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
    </PageLink>
  )
}
