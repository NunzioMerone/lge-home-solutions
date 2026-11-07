import { contacts } from '../../../config/contacts'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { getContactLinks } from '../../../utils/contactLinks'
import { assetUrl } from '../../../utils/assetUrl'
import { Icon } from '../../ui/Icon'
import { LocationMap } from './LocationMap'
import { ShowroomPhoto } from './ShowroomPhoto'
import styles from './Contacts.module.css'

export function Contacts() {
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
              Visita il nostro showroom a Monte di Procida per scoprire materiali, finiture e
              soluzioni su misura per la tua casa.
            </p>
          </header>
          <ShowroomPhoto />
          <div className={styles.appointment} data-reveal>
            {links.whatsapp && (
              <a
                className={styles.whatsapp}
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrivici su WhatsApp (nuova scheda)"
              >
                <img src={assetUrl('icons/whatsapp-white.svg')} alt="" width="22" height="22" />
                Scrivici
              </a>
            )}
            <div className={styles.appointmentNote}>
              <Icon name="calendar" />
              <div>
                <h3>Prenota una visita</h3>
                <p>
                  Scrivici su WhatsApp per fissare un appuntamento in showroom o per chiederci
                  informazioni.
                </p>
              </div>
            </div>
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
                  <Icon name="instagram" />
                </a>
              )}
              <span className={styles.socialIcon} role="img" aria-label="Facebook">
                <Icon name="facebook" />
              </span>
            </div>
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
