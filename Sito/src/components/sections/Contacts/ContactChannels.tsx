import { contacts } from '../../../config/contacts'
import { getContactLinks } from '../../../utils/contactLinks'
import { assetUrl } from '../../../utils/assetUrl'
import styles from './Contacts.module.css'

export function ContactChannels() {
  const links = getContactLinks(contacts)
  const channels = [
    {
      icon: assetUrl('icons/whatsapp.svg'),
      label: `Apri WhatsApp al numero ${contacts.phone}`,
      href: links.whatsapp,
    },
    {
      icon: assetUrl('icons/instagram.svg'),
      label: 'Instagram, profilo in definizione',
      href: links.instagram,
    },
  ] as const
  return (
    <div className={styles.channelList} aria-label="I nostri social">
      {channels.map(({ icon, label, href }) =>
        href ? (
          <a
            className={styles.channel}
            href={href}
            key={icon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <img src={icon} alt="" width="36" height="36" loading="lazy" />
          </a>
        ) : (
          <span className={styles.channel} key={icon} role="img" aria-label={label} title={label}>
            <img src={icon} alt="" width="36" height="36" loading="lazy" />
          </span>
        ),
      )}
    </div>
  )
}
