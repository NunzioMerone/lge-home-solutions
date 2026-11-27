import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { PageLink } from '../../components/ui/PageLink'
import { products } from '../../data/products'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import styles from './ProductPlaceholder.module.css'

export function ProductPlaceholder() {
  const { pathname } = useLocation()
  const product = products.find((item) => item.path === pathname.replace(/\/+$/, ''))
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!product) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      heading.current?.focus({ preventScroll: true })
    }
  }, [product])
  return (
    <div className={styles.page}>
      <Header />
      <main aria-labelledby="product-title">
        {product && <ProductHero product={product} description={product.description} />}
        <div className={product ? styles.preparation : styles.main}>
          <div className={styles.content}>
            {!product && (
              <h1 id="product-title" ref={heading} tabIndex={-1}>
                Questa pagina <em>non è qui.</em>
              </h1>
            )}
            <p>
              {product
                ? 'Questa sezione è in preparazione. Presto troverai tutti i dettagli sulle nostre soluzioni.'
                : 'Il collegamento potrebbe non essere corretto. Torna alla homepage per scoprire le nostre soluzioni.'}
            </p>
            {!product && (
              <PageLink className={`text-link ${styles.returnLink}`} to="/">
                Torna alla home <Icon name="arrow" />
              </PageLink>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
