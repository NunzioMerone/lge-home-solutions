import { lazy, Suspense, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RetainedHome } from './components/layout/RetainedHome'
import { ProductPlaceholder } from './pages/ProductPlaceholder/ProductPlaceholder'
import { ProductDetail } from './pages/ProductDetail/ProductDetail'
import { products } from './data/products'
import { competenciesPage } from './config/competencies'
import { worksPage } from './config/works'
import { privacyPage } from './config/privacy'
import { usePageMetadata } from './hooks/usePageMetadata'
import { getPageMetadata } from './utils/pageMetadata'
import { deferredProductPages } from './utils/productPages'
import { useInputModality } from './hooks/useInputModality'
import { PageLoadBoundary } from './components/layout/PageLoadBoundary'
import { RoutePending } from './components/layout/RoutePending'
import type { ProductDetailProps } from './types/productTransition'

const PrivacyPolicy = lazy(() =>
  import('./pages/PrivacyPolicy/PrivacyPolicy').then((page) => ({ default: page.PrivacyPolicy })),
)
const Competencies = lazy(() =>
  import('./pages/Competencies/Competencies').then((page) => ({ default: page.Competencies })),
)
const Works = lazy(() => import('./pages/Works/Works').then((page) => ({ default: page.Works })))

function DeferredProductRoute({ product }: ProductDetailProps) {
  // A direct visit may resolve the lazy module after this route has mounted.
  const [Page] = useState(() => deferredProductPages.get(product.path)?.getPage())
  return Page ? <Page product={product} /> : <ProductPlaceholder />
}

export default function App() {
  useInputModality()
  const { pathname } = useLocation()
  usePageMetadata(getPageMetadata(pathname))
  return (
    <>
      <RetainedHome />
      <PageLoadBoundary key={pathname}>
        <Suspense fallback={<RoutePending />}>
          <Routes>
            <Route path="/" element={null} />
            <Route path={privacyPage.path} element={<PrivacyPolicy />} />
            <Route path={competenciesPage.path} element={<Competencies />} />
            <Route path={worksPage.path} element={<Works />} />
            {products.map((product) => (
              <Route
                key={product.path}
                path={product.path}
                element={
                  product.id === 'windows' ? (
                    <ProductDetail product={product} />
                  ) : (
                    <DeferredProductRoute product={product} />
                  )
                }
              />
            ))}
            <Route path="*" element={<ProductPlaceholder />} />
          </Routes>
        </Suspense>
      </PageLoadBoundary>
    </>
  )
}
