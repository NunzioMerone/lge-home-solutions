import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { ProductHero } from '../../components/sections/ProductHero/ProductHero'
import { ConfiguratorLink } from '../../components/ui/ConfiguratorLink'
import { WindowComfort } from '../../components/sections/WindowComfort/WindowComfort'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { ProductDetailProps } from '../../types/productTransition'
import styles from './ProductDetail.module.css'

export function ProductDetail({ product }: ProductDetailProps) {
  const closing = useSectionReveal()

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#comfort">
        Scopri il comfort dei nostri infissi
      </a>
      <Header />
      <main>
        <ProductHero
          product={product}
          title={
            <>
              {product.title} per
              <br />
              <em>abitare meglio.</em>
            </>
          }
          description="La scelta di una finestra dà carattere agli spazi e cambia il modo di viverli. Luce, materiali e comfort trovano un equilibrio su misura per la tua casa."
        >
          <ConfiguratorLink />
        </ProductHero>
        <WindowComfort />
        <section ref={closing} className={styles.closing} aria-labelledby="configurator-title">
          <div className={styles.closingContent} data-reveal>
            <p className={styles.eyebrow}>Il tuo progetto, con LGE</p>
            <h2 id="configurator-title">
              Ogni casa ha
              <br />
              <em>la sua misura.</em>
            </h2>
          </div>
          <div className={styles.closingDetails} data-reveal>
            <p className={styles.closingDescription}>
              Parti dai tuoi spazi, dal tuo stile e dal modo in cui li vivi. Ti accompagniamo nella
              scelta dell’infisso, fino alla cura della posa.
            </p>
            <ConfiguratorLink />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
