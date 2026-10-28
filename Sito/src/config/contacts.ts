import type { ContactConfig } from '../types/content'

const phoneNumber = '+39 329 826 5371'

export const contacts: ContactConfig = {
  locality: 'Monte di Procida',
  region: 'Napoli, Campania',
  postalCode: '80070',
  province: 'NA',
  address: 'Via Roma, 29',
  phone: phoneNumber,
  email: null,
  whatsapp: phoneNumber,
  instagram: null,
  legalName: null,
  vatNumber: null,
  openingHours: [
    { days: 'Lun – Ven', hours: '09:00 – 18:00' },
    { days: 'Sab – Dom', hours: 'Chiuso' },
  ],
  mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=40.7940311%2C14.0532046',
}
