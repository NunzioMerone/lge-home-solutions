import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { competenciesPage } from '../../config/competencies'
import { worksPage } from '../../config/works'
import { deferredProductPages } from '../../utils/productPages'
import type { RouteSkeletonKind } from '../../types/skeleton'
import productStyles from '../sections/ProductHero/ProductHero.module.css'
import { Header } from './Header'
import { Footer } from './Footer'
import { Skeleton, SkeletonText } from '../ui/Skeleton'
import styles from './RoutePending.module.css'

function CompetenciesSkeleton() {
  return (
    <>
      <div className={`container ${styles.competenciesIntro}`}>
        <SkeletonText className={styles.centerTitle} lines={2} />
        <SkeletonText className={styles.centerDescription} lines={2} />
        <div className={styles.anchors}>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
      <div className={styles.qualifications}>
        <Skeleton className={styles.sectionTitle} />
        {[0, 1, 2].map((item) => (
          <div className={styles.qualification} key={item}>
            <div className={`container ${styles.qualificationInner}`}>
              <div className={styles.credential}>
                <Skeleton className={styles.icon} />
                <div className={styles.credentialCopy}>
                  <Skeleton className={styles.subtitle} />
                  <Skeleton className={styles.label} />
                  <SkeletonText lines={5} />
                </div>
              </div>
              <div className={styles.documents}>
                {[0, 1].map((document) => (
                  <div key={document}>
                    <Skeleton className={styles.document} />
                    <Skeleton className={styles.caption} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function WorksSkeleton() {
  return (
    <>
      <div className={styles.worksHero}>
        <div className={`container ${styles.worksHeroInner}`}>
          <div className={styles.worksCopy}>
            <Skeleton className={styles.worksTitle} />
            <SkeletonText className={styles.worksDescription} lines={3} />
          </div>
        </div>
      </div>
      <div className={`container ${styles.worksFilters}`}>
        <div className={styles.filterGrid}>
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Skeleton className={styles.filterImage} key={item} />
          ))}
        </div>
        <Skeleton className={styles.worksGalleryTitle} />
        <div className={styles.worksGrid}>
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Skeleton className={styles.worksPhoto} key={item} />
          ))}
        </div>
      </div>
    </>
  )
}

function ArticleSkeleton() {
  return (
    <div className={styles.article}>
      <Skeleton className={styles.articleTitle} />
      <SkeletonText lines={2} />
      <Skeleton className={styles.caption} />
      {[0, 1, 2, 3].map((item) => (
        <div className={styles.articleSection} key={item}>
          <Skeleton className={styles.subtitle} />
          <SkeletonText lines={5} />
        </div>
      ))}
    </div>
  )
}

function ProductSkeleton() {
  return (
    <div className={productStyles.hero}>
      <div className={`${productStyles.image} ${styles.productPhoto}`}>
        <Skeleton className={productStyles.imageSkeleton} />
      </div>
      <div className={`${productStyles.copy} ${styles.productCopy}`}>
        <Skeleton className={styles.label} />
        <SkeletonText className={styles.productTitle} lines={2} />
        <SkeletonText className={styles.productDescription} lines={3} />
        <Skeleton className={styles.productAction} />
      </div>
    </div>
  )
}

export function RoutePending() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'
  const kind: RouteSkeletonKind =
    path === competenciesPage.path
      ? 'competencies'
      : path === worksPage.path
        ? 'works'
        : deferredProductPages.has(path)
          ? 'product'
          : 'article'
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [path])
  return (
    <div className={styles.page} data-route-skeleton={kind}>
      <Header />
      <main className={styles.main} aria-busy="true" aria-label="Preparazione dei contenuti">
        <span className="sr-only" role="status">
          Preparazione dei contenuti della pagina.
        </span>
        <div aria-hidden="true">
          {kind === 'competencies' ? (
            <CompetenciesSkeleton />
          ) : kind === 'works' ? (
            <WorksSkeleton />
          ) : kind === 'product' ? (
            <ProductSkeleton />
          ) : (
            <ArticleSkeleton />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
