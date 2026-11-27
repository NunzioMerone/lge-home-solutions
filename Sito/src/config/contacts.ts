import type { ContactConfig } from '../types/content'
import { privacyDetails } from './privacy'

const phoneNumber = '+39 334 600 8313'

export const contacts: ContactConfig = {
  locality: 'Monte di Procida',
  region: 'Napoli, Campania',
  postalCode: '80070',
  province: 'NA',
  address: 'Via Roma, 29',
  phone: phoneNumber,
  email: 'info@lgesolutions.it',
  whatsapp: phoneNumber,
  instagram: 'https://www.instagram.com/atelier_gibus_campiflegrei/',
  facebook: 'https://www.facebook.com/people/Atelier-Gibus-Campi-Flegrei/61557779500015/',
  legalName: privacyDetails.controller,
  vatNumber: '09422971219',
  openingHours: [],
  mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.7940311%2C14.0532046',
}

export const showroomPostalLocality = `${contacts.postalCode} ${contacts.locality} (${contacts.province})`
export const showroomAddress = [contacts.address, showroomPostalLocality].filter(Boolean).join(', ')
export const serviceArea = ['Campi Flegrei', 'Monte di Procida', 'Bacoli'] as const
export const instagramLabel = 'Instagram di Atelier Gibus Campi Flegrei (nuova scheda)'
