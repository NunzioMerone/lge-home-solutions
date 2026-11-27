import { contacts } from '../../../config/contacts'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import type { PageActivityProps } from '../../../types/navigation'
import { getContactLinks } from '../../../utils/contactLinks'
import { assetUrl } from '../../../utils/assetUrl'
import { Icon } from '../../ui/Icon'
import { WhatsAppContactLink } from '../../ui/WhatsAppContactLink'
import { LocationMap } from './LocationMap'
import { ShowroomGallery } from './ShowroomGallery'
import styles from './Contacts.module.css'

export function Contacts({ active }: PageActivityProps) {
  const ref = useSectionReveal()
  const links = getContactLinks(contacts)
  return (
    <section
      className={`section ${styles.section}`}
      id="contatti"
      aria-labelledby="contacts-title"
      ref={ref}
    >
      <div className="container">
        <div className={styles.layout}>
          <header className={styles.introduction} data-reveal>
            <h2 id="contacts-title" className={styles.heading}>
              Vieni a <em>trovarci</em>
            </h2>
            <p className={styles.description}>
              Visita il nostro showroom a Monte di Procida, vicino a Bacoli. Qui puoi confrontare
              materiali e finiture e scegliere con noi le soluzioni più adatte alla tua casa.
            </p>
          </header>
          <ShowroomGallery active={active} />
          <div className={styles.appointment} data-reveal>
            <WhatsAppContactLink className={styles.whatsapp} />
            <div className={styles.appointmentNote}>
              <Icon name="calendar" />
              <p>
                Scrivici su WhatsApp per fissare un appuntamento in showroom o per chiederci
                informazioni.
              </p>
            </div>
            {(links.instagram || links.facebook) && (
              <div className={styles.socials}>
                <p>Seguici su</p>
                {links.instagram && (
                  <a
                    className={styles.socialIcon}
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram di LGE Home Solutions (nuova scheda)"
                  >
                    <img
                      src={assetUrl('icons/instagram-gradient.webp')}
                      alt=""
                      width="21"
                      height="21"
                    />
                  </a>
                )}
                {links.facebook && (
                  <a
                    className={styles.socialIcon}
                    href={links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook di Atelier Gibus Campi Flegrei (nuova scheda)"
                  >
                    <img src={assetUrl('icons/facebook-blue.webp')} alt="" width="21" height="21" />
                  </a>
                )}
              </div>
            )}
          </div>
          <div className={styles.directions} data-reveal>
            <div className={styles.address}>
              <h3>
                <Icon name="pin" />
                Come raggiungerci
              </h3>
              <address>
                <span>{contacts.address ?? contacts.locality}</span>
                <span>
                  {contacts.locality} ({contacts.province})
                </span>
              </address>
              <a
                className={styles.directionsLink}
                href={contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apri le indicazioni per LGE su Google Maps (nuova scheda)"
              >
                Apri le indicazioni <Icon name="arrow" />
              </a>
            </div>
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  )
}
