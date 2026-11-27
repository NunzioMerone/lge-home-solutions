import { Suspense, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RetainedHome } from './components/layout/RetainedHome'
import { ProductPlaceholder } from './pages/ProductPlaceholder/ProductPlaceholder'
import { products } from './data/products'
import { useAnalytics } from './hooks/useAnalytics'
import { usePageMetadata } from './hooks/usePageMetadata'
import { informationRoutes } from './utils/informationRoutes'
import { deferredProductPages } from './utils/productPages'
import { useInputModality } from './hooks/useInputModality'
import { PageLoadBoundary } from './components/layout/PageLoadBoundary'
import { RoutePending } from './components/layout/RoutePending'
import { WhatsAppContactLink } from './components/ui/WhatsAppContactLink'
import type { DeferredInformationRouteProps } from './types/navigation'
import type { ProductDetailProps } from './types/productTransition'

function DeferredProductRoute({ product }: ProductDetailProps) {
  // A direct visit may resolve the lazy module after this route has mounted.
  const [Page] = useState(() => deferredProductPages.get(product.path)?.getPage())
  return Page ? <Page product={product} /> : <ProductPlaceholder />
}

function DeferredInformationRoute({ getPage }: DeferredInformationRouteProps) {
  const [Page] = useState(getPage)
  return <Page />
}

export default function App() {
  useInputModality()
  const { pathname } = useLocation()
  usePageMetadata(pathname)
  useAnalytics(pathname)
  return (
    <>
      <RetainedHome />
      <PageLoadBoundary key={pathname}>
        <Suspense fallback={<RoutePending />}>
          <Routes>
            <Route path="/" element={null} />
            {informationRoutes.map(({ path, page: { getPage } }) => (
              <Route
                key={path}
                path={path}
                element={<DeferredInformationRoute getPage={getPage} />}
              />
            ))}
            {products.map((product) => (
              <Route
                key={product.path}
                path={product.path}
                element={<DeferredProductRoute product={product} />}
              />
            ))}
            <Route path="*" element={<ProductPlaceholder />} />
          </Routes>
        </Suspense>
      </PageLoadBoundary>
      <WhatsAppContactLink floating />
    </>
  )
}
