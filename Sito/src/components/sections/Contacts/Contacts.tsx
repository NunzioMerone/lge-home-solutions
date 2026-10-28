import { contacts } from '../../../config/contacts'
import { contactExamples } from '../../../data/contactExamples'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { getContactLinks } from '../../../utils/contactLinks'
import { Icon } from '../../ui/Icon'
import { ContactChannels } from './ContactChannels'
import { LocationMap } from './LocationMap'
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
        <header className={styles.heading} data-reveal>
          <h2 id="contacts-title">
            Vieni a <em>trovarci</em>
          </h2>
        </header>
        <div className={styles.layout}>
          <div className={styles.details}>
            <header className={styles.introduction} data-reveal>
              <p>
                Ogni casa ha le sue esigenze. <strong>Prendi un appuntamento:</strong> ti aspettiamo
                a Monte di Procida per scegliere insieme materiali, finiture e soluzioni per i tuoi
                spazi.
              </p>
            </header>
            <dl className={styles.contactList} data-reveal>
              <div className={styles.detailRow}>
                <dt>
                  <span className={styles.detailIcon}>
                    <Icon name="pin" />
                  </span>
                  Indirizzo
                </dt>
                <dd>
                  <a href={contacts.mapUrl} target="_blank" rel="noopener noreferrer">
                    {contacts.address ?? contacts.locality}
                  </a>
                  <span>
                    {contacts.postalCode} {contacts.locality} ({contacts.province})
                  </span>
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt>
                  <span className={styles.detailIcon}>
                    <Icon name="phone" />
                  </span>
                  Telefono
                </dt>
                <dd>
                  {links.phone ? <a href={links.phone}>{contacts.phone}</a> : 'Da confermare'}
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt>
                  <span className={styles.detailIcon}>
                    <Icon name="mail" />
                  </span>
                  Email
                </dt>
                <dd>
                  {links.email ? (
                    <a href={links.email}>{contacts.email}</a>
                  ) : (
                    <span className={styles.exampleEmail}>
                      {contactExamples.email}
                      <small>Esempio</small>
                    </span>
                  )}
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt>
                  <span className={styles.detailIcon}>
                    <Icon name="clock" />
                  </span>
                  Orari
                </dt>
                <dd className={styles.hours}>
                  {contacts.openingHours.map(({ days, hours }) => (
                    <div key={days}>
                      <span>{days}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
            <div data-reveal>
              <ContactChannels />
            </div>
          </div>
          <div className={styles.mapReveal} data-reveal>
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  )
}
