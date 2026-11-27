import { PageLink } from '../../components/ui/PageLink'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ProjectClosing } from '../../components/sections/Gallery/ProjectClosing'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { worksPage } from '../../config/works'
import { homeGallery } from '../../data/homeGallery'
import { shutterCatalogs } from '../../data/shutters'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { ShutterShowcase } from './ShutterShowcase'
import styles from './Shutters.module.css'

const solutionsId = 'soluzioni-oscuranti'
const catalogsId = 'cataloghi-oscuranti'
const featuredWork = homeGallery.find((photo) => photo.id === 'home-oscuranti-mare')

export function Shutters({ product }: ProductDetailProps) {
  const solutions = useSectionReveal()
  const catalogs = useSectionReveal()
  useAnchorNavigation(solutionsId, catalogsId)

  return (
    <div className={styles.page}>
      <PageLink className="skip-link" to={`#${solutionsId}`}>
        Vai alle soluzioni oscuranti
      </PageLink>
      <Header />
      <main aria-labelledby="product-title" data-product-page>
        <ProductHero
          product={product}
          eyebrow="OSCURANTI"
          title={
            <>
              La luce,
              <br />
              <em>come vuoi tu.</em>
            </>
          }
          description="La luce giusta cambia il modo di vivere ogni ambiente. Con gli oscuranti puoi regolare la luminosità, e ottenere contemporaneamente privacy e sicurezza, creando il comfort ideale per la tua casa."
        >
          <div className={styles.actions}>
            <PageLink className={styles.button} to={`#${solutionsId}`}>
              Scopri di più <Icon name="down" />
            </PageLink>
          </div>
        </ProductHero>

        <section
          id={solutionsId}
          className={`section ${styles.showcase}`}
          aria-labelledby="shutters-solutions-title"
          ref={solutions}
          tabIndex={-1}
        >
          <div className="container">
            <header className={styles.sectionHeader} data-reveal>
              <h2 id="shutters-solutions-title">
                Ogni apertura ha <em>la sua luce.</em>
              </h2>
              <p className={styles.sectionIntro}>
                Scegli tra avvolgibili e persiane a battente. Esplora cassonetti e motori per gli
                avvolgibili, oppure confronta alluminio e acciaio per le persiane.
              </p>
            </header>
            <ShutterShowcase />
          </div>
        </section>

        <section
          id={catalogsId}
          className={`section ${styles.catalogs}`}
          aria-labelledby="shutters-catalogs-title"
          ref={catalogs}
          tabIndex={-1}
        >
          <div className={`container ${styles.catalogLayout}`}>
            <header data-reveal>
              <p className="eyebrow">CATALOGHI OSCURANTI</p>
              <h2 id="shutters-catalogs-title">
                Sfoglia. Confronta. <em>Scegli.</em>
              </h2>
              <p className={styles.body}>
                Consulta i cataloghi dei produttori per confrontare avvolgibili, persiane e
                finiture.
              </p>
            </header>

            <ul className={styles.catalogList} role="list">
              {shutterCatalogs.map((catalog) => (
                <li key={catalog.id} data-reveal>
                  <a
                    data-analytics-catalog
                    href={catalog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.catalogArt} data-cover={catalog.id} aria-hidden="true">
                      <Icon name={catalog.id === 'security' ? 'shield' : 'screen'} />
                    </span>
                    <span className={styles.catalogCopy}>
                      <span className={styles.catalogTitle}>{catalog.title}</span>
                      <span className={styles.catalogDetail}>{catalog.detail}</span>
                    </span>
                    <span className={styles.catalogFormat}>
                      PDF <Icon name="external" />
                    </span>
                    <span className="sr-only"> (nuova scheda)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProjectClosing
          titleId="shutters-showroom-title"
          photo={featuredWork}
          showroom={{
            worksPath: `${worksPage.path}?categoria=oscuranti#works-content`,
            worksLabel: 'Vedi i nostri lavori',
          }}
          title={
            <>
              Partiamo dalla <em>tua finestra.</em>
            </>
          }
          description="Mandaci una foto e, se le hai, le misure del vano. Vediamo insieme quale schermatura si adatta alla tua casa e cosa va verificato prima della posa."
        />
      </main>
      <Footer />
    </div>
  )
}
