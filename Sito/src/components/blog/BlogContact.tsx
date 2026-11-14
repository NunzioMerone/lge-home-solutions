import { contacts } from '../../config/contacts'
import { getContactLinks } from '../../utils/contactLinks'
import { assetUrl } from '../../utils/assetUrl'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import styles from './Blog.module.css'

export function BlogContact() {
  const { whatsapp } = getContactLinks(contacts)
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
        {whatsapp && (
          <a
            className={styles.contactAction}
            data-reveal
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrivici su WhatsApp (nuova scheda)"
          >
            <img src={assetUrl('icons/whatsapp-white.svg')} alt="" width="20" height="20" />
            Parliamone insieme
          </a>
        )}
      </div>
    </section>
  )
}
