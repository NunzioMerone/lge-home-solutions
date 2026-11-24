import { Link } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ShowroomClosing } from '../../components/sections/Gallery/ShowroomClosing'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { contacts } from '../../config/contacts'
import { worksPage } from '../../config/works'
import { gibusCatalogsId, outdoorShowcaseId } from '../../data/atelierGibus'
import { homeGallery } from '../../data/homeGallery'
import { atelierGibusPage } from '../../data/products'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import { AtelierShowcase } from './AtelierShowcase'
import { GibusCatalogs } from './GibusCatalogs'
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
  useAnchorNavigation(outdoorShowcaseId, gibusCatalogsId)

  return (
    <div className={styles.page}>
      <Link className="skip-link" to={`#${outdoorShowcaseId}`}>
        Vai alle soluzioni Gibus
      </Link>
      <Header />
      <main aria-labelledby="product-title" data-product-page>
        <ProductHero
          product={product}
          eyebrow="OUTDOOR"
          title={
            <>
              Come immagini il tuo spazio <em>all’aperto?</em>
            </>
          }
          description="Raccontaci le tue idee e ciò che desideri per il tuo terrazzo o giardino. Saremo felici di ascoltarti e trovare insieme la soluzione più adatta a te. Vieni a parlarne con noi in showroom, su appuntamento."
          imageOverlay={
            <p className={styles.heroBadge}>
              <strong>Atelier Gibus</strong>
              <em lang="en">Outdoor living</em>
            </p>
          }
        >
          <div className={styles.actions}>
            <Link className={styles.button} to={`#${outdoorShowcaseId}`}>
              Scopri di più <Icon name="down" />
            </Link>
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

        <GibusCatalogs />

        <ShowroomClosing
          titleId="gibus-showroom-title"
          photo={featuredWork}
          worksPath={`${worksPage.path}?categoria=atelier-gibus#works-content`}
          worksLabel="Vedi i lavori outdoor"
        >
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
