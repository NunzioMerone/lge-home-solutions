import { useLayoutEffect, useRef, useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { distributeWorkPhotos } from '../../utils/works'
import type { WorkGalleryProps } from '../../types/works'
import { WorkPhoto } from './WorkPhoto'
import styles from './Works.module.css'

const batchSize = 18

export function WorkGallery({ photos, title, onOpen }: WorkGalleryProps) {
  const [limit, setLimit] = useState(batchSize)
  const ref = useSectionReveal({ duration: 1.2, stagger: 0.1, rootMargin: '0px 0px -6% 0px' })
  const gridRef = useRef<HTMLDivElement>(null)
  const focusId = useRef<string | null>(null)
  const desktop = useMediaQuery('(min-width: 1000px)')
  const tablet = useMediaQuery('(min-width: 600px)')
  const visiblePhotos = photos.slice(0, limit)
  const columnCount = desktop ? 3 : tablet ? 2 : 1
  const columns = distributeWorkPhotos(visiblePhotos, columnCount)

  useLayoutEffect(() => {
    if (!focusId.current) return
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-photo-id="${focusId.current}"]`)
      ?.focus({ preventScroll: true })
    focusId.current = null
  }, [limit])

  return (
    <section aria-labelledby="work-gallery-title" ref={ref}>
      <div className={styles.photoGrid} data-columns={columnCount} ref={gridRef} data-reveal>
        {columns.map((items, column) => (
          <div className={styles.photoColumn} key={column}>
            {items.map((photo) => (
              <WorkPhoto key={photo.id} photo={photo} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {title}: {visiblePhotos.length} di {photos.length} fotografie mostrate.
      </p>
      {visiblePhotos.length < photos.length && (
        <div className={styles.collectionBottom}>
          <button
            className={styles.loadMore}
            type="button"
            onClick={() => {
              focusId.current = photos[visiblePhotos.length]?.id ?? null
              setLimit((current) => current + batchSize)
            }}
          >
            Altre fotografie <Icon name="down" />
          </button>
        </div>
      )}
    </section>
  )
}
