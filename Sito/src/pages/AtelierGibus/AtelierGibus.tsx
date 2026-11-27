import { PageLink } from '../../components/ui/PageLink'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { ProjectClosing } from '../../components/sections/Gallery/ProjectClosing'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { Icon } from '../../components/ui/Icon'
import { worksPage } from '../../config/works'
import { gibusCatalogsId, outdoorShowcaseId } from '../../data/atelierGibus'
import { homeGallery } from '../../data/homeGallery'
import { atelierGibusPage } from '../../data/products'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import type { ProductDetailProps } from '../../types/productTransition'
import { assetUrl } from '../../utils/assetUrl'
import { AtelierShowcase } from './AtelierShowcase'
import { GibusCatalogs } from './GibusCatalogs'
import styles from './AtelierGibus.module.css'

const featuredWork = homeGallery.find((photo) => photo.id === 'home-pergola-antracite')

export function AtelierGibus({ product }: ProductDetailProps) {
  useAnchorNavigation(outdoorShowcaseId, gibusCatalogsId)

  return (
    <div className={styles.page}>
      <PageLink className="skip-link" to={`#${outdoorShowcaseId}`}>
        Vai alle soluzioni Gibus
      </PageLink>
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
          description="Raccontaci le tue idee e ciò che desideri per il tuo terrazzo o giardino. Saremo felici di ascoltarti e trovare insieme la soluzione più adatta a te. Vieni a parlarne con noi in showroom."
          imageOverlay={
            <img
              className={styles.heroLogo}
              src={assetUrl('img/partners/gibus-atelier.webp')}
              alt="Atelier Gibus"
              width="298"
              height="43"
            />
          }
        >
          <div className={styles.actions}>
            <PageLink className={styles.button} to={`#${outdoorShowcaseId}`}>
              Scopri di più <Icon name="down" />
            </PageLink>
            <PageLink className={styles.inlineLink} to={`#${gibusCatalogsId}`}>
              Cataloghi <Icon name="down" />
            </PageLink>
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

        <ProjectClosing
          titleId="gibus-showroom-title"
          photo={featuredWork}
          showroom={{
            worksPath: `${worksPage.path}?categoria=atelier-gibus#works-content`,
            worksLabel: 'Vedi i lavori outdoor',
            showAddress: true,
          }}
          title={
            <>
              Facci vedere <em>il tuo spazio.</em>
            </>
          }
          description="Mandaci una foto e, se le hai, le misure. Ti aiutiamo a capire cosa può funzionare e possiamo fissare un incontro in showroom."
        />
      </main>
      <Footer />
    </div>
  )
}
