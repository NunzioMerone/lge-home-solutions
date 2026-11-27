import { PageLink } from '../ui/PageLink'
import { useHydrated } from '../../hooks/useHydrated'
import { contacts, instagramLabel, showroomPostalLocality } from '../../config/contacts'
import { site } from '../../config/site'
import { privacyPage } from '../../config/privacy'
import { competenciesPage } from '../../config/competencies'
import { worksPage } from '../../config/works'
import { blogPage } from '../../config/blog'
import { products } from '../../data/products'
import { getContactLinks } from '../../utils/contactLinks'
import { assetUrl } from '../../utils/assetUrl'
import { Icon } from '../ui/Icon'
import styles from './Footer.module.css'

export function Footer() {
  const year = useHydrated() ? new Date().getFullYear() : __BUILD_YEAR__
  const links = getContactLinks(contacts)
  const socialLinks = [
    {
      icon: 'whatsapp',
      label: `WhatsApp al numero ${contacts.whatsapp}`,
      href: links.whatsapp,
    },
    {
      icon: 'instagram',
      label: instagramLabel,
      href: links.instagram,
    },
    {
      icon: 'facebook',
      label: 'Facebook di Atelier Gibus Campi Flegrei (nuova scheda)',
      href: links.facebook,
    },
  ] as const
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.main}>
          <div className={styles.identity}>
            <PageLink
              className={styles.brand}
              to="/#inizio"
              aria-label="LGE Home Solutions, torna in cima"
            >
              <img
                src={site.whiteLogo}
                alt="LGE — Il design per il tuo benessere"
                width="1000"
                height="1000"
                loading="lazy"
              />
            </PageLink>
            <div className={styles.details}>
              <h2 className={styles.heading}>Contatti</h2>
              <address className={styles.contact}>
                {links.phone && (
                  <a className={styles.contactRow} href={links.phone}>
                    <Icon name="phone" />
                    <span>{contacts.phone}</span>
                  </a>
                )}
                <a
                  className={styles.contactRow}
                  href={contacts.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="pin" />
                  <span>
                    {contacts.address}
                    <br />
                    {showroomPostalLocality}
                  </span>
                </a>
                {links.email && (
                  <a className={styles.contactRow} href={links.email}>
                    <Icon name="mail" />
                    <span>{contacts.email}</span>
                  </a>
                )}
              </address>
            </div>
          </div>
          <div className={styles.menus}>
            <nav className={styles.navigation} aria-label="Soluzioni nel footer">
              <h2 className={styles.heading}>Soluzioni</h2>
              {products.map(({ id, title, path }) => (
                <PageLink to={path} key={id}>
                  {title}
                </PageLink>
              ))}
            </nav>
            <nav className={styles.navigation} aria-label="Navigazione nel footer">
              <h2 className={styles.heading}>Esplora</h2>
              {site.sections
                .filter(({ id }) => id !== 'prodotti')
                .map(({ id, label }) => (
                  <PageLink
                    to={
                      id === 'competenze'
                        ? competenciesPage.path
                        : id === 'lavori'
                          ? worksPage.path
                          : `/#${id}`
                    }
                    key={id}
                  >
                    {label}
                  </PageLink>
                ))}
              <PageLink to={blogPage.path}>Blog</PageLink>
            </nav>
          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>© {year} LGE Home Solutions</span>
          <PageLink className={styles.legal} to={privacyPage.path}>
            Privacy Policy
          </PageLink>
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
                  {icon === 'whatsapp' ? (
                    <img
                      src={assetUrl('icons/whatsapp-white.svg')}
                      alt=""
                      width="24"
                      height="24"
                      loading="lazy"
                    />
                  ) : (
                    <Icon name={icon} />
                  )}
                </a>
              ) : null,
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
