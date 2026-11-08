import { Link } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ShowroomClosing } from '../../components/sections/Gallery/ShowroomClosing'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { contacts } from '../../config/contacts'
import { worksPage } from '../../config/works'
import { gibusCatalogUrl, outdoorShowcaseId, outdoorSolutions } from '../../data/atelierGibus'
import { homeGallery } from '../../data/homeGallery'
import { atelierGibusPage } from '../../data/products'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import { AtelierShowcase } from './AtelierShowcase'
import styles from './AtelierGibus.module.css'

const { whatsapp } = getContactLinks(contacts)
const showroomAddress = [contacts.address, `${contacts.locality} (${contacts.province})`]
  .filter(Boolean)
  .join(', ')
const featuredWork = homeGallery.find((photo) => photo.id === 'home-pergola-antracite')

function WriteLink() {
  if (!whatsapp) return null

  return (
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
  )
}

export function AtelierGibus({ product }: ProductDetailProps) {
  const catalogs = useSectionReveal()

  return (
    <div className={styles.page}>
      <Link className="skip-link" to={`#${outdoorShowcaseId}`}>
        Vai alle soluzioni Gibus
      </Link>
      <Header />
      <main aria-labelledby="product-title">
        <ProductHero
          product={product}
          eyebrow="ATELIER GIBUS · CAMPI FLEGREI"
          title={
            <>
              Come immagini il tuo spazio <em>all’aperto?</em>
            </>
          }
          description="Raccontaci le tue idee e ciò che desideri per il tuo terrazzo o giardino. Saremo felici di ascoltarti e trovare insieme la soluzione più adatta a te. Scrivici oppure vieni a parlarne con noi in showroom, su appuntamento."
        >
          <div className={styles.actions}>
            <WriteLink />
            <a
              className={styles.inlineLink}
              href={atelierGibusPage.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sito ufficiale Gibus <Icon name="external" />
              <span className="sr-only"> (nuova scheda)</span>
            </a>
          </div>
        </ProductHero>

        <AtelierShowcase />

        <section
          className={`section ${styles.catalogs}`}
          aria-labelledby="gibus-catalogs-title"
          ref={catalogs}
        >
          <div className={`container ${styles.split}`}>
            <header data-reveal>
              <p className="eyebrow">Da sfogliare</p>
              <h2 id="gibus-catalogs-title">
                Cataloghi <em>Gibus.</em>
              </h2>
              <p className={styles.body}>
                Modelli, finiture e configurazioni. Apri il catalogo della soluzione che ti
                interessa.
              </p>
              <a
                className={styles.inlineLink}
                href={gibusCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tutti i cataloghi Gibus <Icon name="external" />
                <span className="sr-only"> (nuova scheda)</span>
              </a>
            </header>
            <ul className={styles.catalogList} role="list" data-reveal>
              {outdoorSolutions.map((solution) => (
                <li key={solution.id}>
                  <a href={solution.catalogUrl} target="_blank" rel="noopener noreferrer">
                    <span>{solution.title}</span>
                    <small>PDF</small>
                    <Icon name="external" />
                    <span className="sr-only"> (nuova scheda)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ShowroomClosing
          titleId="gibus-showroom-title"
          photo={featuredWork}
          worksPath={`${worksPage.path}?categoria=atelier-gibus#works-content`}
          worksLabel="Vedi i lavori outdoor"
        >
          <p className="eyebrow">Showroom di Monte di Procida</p>
          <h2 id="gibus-showroom-title">
            Facci vedere <em>il tuo spazio.</em>
          </h2>
          <p className={styles.body}>
            Mandaci una foto e, se le hai, le misure. Ti aiutiamo a capire cosa può funzionare e
            possiamo fissare un incontro in showroom.
          </p>
          <address className={styles.address}>
            <Icon name="pin" />
            <span>{showroomAddress}</span>
          </address>
          <div className={styles.actions}>
            <WriteLink />
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
