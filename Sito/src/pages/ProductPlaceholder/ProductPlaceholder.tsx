import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../../data/products'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import styles from './ProductPlaceholder.module.css'

export function ProductPlaceholder() {
  const { pathname } = useLocation()
  const product = products.find((item) => item.path === pathname.replace(/\/+$/, ''))
  useEffect(() => {
    if (!product) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [product])
  return (
    <div className={styles.page}>
      <Header />
      <main aria-labelledby="product-title">
        {product && <ProductHero product={product} description={product.description} />}
        <div className={product ? styles.preparation : styles.main}>
          <div className={styles.content}>
            {!product && <h1 id="product-title">Pagina in preparazione</h1>}
            <p>
              Questa sezione è in preparazione. Presto troverai tutti i dettagli sulle nostre
              soluzioni.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
