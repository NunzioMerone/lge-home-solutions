import { useSectionReveal } from '../../hooks/useSectionReveal'
import { WhatsAppContactLink } from '../ui/WhatsAppContactLink'
import styles from './Blog.module.css'

export function BlogContact() {
  const ref = useSectionReveal()
  return (
    <section className={styles.contact} aria-labelledby="blog-contact-title" ref={ref}>
      <div className={`container ${styles.contactInner}`}>
        <div data-reveal>
          <h2 id="blog-contact-title">
            Ogni casa ha una storia. <em>Parliamo della tua.</em>
          </h2>
          <p>
            Un dubbio, un’idea o un progetto da cui partire. Siamo qui per ascoltarti e trovare
            insieme la direzione giusta.
          </p>
        </div>
        <WhatsAppContactLink className={styles.contactAction} label="Parliamone insieme" reveal />
      </div>
    </section>
  )
}
