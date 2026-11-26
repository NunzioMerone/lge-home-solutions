import { contacts } from '../../config/contacts'
import type { WhatsAppContactLinkProps } from '../../types/ui'
import { assetUrl } from '../../utils/assetUrl'
import { getContactLinks } from '../../utils/contactLinks'
import styles from './WhatsAppContactLink.module.css'

const { whatsapp } = getContactLinks(contacts)

export function WhatsAppContactLink({
  className,
  label = 'Contattaci',
  reveal,
}: WhatsAppContactLinkProps) {
  if (!whatsapp) return null

  return (
    <a
      className={className ? `${styles.button} ${className}` : styles.button}
      data-reveal={reveal}
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} su WhatsApp (nuova scheda)`}
    >
      <img src={assetUrl('icons/whatsapp-brand.svg')} alt="" width="22" height="22" />
      {label}
    </a>
  )
}
