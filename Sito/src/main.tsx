import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import { Site } from './Site'
import { getRoutePage } from './utils/informationRoutes'
import './styles/global.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element is missing')
const site = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Site />
    </BrowserRouter>
  </StrictMode>
)

const renderedPath = root.dataset.renderedPath
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const { pathname, search, hash } = window.location
const path = pathname.slice(base.length) || '/'
const directory = path.replace(/(?:\/index\.html|\/+)?$/, '/')
if (renderedPath && (renderedPath === path || renderedPath === directory)) {
  // Directory aliases serve the same HTML. Match its router location before hydration.
  if (renderedPath !== path) {
    history.replaceState(history.state, '', `${base}${renderedPath}${search}${hash}`)
  }
  // Keep the static content visible while the matching route chunk becomes interactive.
  const pending = getRoutePage(renderedPath)?.prepare()
  const hydrate = () => hydrateRoot(root, site)
  if (pending) void pending.then(hydrate, hydrate)
  else hydrate()
} else {
  // Vite development and static-host fallback documents may have no matching prerender.
  createRoot(root).render(site)
}
