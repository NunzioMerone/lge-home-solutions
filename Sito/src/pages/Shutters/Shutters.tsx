import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { GalleryImage } from '../../components/sections/Gallery/GalleryImage'
import { GalleryLightbox } from '../../components/sections/Gallery/GalleryLightbox'
import { ShowroomClosing } from '../../components/sections/Gallery/ShowroomClosing'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { contacts } from '../../config/contacts'
import { worksPage } from '../../config/works'
import { homeGallery } from '../../data/homeGallery'
import { shutterCatalogs, shutterSolutions } from '../../data/shutters'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { GalleryLightboxState } from '../../types/gallery'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import styles from './Shutters.module.css'

const solutionsId = 'soluzioni-oscuranti'
const catalogsId = 'cataloghi-oscuranti'
const photos = shutterSolutions.map(({ photo }) => photo)
const featuredWork = homeGallery.find((photo) => photo.id === 'home-oscuranti-mare')
const { whatsapp } = getContactLinks(contacts)

export function Shutters({ product }: ProductDetailProps) {
  const solutions = useSectionReveal()
  const catalogs = useSectionReveal()
  const { hash, key } = useLocation()
  const [selected, setSelected] = useState<(typeof shutterSolutions)[number]>(shutterSolutions[0])
  const [lightbox, setLightbox] = useState<GalleryLightboxState | null>(null)

  useEffect(() => {
    const section =
      hash === `#${solutionsId}`
        ? solutions.current
        : hash === `#${catalogsId}`
          ? catalogs.current
          : null
    if (!section) return
    const frame = requestAnimationFrame(() => {
      section.focus({ preventScroll: true })
      section.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [catalogs, hash, key, solutions])

  return (
    <div className={styles.page}>
      <Link className="skip-link" to={`#${solutionsId}`}>
        Vai alle soluzioni oscuranti
      </Link>
      <Header />
      <main aria-labelledby="product-title">
        <ProductHero
          product={product}
          eyebrow="OSCURANTI · SIKUR HOME"
          title={
            <>
              La luce,
              <br />
              <em>come vuoi tu.</em>
            </>
          }
          description="Il sole del mattino, l’ombra nelle ore più calde, la privacy la sera. Con gli avvolgibili e i frangisole Sikur Home scegli come cambia la luce negli ambienti."
        >
          <div className={styles.actions}>
            <Link className={styles.button} to={`#${solutionsId}`}>
              Scopri le soluzioni <Icon name="down" />
            </Link>
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
              <p className="eyebrow">SCHERMATURE SIKUR HOME</p>
              <h2 id="shutters-solutions-title">
                Ogni apertura ha <em>la sua luce.</em>
              </h2>
              <p className={styles.sectionIntro}>
                Vuoi conservare il cassonetto, schermare una grande vetrata o avere più protezione?
                Parti da quello che ti serve per vedere la soluzione adatta.
              </p>
            </header>

            <div className={styles.studio} data-reveal>
              <div className={styles.controls} role="group" aria-label="Scegli la tua esigenza">
                {shutterSolutions.map((solution, index) => (
                  <button
                    key={solution.id}
                    type="button"
                    aria-pressed={selected.id === solution.id}
                    aria-controls="shutters-product"
                    onClick={() => setSelected(solution)}
                  >
                    <span className={styles.index} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span>{solution.need}</span>
                    <Icon name="arrow" />
                  </button>
                ))}
              </div>

              <div className={styles.product} id="shutters-product">
                <figure className={styles.media}>
                  <button
                    type="button"
                    className={styles.photoButton}
                    aria-label={`Ingrandisci foto: ${selected.photo.alt}`}
                    aria-haspopup="dialog"
                    onClick={(event) =>
                      setLightbox({ photo: selected.photo, trigger: event.currentTarget })
                    }
                  >
                    <GalleryImage
                      key={selected.photo.id}
                      photo={selected.photo}
                      sizes="auto, (min-width: 1440px) 730px, (min-width: 1040px) 52vw, (min-width: 740px) 51vw, (min-width: 550px) 480px, 91vw"
                    />
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      aria-hidden="true"
                    >
                      <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
                    </svg>
                  </button>
                  <figcaption>Foto Sikur Home</figcaption>
                </figure>

                <div className={styles.productCopy}>
                  <div aria-live="polite">
                    <p className="eyebrow">{selected.category}</p>
                    <h3>{selected.name}</h3>
                    <p className={styles.feature}>{selected.headline}</p>
                    <p className={styles.body}>{selected.detail}</p>
                  </div>
                  <a
                    className={styles.inlineLink}
                    href={selected.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vedi la scheda ufficiale <Icon name="external" />
                    <span className="sr-only"> {selected.name} (nuova scheda)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {lightbox && (
            <GalleryLightbox {...lightbox} photos={photos} onClose={() => setLightbox(null)} />
          )}
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
              <p className="eyebrow">CATALOGHI SIKUR HOME</p>
              <h2 id="shutters-catalogs-title">
                Sfoglia. Confronta. <em>Scegli.</em>
              </h2>
              <p className={styles.body}>
                Consulta i cataloghi del produttore per vedere le varianti e i dettagli dei sistemi.
              </p>
            </header>

            <ul className={styles.catalogList} role="list">
              {shutterCatalogs.map((catalog) => (
                <li key={catalog.id} data-reveal>
                  <a href={catalog.url} target="_blank" rel="noopener noreferrer">
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

        <ShowroomClosing
          titleId="shutters-showroom-title"
          photo={featuredWork}
          worksPath={`${worksPage.path}?categoria=oscuranti#works-content`}
          worksLabel="Vedi i nostri lavori"
        >
          <p className="eyebrow">SHOWROOM DI MONTE DI PROCIDA</p>
          <h2 id="shutters-showroom-title">
            Partiamo dalla <em>tua finestra.</em>
          </h2>
          <p className={styles.body}>
            Mandaci una foto e, se le hai, le misure del vano. Vediamo insieme quale schermatura si
            adatta alla tua casa e cosa va verificato prima della posa.
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
                <img src={assetUrl('icons/whatsapp-white.svg')} alt="" width="22" height="22" />
                Scrivici
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
