import { useEffect, useRef, useState } from 'react'
import { products } from '../../src/data/products'
import { heroDescriptions } from '../../src/data/hero'
import { HeroProductCard } from '../../src/components/sections/Hero/HeroProductCard'
import { ProductTransitionContext } from '../../src/config/productTransitionContext'
import { createProductImageTransition } from '../../src/utils/productImageTransition'
import type {
  ProductImageTransition,
  ProductTransitionContextValue,
} from '../../src/types/productTransition'

/** Hold the real transition at its first frame, before arrival, for a local visual check. */
export function TransitionCopyPreview() {
  const [selected, setSelected] = useState('shading')
  const active = useRef<ProductImageTransition | null>(null)
  const product = products.find((item) => item.id === selected)
  useEffect(() => () => active.current?.cancel(), [])
  const openFromCard: ProductTransitionContextValue['openFromCard'] = (event, path) => {
    event.preventDefault()
    active.current?.cancel()
    const image = event.currentTarget.querySelector('img')
    if (!image?.complete || !image.naturalWidth) return
    active.current = createProductImageTransition(event.currentTarget, image, path, () => {
      active.current = null
    })
  }
  if (!product) return null
  return (
    <main className="copy-check" data-copy-check>
      <h1>Verifica del primo fotogramma</h1>
      <p>
        La copia viene sovrapposta alla foto originale per quattro secondi, senza avviare il
        movimento. Le due inquadrature devono coincidere.
      </p>
      <label>
        Prodotto{' '}
        <select
          value={selected}
          onChange={(event) => {
            active.current?.cancel()
            setSelected(event.target.value)
          }}
        >
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <div className="copy-card">
        <ProductTransitionContext.Provider value={{ openFromCard, arrive: () => undefined }}>
          <HeroProductCard product={product} description={heroDescriptions[product.id]} />
        </ProductTransitionContext.Provider>
      </div>
    </main>
  )
}
