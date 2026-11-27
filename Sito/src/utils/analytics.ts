import { contacts } from '../config/contacts'
import { privacyPage } from '../config/privacy'
import type { AnalyticsInteraction, AnalyticsPage } from '../types/analytics'
import { getContactLinks } from './contactLinks'
import { getPageMetadata } from './pageMetadata'
import { pageUrl } from './siteSeo'

const contactLinks = getContactLinks(contacts)

export function getAnalyticsPage(pathname: string, base: URL): AnalyticsPage {
  const path = pathname.split(/[?#]/, 1)[0]?.replace(/\/+$/, '') || '/'
  const metadata = getPageMetadata(path)
  // Unrecognized locations can contain private strings. Only publish registered site routes.
  if (metadata.robots && path !== privacyPage.path) {
    return { page_location: new URL('404.html', base).href, page_title: 'Pagina non trovata' }
  }
  return { page_location: pageUrl(path, base), page_title: metadata.title }
}

export function getAnalyticsInteraction(
  href: string,
  catalog: boolean,
  inPrivacyNotice: boolean,
): AnalyticsInteraction | null {
  if (inPrivacyNotice) return null
  if (catalog && href.startsWith('https://')) return 'open_catalog'
  if (href === contactLinks.whatsapp) return 'click_whatsapp'
  if (href === contactLinks.phone) return 'click_phone'
  if (href === contacts.mapUrl) return 'click_directions'
  return null
}
