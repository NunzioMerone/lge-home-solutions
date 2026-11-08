import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ShowroomClosing } from '../../components/sections/Gallery/ShowroomClosing'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { contacts } from '../../config/contacts'
import { worksPage } from '../../config/works'
import { homeGallery } from '../../data/homeGallery'
import { windowCollection } from '../../data/infissi'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import { WindowCollection } from './WindowCollection'
import styles from './ProductDetail.module.css'

const featuredWork = homeGallery.find((photo) => photo.id === 'home-vetrate-angolo')
const { whatsapp } = getContactLinks(contacts)

export function ProductDetail({ product }: ProductDetailProps) {
  const configurator = useSectionReveal()
  const { hash, key } = useLocation()

  useEffect(() => {
    const sectionId = hash.slice(1)
    if (sectionId !== windowCollection.id && sectionId !== windowCollection.configuratorId) return

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(sectionId)
      target?.focus({ preventScroll: true })
      target?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, key])

  return (
    <div className={styles.page}>
      <Link className="skip-link" to={`#${windowCollection.id}`}>
        Vai ai modelli e ai cataloghi COSMET
      </Link>
      <Header />
      <main aria-labelledby="product-title">
        <ProductHero
          product={product}
          eyebrow="LGE HOME SOLUTIONS · COSMET"
          title={
            <>
              Infissi per
              <br />
              <em>abitare meglio.</em>
            </>
          }
          description="Finestre e scorrevoli COSMET, da scegliere insieme in base alla luce, agli spazi e al modo in cui vivi la tua casa."
        >
          <div className={styles.actions}>
            <Link className={styles.button} to={`#${windowCollection.configuratorId}`}>
              Configura il tuo infisso <Icon name="down" />
            </Link>
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
                    Esplora i modelli e prova colori, finiture e opzioni disponibili nel
                    configuratore. Se vuoi partire dalle esigenze di casa, scegli il percorso
                    guidato.
                  </p>
                  <div className={styles.actions}>
                    <a
                      className={styles.button}
                      href={windowCollection.configuratorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apri il configuratore <Icon name="external" />
                      <span className="sr-only"> COSMET (nuova scheda)</span>
                    </a>
                    <a
                      className={styles.inlineLink}
                      href={windowCollection.guidedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Percorso guidato <Icon name="external" />
                      <span className="sr-only"> COSMET (nuova scheda)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShowroomClosing
          titleId="window-showroom-title"
          photo={featuredWork}
          worksPath={`${worksPage.path}?categoria=infissi#works-content`}
          worksLabel="Vedi altri lavori"
        >
          <p className="eyebrow">Showroom di Monte di Procida</p>
          <h2 id="window-showroom-title">
            Guardiamoli <em>dal vivo.</em>
          </h2>
          <p className={styles.body}>
            Portaci una foto del vano o la configurazione che ti piace. In showroom possiamo
            confrontare i profili, vedere le finiture alla luce naturale e parlare della posa.
          </p>
          <div className={styles.actions}>
            {whatsapp && (
              <a
                className={styles.button}
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrivici su WhatsApp (nuova scheda)"
              >
                <Icon name="whatsapp" /> Scrivici
              </a>
            )}
            <a
              className={styles.inlineLink}
              href={contacts.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Indicazioni <Icon name="external" />
              <span className="sr-only"> (nuova scheda)</span>
            </a>
          </div>
        </ShowroomClosing>
      </main>
      <Footer />
    </div>
  )
}
