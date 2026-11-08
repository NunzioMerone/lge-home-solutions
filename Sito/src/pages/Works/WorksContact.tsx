import { useState } from 'react'
import { Skeleton } from '../../components/ui/Skeleton'
import { contacts } from '../../config/contacts'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import styles from './Works.module.css'

export function WorksContact() {
  const ref = useSectionReveal()
  const [settled, setSettled] = useState(false)
  const showImage = useMediaQuery('(min-width: 700px)')
  const { whatsapp } = getContactLinks(contacts)

  return (
    <section className={styles.contact} aria-labelledby="works-contact-title" ref={ref}>
      {showImage && (
        <div className={styles.contactBackdrop} aria-hidden="true" data-reveal>
          {!settled && <Skeleton className={styles.heroSkeleton} />}
          <img
            src={assetUrl('img/works/contact-reference.svg')}
            width="862"
            height="456"
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setSettled(true)}
            onError={() => setSettled(true)}
          />
        </div>
      )}
      <div className={`container ${styles.contactInner}`}>
        <div className={styles.contactCopy}>
          <h2 id="works-contact-title" data-reveal>
            La prossima realizzazione <em>potrebbe essere la tua.</em>
          </h2>
          <p data-reveal>
            Raccontaci il tuo progetto, le tue esigenze e cosa vorresti migliorare nella tua casa.
            Troviamo insieme la soluzione più adatta a te.
          </p>
          {whatsapp && (
            <a
              className={styles.contactLink}
              data-reveal
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivici su WhatsApp (nuova scheda)"
            >
              <img src={assetUrl('icons/whatsapp-white.svg')} width="22" height="22" alt="" />
              Scrivici
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
