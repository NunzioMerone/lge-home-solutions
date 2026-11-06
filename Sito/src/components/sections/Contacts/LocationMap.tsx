import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Skeleton } from '../../ui/Skeleton'
import styles from './Contacts.module.css'

const InteractiveMap = lazy(() => import('./InteractiveMap'))

function MapSkeleton() {
  return (
    <div className={styles.mapLoading} role="status" aria-label="Preparazione della mappa">
      <Skeleton className={styles.mapRoad} />
      <Skeleton className={styles.mapRoadAcross} />
      <Skeleton className={styles.mapPin} />
    </div>
  )
}

export function LocationMap() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setVisible(true)
        observer.disconnect()
      },
      { rootMargin: '200px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return (
    <div className={styles.mapBlock}>
      <div className={styles.mapCanvas} ref={ref}>
        {visible ? (
          <Suspense fallback={<MapSkeleton />}>
            <InteractiveMap />
          </Suspense>
        ) : (
          <MapSkeleton />
        )}
      </div>
    </div>
  )
}
