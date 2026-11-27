import { PageLink } from '../../components/ui/PageLink'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ProjectClosing } from '../../components/sections/Gallery/ProjectClosing'
import { ProductFaq } from '../../components/sections/ProductFaq/ProductFaq'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { worksPage } from '../../config/works'
import { featuredWorkPhotos } from '../../data/homeGallery'
import { ipeaCatalogs } from '../../data/interiorDoors'
import { interiorDoorFaq, productFaqId } from '../../data/productFaqs'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { InteriorDoorOpenings } from './InteriorDoorOpenings'
import styles from './InteriorDoors.module.css'

const catalogsId = 'cataloghi-porte-interne'
export function InteriorDoors({ product }: ProductDetailProps) {
  const catalogs = useSectionReveal()
  useAnchorNavigation(catalogsId, productFaqId)

  return (
    <div className={styles.page}>
      <PageLink className="skip-link" to={`#${catalogsId}`}>
        Vai ai cataloghi I-PEA
      </PageLink>
      <Header />
      <main aria-labelledby="product-title" data-product-page>
        <ProductHero
          product={product}
          eyebrow="PORTE INTERNE"
          title={
            <>
              Porte interne,
              <br />
              <em>stanza per stanza.</em>
            </>
          }
          description="Dal soggiorno alla zona notte, ogni stanza ha esigenze diverse. Ti aiutiamo a scegliere finitura e apertura in base alla luce, alla privacy e allo spazio che hai a disposizione."
        >
          <PageLink className={styles.button} to={`#${catalogsId}`}>
            Scopri di più <Icon name="down" />
          </PageLink>
        </ProductHero>

        <section
          className={`section ${styles.catalogs}`}
          id={catalogsId}
          aria-labelledby="interior-catalogs-title"
          tabIndex={-1}
          ref={catalogs}
        >
          <div className="container">
            <header className={styles.catalogHeader} data-reveal>
              <p className="eyebrow">CATALOGHI I-PEA</p>
              <h2 id="interior-catalogs-title">
                La finitura fa <em>la differenza.</em>
              </h2>
              <p className={styles.body}>
                Sfoglia i cataloghi e guarda come cambiano le porte con la luce, i colori e i
                materiali che le circondano.
              </p>
            </header>
            <ul className={styles.catalogGrid} role="list">
              {ipeaCatalogs.map((catalog) => (
                <li className={styles.catalog} key={catalog.id} data-reveal>
                  <div className={styles.material} data-material={catalog.id} aria-hidden="true" />
                  <h3>{catalog.title}</h3>
                  <p>{catalog.detail}</p>
                  <a
                    className={styles.inlineLink}
                    data-analytics-catalog
                    href={catalog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sfoglia il catalogo <Icon name="external" />
                    <span className="sr-only"> {catalog.title} di I-PEA (nuova scheda)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <InteriorDoorOpenings />

        <ProductFaq {...interiorDoorFaq} />

        <ProjectClosing
          titleId="interior-showroom-title"
          photo={featuredWorkPhotos.flushDoor}
          showroom={{
            worksPath: `${worksPage.path}?categoria=porte-interne#works-content`,
            worksLabel: 'Vedi altri lavori',
          }}
          title={
            <>
              Scegliamola <em>insieme.</em>
            </>
          }
          description="Portaci una foto della stanza o raccontaci come la vivi. Possiamo confrontare finiture e aperture e fissare un appuntamento in showroom."
        />
      </main>
      <Footer />
    </div>
  )
}
