import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { Site } from './Site'
import { getRoutePage } from './utils/informationRoutes'
import { gallery } from './data/gallery'

export { renderSeoHead } from './utils/siteSeo'
export { getSeoFiles, seoPaths } from './utils/seoFiles'

export const base = import.meta.env.BASE_URL
export const gallerySize = gallery.length
export async function renderPage(path: string) {
  const pathname = path === '/' || path === '/404.html' ? path : `${path}/`
  const location = `${base.replace(/\/$/, '')}${pathname}`
  const page = getRoutePage(path)
  await page?.prepare()
  const errors: unknown[] = []
  const { prelude } = await prerender(
    <StaticRouter basename={base} location={location}>
      <Site />
    </StaticRouter>,
    {
      onError: (error) => {
        errors.push(error)
      },
    },
  )
  const html = await new Response(prelude).text()
  if (errors.length) throw new AggregateError(errors, `Prerender failed for ${path}`)
  return { pathname, html, moduleId: page?.moduleId }
}
