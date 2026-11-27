import type { PrivacyDetails } from '../types/privacy'

// The privacy phone is separate from the commercial number.
export const privacyContact = {
  administrator: 'Lemuel Schiano Lomoriello',
  phone: '+39 329 826 5371',
} as const

export const privacyDetails = {
  controller: 'LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel',
  address: 'Via Roma, 29 — 80070 Monte di Procida (NA)',
  contact: 'info@lgesolutions.it',
  providers: null,
  transfers: null,
  technicalRetention: null,
  contactRetention: null,
  publishedContent: null,
  legitimateInterests: null,
} satisfies PrivacyDetails

// Only the release check imports the internal review prompts.
export const privacyReviewLabels = {
  controller: 'denominazione completa del titolare del trattamento',
  address: 'sede e indirizzo per le comunicazioni al titolare',
  contact: 'email o altro recapito dedicato alle richieste privacy',
  providers:
    'ruoli e accordi per i due tecnici, catena contrattuale e fornitori dei servizi attivi',
  transfers: 'paesi, garanzie e modalità per ottenerne copia per i trasferimenti applicabili',
  technicalRetention:
    'durate o criteri verificati per log, mappa, statistiche di hosting e copie di sicurezza applicabili',
  contactRetention:
    'periodo o criterio effettivo di conservazione delle richieste di contatto e preventivo ricevute da LGE',
  publishedContent:
    'presupposti, informative e conservazione per recensioni, foto riconoscibili e attestati nominativi',
  legitimateInterests:
    'basi giuridiche per navigazione, sicurezza, mappa e contatti, con valutazione degli interessi legittimi eventualmente invocati',
} satisfies Record<keyof PrivacyDetails, string>

// This notice describes the company domain in every build.
export const privacyContent = {
  hostingNotice:
    'SiteGround fornisce l’hosting di lgesolutions.it. Il data center indicato per il sito è in Europa. I registri degli accessi possono contenere indirizzo IP, data e ora, pagina richiesta, esito della richiesta e informazioni sul browser. Per conto di LGE hanno accesso tecnico il professionista che gestisce l’account di hosting e il collaboratore che cura il sito.',
} as const

export const privacyPage = {
  path: '/privacy-policy',
  title: 'Privacy Policy — LGE Home Solutions',
  description:
    'Informativa sul trattamento dei dati durante la navigazione nel sito LGE Home Solutions, sui servizi esterni e sui diritti degli interessati.',
  updatedAt: '2026-11-27',
  updatedLabel: '27 novembre 2026',
  // Set only after the missing details and the text have been reviewed by the controller.
  approved: false,
} as const

export const privacySources = {
  gdpr: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/ita',
  garante:
    'https://www.garanteprivacy.it/home/diritti/come-agire-per-tutelare-i-tuoi-dati-personali',
  cookies: 'https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876',
  siteGroundDpa: 'https://it.siteground.com/viewtos/data_processing_agreement',
  siteGroundAccessLogs: 'https://it.siteground.com/kb/trova-i-log-di-accesso',
  osmPrivacy: 'https://osmfoundation.org/wiki/Privacy_Policy',
  whatsappPrivacy: 'https://www.whatsapp.com/legal/privacy-policy-eea',
  googlePrivacy: 'https://policies.google.com/privacy?hl=it',
  googleMapsTerms: 'https://www.google.com/intl/it/help/terms_maps/',
  elfsightPrivacy: 'https://elfsight.com/privacy-policy/',
  instagramPrivacy: 'https://privacycenter.instagram.com/policy/',
  facebookPrivacy: 'https://www.facebook.com/privacy/policy/',
} as const
