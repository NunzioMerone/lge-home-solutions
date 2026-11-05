import styles from './RouteStatus.module.css'

export function RoutePending() {
  return (
    <div className={styles.status} role="status">
      Caricamento della pagina…
    </div>
  )
}
