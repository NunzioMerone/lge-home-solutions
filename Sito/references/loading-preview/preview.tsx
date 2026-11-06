import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import { MotionProvider } from '../../src/components/ui/MotionProvider'
import { RoutePending } from '../../src/components/layout/RoutePending'
import '../../src/styles/global.css'
import './preview.css'
import { TransitionCopyPreview } from './TransitionCopyPreview'

const pages = [
  { label: 'Competenze', path: '/competenze' },
  { label: 'Lavori', path: '/lavori' },
  { label: 'Privacy', path: '/privacy-policy' },
  { label: 'Transizioni', path: '/transition-copy' },
] as const

function LoadingPreview() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <>
      {pathname === '/transition-copy' ? <TransitionCopyPreview /> : <RoutePending />}
      <nav className="preview-controls" aria-label="Anteprima locale degli skeleton">
        <span>Anteprima skeleton · solo locale</span>
        <div>
          {pages.map((page) => (
            <button
              key={page.path}
              type="button"
              aria-pressed={pathname === page.path}
              onClick={() => navigate(page.path)}
            >
              {page.label}
            </button>
          ))}
        </div>
        <a href="/#inizio">Torna al sito</a>
      </nav>
    </>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('Preview root is missing')
createRoot(root).render(
  <StrictMode>
    <MemoryRouter initialEntries={['/competenze']}>
      <MotionProvider>
        <LoadingPreview />
      </MotionProvider>
    </MemoryRouter>
  </StrictMode>,
)
