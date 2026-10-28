import { Link } from 'react-router-dom'
import { contacts } from '../../config/contacts'
import { site } from '../../config/site'
import { products } from '../../data/products'
import { getContactLinks } from '../../utils/contactLinks'
import { Icon } from '../ui/Icon'
import styles from './Footer.module.css'

export function Footer() {
  const links = getContactLinks(contacts)
  const socialLinks = [
    { icon: 'whatsapp', label: 'WhatsApp', href: links.whatsapp },
    { icon: 'instagram', label: 'Instagram, profilo in definizione', href: links.instagram },
  ] as const
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.main}>
          <div className={styles.identity}>
            <Link
              className={styles.brand}
              to="/#inizio"
              aria-label="LGE Home Solutions, torna in cima"
            >
              <img
                src={site.whiteLogo}
                alt="LGE — Il design per il tuo benessere"
                width="2171"
                height="724"
                loading="lazy"
              />
            </Link>
            <address className={styles.contact}>
              {links.phone && (
                <a className={styles.contactRow} href={links.phone}>
                  <span className={styles.contactIcon}>
                    <Icon name="phone" />
                  </span>
                  <span>{contacts.phone}</span>
                </a>
              )}
              <a
                className={styles.contactRow}
                href={contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.contactIcon}>
                  <Icon name="pin" />
                </span>
                <span>
                  {contacts.address}
                  <br />
                  {contacts.locality} ({contacts.province})
                </span>
              </a>
              {links.email && (
                <a className={styles.contactRow} href={links.email}>
                  <span className={styles.contactIcon}>
                    <Icon name="mail" />
                  </span>
                  <span>{contacts.email}</span>
                </a>
              )}
            </address>
          </div>
          <nav className={styles.products} aria-label="Soluzioni nel footer">
            <h2>Soluzioni</h2>
            {products.map(({ id, title, path }) => (
              <Link to={path} key={id}>
                {title}
              </Link>
            ))}
          </nav>
          <nav className={styles.navigation} aria-label="Navigazione nel footer">
            <h2>Esplora</h2>
            {site.sections
              .filter(({ id }) => id !== 'prodotti')
              .map(({ id, label }) => (
                <Link to={`/#${id}`} key={id}>
                  {label}
                </Link>
              ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} LGE Home Solutions</span>
          <div className={styles.socials} aria-label="Social LGE">
            {socialLinks.map(({ icon, label, href }) =>
              href ? (
                <a
                  className={styles.socialIcon}
                  href={href}
                  key={icon}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={icon} />
                </a>
              ) : (
                <span
                  className={styles.socialIcon}
                  key={icon}
                  role="img"
                  aria-label={label}
                  title={label}
                >
                  <Icon name={icon} />
                </span>
              ),
            )}
          </div>
        </div>
        {(contacts.legalName || contacts.vatNumber) && (
          <p className={styles.fiscal}>
            {contacts.legalName}
            {contacts.vatNumber && ` · P. IVA ${contacts.vatNumber}`}
          </p>
        )}
      </div>
    </footer>
  )
}
