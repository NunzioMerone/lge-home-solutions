import { renderToStaticMarkup } from 'react-dom/server'
import { Route, Routes, StaticRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PageLink } from './PageLink'

describe('public page links', () => {
  it.each(['/', '/lge-home-solutions/'])('uses directory URLs below %s', (base) => {
    const html = renderToStaticMarkup(
      <StaticRouter basename={base} location={`${base}blog/articolo`}>
        <Routes>
          <Route
            path="/blog/:slug"
            element={
              <>
                <PageLink to="/prodotti/infissi">Infissi</PageLink>
                <PageLink to="/lavori/?categoria=infissi#works-content">Lavori</PageLink>
                <PageLink to="#paragrafo">Sezione</PageLink>
                <PageLink to="/#contatti">Contatti</PageLink>
              </>
            }
          />
        </Routes>
      </StaticRouter>,
    )
    expect(html).toContain(`href="${base}prodotti/infissi/"`)
    expect(html).toContain(`href="${base}lavori/?categoria=infissi#works-content"`)
    expect(html).toContain(`href="${base}blog/articolo/#paragrafo"`)
    expect(html).toContain(`href="${base}#contatti"`)
  })
})
