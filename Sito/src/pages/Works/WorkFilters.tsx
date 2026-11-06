import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { workCategories } from '../../data/works'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { Skeleton } from '../../components/ui/Skeleton'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { getWorkCategoryPath } from '../../utils/works'
import type { WorkFilterPhotoProps, WorkFiltersProps } from '../../types/works'
import styles from './Works.module.css'

function FilterPhoto({ photo }: WorkFilterPhotoProps) {
  const [settled, setSettled] = useState(false)
  return (
    <span className={styles.filterPhoto} data-photo={photo}>
      <ResponsiveImage
        photo={photo}
        collection="hero"
        decorative
        sizes="(min-width: 900px) 200px, 130px"
        onSettled={() => setSettled(true)}
      />
      {!settled && <Skeleton className={styles.imageSkeleton} />}
    </span>
  )
}

export function WorkFilters({ selected }: WorkFiltersProps) {
  const { hash } = useLocation()
  const ref = useSectionReveal({ duration: 1.15, stagger: 0.08 })
  const stripRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const strip = stripRef.current
    const active = strip?.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
    if (!strip || !active || strip.scrollWidth <= strip.clientWidth) return
    const bounds = strip.getBoundingClientRect()
    const item = active.getBoundingClientRect()
    const offset =
      item.left < bounds.left
        ? item.left - bounds.left - 4
        : item.right > bounds.right
          ? item.right - bounds.right + 4
          : 0
    if (offset) strip.scrollBy({ left: offset })
  }, [selected])
  return (
    <nav
      className={styles.filters}
      id="esplora-lavori"
      aria-label="Filtra i lavori per categoria"
      ref={ref}
    >
      <div className="container">
        <div className={styles.filterInner} ref={stripRef}>
          <Link
            to={`${getWorkCategoryPath('tutti')}${hash}`}
            preventScrollReset
            aria-current={selected === 'tutti' ? 'page' : undefined}
            aria-controls="works-content"
            className={styles.filterLink}
            data-reveal
          >
            <span className={styles.filterMosaic} aria-hidden="true">
              {workCategories.slice(0, 4).map((category) => (
                <FilterPhoto key={category.id} photo={category.cover} />
              ))}
            </span>
            <span className={styles.filterLabel}>Tutti i lavori</span>
          </Link>
          {workCategories.map((category) => (
            <Link
              key={category.id}
              to={`${getWorkCategoryPath(category.id)}${hash}`}
              preventScrollReset
              aria-current={selected === category.id ? 'page' : undefined}
              aria-controls="works-content"
              className={styles.filterLink}
              data-reveal
            >
              <FilterPhoto photo={category.cover} />
              <span className={styles.filterLabel}>{category.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
