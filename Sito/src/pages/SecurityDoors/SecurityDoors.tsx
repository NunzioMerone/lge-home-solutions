import { PageLink } from '../../components/ui/PageLink'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ProjectClosing } from '../../components/sections/Gallery/ProjectClosing'
import { ProductFaq } from '../../components/sections/ProductFaq/ProductFaq'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { worksPage } from '../../config/works'
import { featuredWorkPhotos } from '../../data/homeGallery'
import { securityDoorChecks } from '../../data/securityDoors'
import { entranceDoorFaq, productFaqId } from '../../data/productFaqs'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { DoorCatalogs } from './DoorCatalogs'
import { DoorDesignStudio } from './DoorDesignStudio'
import styles from './SecurityDoors.module.css'

const studioId = 'configuratore-tehni'
const catalogsId = 'cataloghi-tehni'
export function SecurityDoors({ product }: ProductDetailProps) {
  const studio = useSectionReveal()
  const catalogs = useSectionReveal()
  useAnchorNavigation(studioId, catalogsId, productFaqId)

  return (
    <div className={styles.page}>
      <PageLink className="skip-link" to={`#${studioId}`}>
        Vai alla scelta delle porte d’ingresso
      </PageLink>
      <Header />
      <main aria-labelledby="product-title" data-product-page>
        <ProductHero
          product={product}
          eyebrow="PORTE D’INGRESSO"
          title={
            <>
              L’ingresso
              <br />
              <em>ha carattere.</em>
            </>
          }
          description={[
            'La porta d’ingresso è il biglietto da visita della tua casa: il primo elemento che ne racconta lo stile, esprime la tua personalità e accoglie chi arriva.',
            'Scopri soluzioni che uniscono design, sicurezza e carattere, con materiali e finiture.',
          ]}
        >
          <div className={styles.actions}>
            <PageLink className={styles.button} to={`#${studioId}`}>
              Scopri di più <Icon name="down" />
            </PageLink>
          </div>
        </ProductHero>

        <section
          id={studioId}
          className={`section ${styles.designSection}`}
          aria-labelledby="tehni-studio-title"
          tabIndex={-1}
          ref={studio}
        >
          <div className="container">
            <header className={styles.sectionHeader} data-reveal>
              <div>
                <h2 id="tehni-studio-title">
                  Disegna <em>il tuo ingresso.</em>
                </h2>
              </div>
              <p className={styles.body}>
                Scegli l’alluminio a taglio termico se cerchi il massimo isolamento termico, oppure
                il blindato in acciaio se la tua priorità è la sicurezza. Sfoglia i cataloghi per
                confrontare modelli, finiture e accessori.
              </p>
            </header>
            <DoorDesignStudio />
          </div>
        </section>

        <section
          id={catalogsId}
          className={`section ${styles.catalogSection}`}
          aria-labelledby="tehni-catalogs-title"
          tabIndex={-1}
          ref={catalogs}
        >
          <div className="container">
            <header className={styles.guideHeader} data-reveal>
              <h2 id="tehni-catalogs-title">
                Cosa conta <em>oltre la finitura.</em>
              </h2>
              <p>
                Sfoglia i modelli e scopri quali dettagli valutare per il tuo ingresso, dalla
                serratura al sistema di apertura.
              </p>
            </header>
            <div className={styles.guide}>
              <div className={styles.checks} data-reveal>
                <h3>Prima di scegliere</h3>
                <ul className={styles.checkList} role="list">
                  {securityDoorChecks.map(({ icon, title, detail }) => (
                    <li key={title}>
                      <Icon name={icon} />
                      <div>
                        <h4>{title}</h4>
                        <p className={styles.body}>{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <DoorCatalogs />
            </div>
          </div>
        </section>

        <ProductFaq {...entranceDoorFaq} />

        <ProjectClosing
          titleId="security-showroom-title"
          photo={featuredWorkPhotos.greyEntrance}
          showroom={{
            worksPath: `${worksPage.path}?categoria=porte-e-sicurezza#works-content`,
            worksLabel: 'Vedi le realizzazioni LGE',
          }}
          title={
            <>
              Una porta <em>pensata per casa tua.</em>
            </>
          }
          description="Mostraci la tua configurazione o una foto dell’ingresso. Ti aiutiamo a confrontare finiture, aperture e requisiti di sicurezza prima del rilievo."
        />
      </main>
      <Footer />
    </div>
  )
}
