import { PageLink } from '../../components/ui/PageLink'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ProjectClosing } from '../../components/sections/Gallery/ProjectClosing'
import { ProductFaq } from '../../components/sections/ProductFaq/ProductFaq'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { worksPage } from '../../config/works'
import { featuredWorkPhotos } from '../../data/homeGallery'
import { windowCollection } from '../../data/infissi'
import { productFaqId, windowFaq } from '../../data/productFaqs'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { WindowCollection } from './WindowCollection'
import styles from './ProductDetail.module.css'

export function ProductDetail({ product }: ProductDetailProps) {
  const configurator = useSectionReveal()
  useAnchorNavigation(windowCollection.id, windowCollection.configuratorId, productFaqId)

  return (
    <div className={styles.page}>
      <PageLink className="skip-link" to={`#${windowCollection.id}`}>
        Vai ai modelli e ai cataloghi COSMET
      </PageLink>
      <Header />
      <main aria-labelledby="product-title" data-product-page>
        <ProductHero
          product={product}
          eyebrow="INFISSI"
          title={
            <>
              Infissi per
              <br />
              <em>abitare meglio.</em>
            </>
          }
          description="Infissi in legno alluminio, alluminio e PVC. Battente o scorrevole? Scegli con noi l’apertura giusta per i tuoi spazi."
        >
          <div className={styles.actions}>
            <PageLink className={styles.button} to={`#${windowCollection.configuratorId}`}>
              Configura il tuo infisso <Icon name="down" />
            </PageLink>
          </div>
        </ProductHero>

        <WindowCollection />

        <section
          className={`section ${styles.configure}`}
          id={windowCollection.configuratorId}
          aria-labelledby="window-configurator-title"
          tabIndex={-1}
          ref={configurator}
        >
          <div className="container">
            <div className={styles.configuratorCard} data-reveal>
              <figure className={styles.configuratorImage}>
                <img
                  src={assetUrl('img/infissi/vista-metal-esterno-1600.webp')}
                  srcSet={`${assetUrl('img/infissi/vista-metal-esterno-800.webp')} 800w, ${assetUrl('img/infissi/vista-metal-esterno-1600.webp')} 1600w`}
                  sizes="(min-width: 1660px) 1500px, 91vw"
                  width="1600"
                  height="404"
                  loading="lazy"
                  decoding="async"
                  alt="Portefinestre Vista Metal affacciate sulla terrazza di una casa contemporanea"
                />
                <figcaption>COSMET · Vista Metal</figcaption>
              </figure>
              <div className={styles.configuratorContent}>
                <header>
                  <p className="eyebrow">Configuratore ufficiale COSMET</p>
                  <h2 id="window-configurator-title">
                    Dai forma alla <em>tua finestra.</em>
                  </h2>
                </header>
                <div>
                  <p className={styles.body}>
                    Parti dalle esigenze di casa e segui i passaggi per esplorare i modelli, i
                    colori e le finiture disponibili.
                  </p>
                  <div className={styles.actions}>
                    <a
                      className={styles.button}
                      href={windowCollection.guidedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apri il configuratore <Icon name="external" />
                      <span className="sr-only"> COSMET (nuova scheda)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductFaq {...windowFaq} />

        <ProjectClosing
          titleId="window-showroom-title"
          photo={featuredWorkPhotos.cornerWindows}
          showroom={{
            worksPath: `${worksPage.path}?categoria=infissi#works-content`,
            worksLabel: 'Vedi altri lavori',
          }}
          title={
            <>
              La scelta giusta si vede <em>da vicino.</em>
            </>
          }
          description="Ogni casa ha il suo stile e le sue esigenze. Ti aspettiamo in showroom per scoprire insieme materiali, profili e finiture, confrontare le diverse soluzioni e trovare quella che meglio si adatta ai tuoi spazi."
        />
      </main>
      <Footer />
    </div>
  )
}
