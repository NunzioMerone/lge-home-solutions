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
import {
  securityDoorChecks,
  securityDoorSystems,
  tehniCatalogIndex,
} from '../../data/securityDoors'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import { DoorDesignStudio } from './DoorDesignStudio'
import styles from './SecurityDoors.module.css'

const studioId = 'configuratore-tehni'
const catalogsId = 'cataloghi-tehni'
const featuredWork = homeGallery.find((photo) => photo.id === 'home-ingresso-grigio')
const { whatsapp } = getContactLinks(contacts)

export function SecurityDoors({ product }: ProductDetailProps) {
  const studio = useSectionReveal()
  const catalogs = useSectionReveal()
  const { hash, key } = useLocation()

  useEffect(() => {
    const section =
      hash === `#${studioId}` ? studio.current : hash === `#${catalogsId}` ? catalogs.current : null
    if (!section) return
    const frame = requestAnimationFrame(() => {
      section.focus({ preventScroll: true })
      section.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [catalogs, studio, hash, key])

  return (
    <div className={styles.page}>
      <Link className="skip-link" to={`#${studioId}`}>
        Vai al configuratore TEHNi
      </Link>
      <Header />
      <main aria-labelledby="product-title">
        <ProductHero
          product={product}
          eyebrow="PORTE E SICUREZZA · TEHNi"
          title={
            <>
              L’ingresso
              <br />
              <em>ha carattere.</em>
            </>
          }
          description="La porta d’ingresso cambia il volto della casa e il modo in cui la vivi. Esplora le soluzioni TEHNi e immagina la tua porta, dalla prima scelta fino ai dettagli della posa."
        >
          <div className={styles.actions}>
            <Link className={styles.button} to={`#${studioId}`}>
              Progetta l’ingresso <Icon name="down" />
            </Link>
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
                <p className="eyebrow">CONFIGURATORI TEHNi</p>
                <h2 id="tehni-studio-title">
                  Disegna <em>il tuo ingresso.</em>
                </h2>
              </div>
              <p className={styles.body}>
                Scegli la famiglia di porte, poi usa lo strumento ufficiale per provare modelli,
                colori e accessori. Porta il progetto in showroom per confrontarlo con campioni e
                misure.
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
                serratura alla posa.
              </p>
            </header>
            <div className={styles.guide}>
              <div className={styles.catalogs} data-reveal>
                <h3>Modelli da sfogliare</h3>
                <ul className={styles.catalogList} role="list">
                  {securityDoorSystems.map((system) => (
                    <li key={system.id}>
                      <a
                        className={styles.catalog}
                        href={system.catalog}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Apri il catalogo ${system.name} (PDF, nuova scheda)`}
                      >
                        <div>
                          <p className={styles.catalogName}>{system.name}</p>
                          <p className={styles.body}>{system.catalogDescription}</p>
                        </div>
                        <span className={styles.catalogFormat}>
                          PDF <Icon name="external" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  className={styles.inlineLink}
                  href={tehniCatalogIndex}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tutti i cataloghi TEHNi <Icon name="external" />
                  <span className="sr-only"> (nuova scheda)</span>
                </a>
              </div>

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
            </div>
          </div>
        </section>

        <ShowroomClosing
          titleId="security-showroom-title"
          photo={featuredWork}
          worksPath={`${worksPage.path}?categoria=porte-e-sicurezza#works-content`}
          worksLabel="Vedi le realizzazioni LGE"
        >
          <p className="eyebrow">SHOWROOM DI MONTE DI PROCIDA</p>
          <h2 id="security-showroom-title">
            Una porta <em>pensata per casa tua.</em>
          </h2>
          <p className={styles.body}>
            Mostraci la tua configurazione o una foto dell’ingresso. Ti aiutiamo a confrontare
            finiture, aperture e requisiti di sicurezza prima del rilievo.
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
