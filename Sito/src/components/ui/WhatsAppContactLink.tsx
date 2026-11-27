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
  floating = false,
}: WhatsAppContactLinkProps) {
  if (!whatsapp) return null
  const icon = floating ? 'whatsapp.svg' : 'whatsapp-brand.svg'
  const size = floating ? 52 : 22

  return (
    <a
      className={[floating ? styles.floating : styles.button, className].filter(Boolean).join(' ')}
      data-reveal={reveal}
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} su WhatsApp (nuova scheda)`}
    >
      <img src={assetUrl(`icons/${icon}`)} alt="" width={size} height={size} />
      {!floating && label}
    </a>
  )
}
