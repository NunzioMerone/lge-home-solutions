import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { products } from '../../data/products'
import { Home } from '../../pages/Home/Home'
import { ProductDetail } from '../../pages/ProductDetail/ProductDetail'
import { MotionProvider } from '../ui/MotionProvider'
import { ProductTransitionProvider } from '../ui/ProductTransitionProvider'

it('keeps all IDs unique when the retained homepage and Infissi share the DOM', () => {
  const windows = products.find((product) => product.id === 'windows')
  if (!windows) throw new Error('Missing windows product')
  const markup = renderToStaticMarkup(
    <StaticRouter location={windows.path}>
      <MotionProvider>
        <ProductTransitionProvider>
          <Home active={false} />
          <ProductDetail product={windows} />
        </ProductTransitionProvider>
      </MotionProvider>
    </StaticRouter>,
  )
  const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id)
  expect(ids).toContain('contatti')
  expect(ids).toContain('footer')
  expect(ids).toContain('product-title')
  expect(new Set(ids).size).toBe(ids.length)
})
