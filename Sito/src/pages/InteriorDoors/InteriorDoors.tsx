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
import { ipeaCatalogs } from '../../data/interiorDoors'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import { InteriorDoorOpenings } from './InteriorDoorOpenings'
import styles from './InteriorDoors.module.css'

const catalogsId = 'cataloghi-porte-interne'
const featuredWork = homeGallery.find((photo) => photo.id === 'home-porta-filo')
const { whatsapp } = getContactLinks(contacts)

export function InteriorDoors({ product }: ProductDetailProps) {
  const catalogs = useSectionReveal()
  const { hash, key } = useLocation()

  useEffect(() => {
    if (hash !== `#${catalogsId}`) return
    const frame = requestAnimationFrame(() => {
      const section = catalogs.current
      section?.focus({ preventScroll: true })
      section?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [catalogs, hash, key])

  return (
    <div className={styles.page}>
      <Link className="skip-link" to={`#${catalogsId}`}>
        Vai ai cataloghi I-PEA
      </Link>
      <Header />
      <main aria-labelledby="product-title">
        <ProductHero
          product={product}
          eyebrow="LGE HOME SOLUTIONS"
          title={
            <>
              Porte interne,
              <br />
              <em>stanza per stanza.</em>
            </>
          }
          description="Dal soggiorno alla zona notte, ogni stanza ha esigenze diverse. Ti aiutiamo a scegliere finitura e apertura in base alla luce, alla privacy e allo spazio che hai a disposizione."
        >
          <Link className={styles.button} to={`#${catalogsId}`}>
            Sfoglia i cataloghi <Icon name="down" />
          </Link>
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
                Sfoglia le ambientazioni e guarda come cambiano le porte con la luce, i colori e i
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

        <ShowroomClosing
          titleId="interior-showroom-title"
          photo={featuredWork}
          worksPath={`${worksPage.path}?categoria=porte-interne#works-content`}
          worksLabel="Vedi altri lavori"
        >
          <p className="eyebrow">SHOWROOM DI MONTE DI PROCIDA</p>
          <h2 id="interior-showroom-title">
            Scegliamola <em>insieme.</em>
          </h2>
          <p className={styles.body}>
            Portaci una foto della stanza o raccontaci come la vivi. Possiamo confrontare finiture e
            aperture e fissare un appuntamento in showroom.
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
