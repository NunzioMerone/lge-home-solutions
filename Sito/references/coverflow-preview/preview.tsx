import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GalleryLightbox } from '../../src/components/sections/Gallery/GalleryLightbox'
import { MotionProvider } from '../../src/components/ui/MotionProvider'
import { homeGallery } from '../../src/data/homeGallery'
import { useMotion } from '../../src/hooks/useMotion'
import { useInputModality } from '../../src/hooks/useInputModality'
import type { GalleryLightboxState } from '../../src/types/gallery'
import '@fontsource-variable/dm-sans/wght.css'
import '../../src/styles/global.css'
import './preview.css'

function CoverflowPreview() {
  useInputModality()
  const { userReducedMotion, toggleMotion } = useMotion()
  const [count, setCount] = useState(homeGallery.length)
  const [last, setLast] = useState(false)
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)
  const photos = homeGallery.slice(0, count)
  const photo = last ? photos.at(-1) : photos[0]

  return (
    <main className="coverflow-preview">
      <h1>Verifica del visualizzatore Coverflow</h1>
      <p>Componente reale in Strict Mode. Questa pagina resta solo nell’anteprima locale.</p>
      <label>
        Raccolta
        <select value={count} onChange={(event) => setCount(Number(event.target.value))}>
          <option value={homeGallery.length}>Selezione home · 11 fotografie</option>
          <option value={2}>Due fotografie</option>
          <option value={1}>Una fotografia</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={last} onChange={(event) => setLast(event.target.checked)} />
        Apri l’ultima fotografia
      </label>
      <label>
        <input type="checkbox" checked={userReducedMotion} onChange={toggleMotion} />
        Movimento ridotto
      </label>
      <button
        type="button"
        disabled={!photo}
        onClick={(event) => {
          if (photo) setLightbox({ photo, trigger: event.currentTarget })
        }}
      >
        Apri fotografia
      </button>
      {lightbox && (
        <GalleryLightbox {...lightbox} photos={photos} onClose={() => setLightbox(null)} />
      )}
    </main>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('Preview root is missing')
createRoot(root).render(
  <StrictMode>
    <MotionProvider>
      <CoverflowPreview />
    </MotionProvider>
  </StrictMode>,
)
