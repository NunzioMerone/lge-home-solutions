import { useLayoutEffect, useRef } from 'react'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { ConfiguratorLink } from '../../components/ui/ConfiguratorLink'
import { WindowComfort } from '../../components/sections/WindowComfort/WindowComfort'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { useProductTransition } from '../../hooks/useProductTransition'
import type { ProductDetailProps } from '../../types/productTransition'
import styles from './ProductDetail.module.css'

export function ProductDetail({ product }: ProductDetailProps) {
  const image = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const { arrive } = useProductTransition()
  const closing = useSectionReveal()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (image.current && heading.current) arrive(image.current, heading.current)
  }, [arrive, product.id])

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#comfort">
        Scopri il comfort dei nostri infissi
      </a>
      <Header />
      <main>
        <section className={styles.hero} aria-labelledby="product-title">
          <div ref={image} className={styles.image}>
            <ResponsiveImage
              photo={product.id}
              collection="hero"
              sizes="(min-width: 900px) 55vw, 100vw"
              critical
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Il design per il tuo benessere</p>
            <h1 ref={heading} id="product-title" tabIndex={-1}>
              {product.title} per
              <br />
              <em>abitare meglio.</em>
            </h1>
            <p className={styles.description}>
              La scelta di una finestra dà carattere agli spazi e cambia il modo di viverli. Luce,
              materiali e comfort trovano un equilibrio su misura per la tua casa.
            </p>
            <ConfiguratorLink />
          </div>
        </section>
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
