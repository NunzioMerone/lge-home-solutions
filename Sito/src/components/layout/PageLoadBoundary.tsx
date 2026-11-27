import { Component } from 'react'
import { PageLink } from '../ui/PageLink'
import type { PageLoadBoundaryProps, PageLoadBoundaryState } from '../../types/navigation'
import styles from './RouteStatus.module.css'

export class PageLoadBoundary extends Component<PageLoadBoundaryProps, PageLoadBoundaryState> {
  state: PageLoadBoundaryState = { failed: false }

  static getDerivedStateFromError(): PageLoadBoundaryState {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className={styles.status}>
        <h1>La pagina non è stata caricata.</h1>
        <p>Controlla la connessione e riprova.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Riprova
        </button>
        <PageLink to="/#inizio">Torna alla homepage</PageLink>
      </main>
    )
  }
}
