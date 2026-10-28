import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../../data/products'
import styles from './ProductPlaceholder.module.css'

export function ProductPlaceholder() {
  const { pathname } = useLocation()
  const product = products.find((item) => item.path === pathname)
  useEffect(() => {
    document.title = `${product?.title ?? 'Pagina'} — LGE Home Solutions`
    window.scrollTo(0, 0)
  }, [product])
  return (
    <main
      className={styles.blank}
      aria-label={`${product?.title ?? 'Pagina'} — pagina provvisoria`}
    />
  )
}
