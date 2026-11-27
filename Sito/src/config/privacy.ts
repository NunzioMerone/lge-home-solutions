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
  providers:
    'I dati sono accessibili, per quanto necessario al loro incarico, al personale autorizzato di LGE, ai collaboratori tecnici e ai fornitori di servizi informatici, hosting, posta elettronica e comunicazione. Possono riceverli anche le autorità competenti nei casi previsti dalla legge.',
  transfers:
    'Per gli eventuali trasferimenti fuori dallo Spazio economico europeo (SEE) si applicano le garanzie dell’accordo di SiteGround sul trattamento dei dati, comprese, ove applicabili, le clausole contrattuali standard. Puoi chiedere a LGE informazioni e copia delle garanzie applicabili.',
  technicalRetention:
    'I dati tecnici di navigazione sono conservati per il tempo necessario al funzionamento e alla sicurezza del sito, secondo le impostazioni del servizio di hosting. SiteGround permette al gestore di consultare i registri degli accessi fino a 30 giorni a ritroso.',
  contactRetention:
    'LGE conserva i recapiti e i messaggi per il tempo necessario a rispondere e a seguire l’eventuale trattativa. Quando la richiesta è conclusa o lo scopo viene meno, cancella o rende anonimi i dati. Conserva solo quanto ancora necessario per un obbligo di legge o per accertare, esercitare o difendere un diritto, entro i termini applicabili.',
  publishedContent:
    'Questi contenuti sono visibili a chiunque visiti il sito. LGE pubblica i dati personali con il consenso delle persone interessate (art. 6, par. 1, lett. a del GDPR). Li mantiene online finché servono allo scopo indicato e li rimuove se il consenso viene revocato.',
  legitimateInterests:
    'LGE ha un legittimo interesse a garantire la disponibilità e la sicurezza del sito, ad aiutarti a trovare lo showroom sulla mappa e a rispondere alle richieste di informazioni che ci rivolgi (art. 6, par. 1, lett. f del GDPR).',
} satisfies PrivacyDetails

// Only the release check imports the internal review prompts.
export const privacyReviewLabels = {
  controller: 'denominazione completa del titolare del trattamento',
  address: 'sede e indirizzo per le comunicazioni al titolare',
  contact: 'email o altro recapito dedicato alle richieste privacy',
  providers: 'destinatari dei dati e ruoli dei fornitori dei servizi attivi',
  transfers: 'paesi, garanzie e modalità per ottenerne copia per i trasferimenti applicabili',
  technicalRetention:
    'criteri di conservazione dei dati tecnici e finestra di consultazione dei log',
  contactRetention:
    'periodo o criterio effettivo di conservazione delle richieste di contatto e preventivo ricevute da LGE',
  publishedContent: 'finalità, base giuridica e conservazione dei dati personali pubblicati',
  legitimateInterests: 'interessi legittimi per navigazione, sicurezza, mappa e contatti',
} satisfies Record<keyof PrivacyDetails, string>

// This notice describes the company domain in every build.
export const privacyContent = {
  hostingNotice:
    'SiteGround fornisce l’hosting di lgesolutions.it e agisce come responsabile del trattamento per questo servizio, svolto per conto di LGE. L’account è gestito da un professionista esterno. Il data center indicato per il sito è in Europa.',
} as const

export const privacyPage = {
  path: '/privacy-policy',
  title: 'Privacy Policy — LGE Home Solutions',
  description:
    'Informativa sul trattamento dei dati durante la navigazione nel sito LGE Home Solutions, sui servizi esterni e sui diritti degli interessati.',
  updatedAt: '2026-11-28',
  updatedLabel: '28 novembre 2026',
  // Only the controller's explicit sign-off authorizes a commercial release.
  approved: false,
} as const

export const privacySources = {
  gdpr: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/ita',
  garante:
    'https://www.garanteprivacy.it/home/diritti/come-agire-per-tutelare-i-tuoi-dati-personali',
  siteGroundDpa: 'https://it.siteground.com/viewtos/data_processing_agreement',
  siteGroundAccessLogs: 'https://it.siteground.com/kb/trova-i-log-di-accesso',
  osmPrivacy: 'https://osmfoundation.org/wiki/Privacy_Policy',
  osmTileFaq: 'https://osmfoundation.org/wiki/Services_and_tile_users_privacy_FAQ',
  fastlyTransfers: 'https://www.fastly.com/data-processing',
  ukAdequacy:
    'https://op.europa.eu/it/publication-detail/-/publication/c33195e2-dfa5-11f0-8439-01aa75ed71a1/language-it',
  whatsappPrivacy: 'https://www.whatsapp.com/legal/privacy-policy-eea',
  googlePrivacy: 'https://policies.google.com/privacy?hl=it',
  googleMapsTerms: 'https://www.google.com/intl/it/help/terms_maps/',
  elfsightPrivacy: 'https://elfsight.com/privacy-policy/',
  instagramPrivacy: 'https://privacycenter.instagram.com/policy/',
  facebookPrivacy: 'https://www.facebook.com/privacy/policy/',
} as const
