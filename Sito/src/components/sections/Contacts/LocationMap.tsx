import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { contacts } from '../../../config/contacts'
import { Icon } from '../../ui/Icon'
import styles from './Contacts.module.css'

const InteractiveMap = lazy(() => import('./InteractiveMap'))

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
    <figure className={styles.mapBlock}>
      <div className={styles.mapCanvas} ref={ref}>
        {visible && (
          <Suspense fallback={<span className={styles.mapLoading}>Caricamento mappa…</span>}>
            <InteractiveMap />
          </Suspense>
        )}
      </div>
      <figcaption className={styles.mapCaption}>
        <div className={styles.mapLocation}>
          <span className={styles.mapPin}>
            <Icon name="pin" />
          </span>
          <span>
            <strong>LGE Home Solutions</strong>
            <small>
              {contacts.address} · {contacts.locality}
            </small>
          </span>
        </div>
        <a href={contacts.mapUrl} target="_blank" rel="noopener noreferrer">
          Come raggiungerci <Icon name="external" />
        </a>
      </figcaption>
    </figure>
  )
}
