import type { Product } from '../types/content'

export const windowsPage = {
  path: '/prodotti/infissi',
  title: 'Infissi COSMET a Monte di Procida — LGE Home Solutions',
  description:
    'Scopri gli infissi COSMET, consulta i cataloghi e prova il configuratore ufficiale. Scegli con LGE profili, vetri e aperture per la tua casa.',
} as const

export const shuttersPage = {
  path: '/prodotti/oscuranti',
  title: 'Oscuranti SikurHome a Monte di Procida — LGE Home Solutions',
  description:
    'Esplora le schermature e gli oscuranti SikurHome, consulta i cataloghi e trova con LGE il giusto equilibrio tra luce, ombra e privacy.',
} as const

export const securityDoorsPage = {
  path: '/prodotti/porte-e-sicurezza',
  title: 'Porte d’ingresso TEHNi a Monte di Procida — LGE Home Solutions',
  description:
    'Scopri le porte d’ingresso TEHNi, sfoglia i cataloghi e personalizza il tuo ingresso con il configuratore ufficiale e la consulenza di LGE.',
} as const

export const atelierGibusPage = {
  path: '/atelier-gibus',
  title: 'Atelier Gibus a Monte di Procida — LGE Home Solutions',
  description:
    'Pergole bioclimatiche, tende da sole e chiusure vetrate con Atelier Gibus Campi Flegrei. Scopri le soluzioni outdoor e le realizzazioni di LGE Home Solutions.',
  officialUrl: 'https://www.gibus.com/it/',
} as const

export const interiorDoorsPage = {
  path: '/prodotti/porte-interne',
  title: 'Porte interne I-PEA a Monte di Procida — LGE Home Solutions',
  description:
    'Sfoglia i cataloghi I-PEA di porte interne laccate, in laminato e in vetro. Con LGE scegli finitura, apertura e dettagli per la tua casa.',
} as const

export const detailedProductPages = [
  windowsPage,
  shuttersPage,
  securityDoorsPage,
  interiorDoorsPage,
  atelierGibusPage,
] as const

export const products: Product[] = [
  {
    id: 'windows',
    title: 'Infissi',
    path: windowsPage.path,
    description: 'Più luce, comfort e armonia tra la tua casa e il mondo fuori.',
  },
  {
    id: 'shading',
    title: 'Oscuranti',
    path: shuttersPage.path,
    description: 'La luce che desideri, la privacy di cui hai bisogno.',
  },
  {
    id: 'security',
    title: 'Porte e sicurezza',
    path: securityDoorsPage.path,
    description: 'Protezione e design si incontrano, fin dal primo ingresso.',
  },
  {
    id: 'interior',
    title: 'Porte interne',
    path: interiorDoorsPage.path,
    description: 'Materiali e dettagli che danno continuità al tuo stile.',
  },
  {
    id: 'outdoor',
    title: 'Atelier Gibus',
    path: atelierGibusPage.path,
    description: 'Pergole e soluzioni outdoor per vivere il piacere di stare all’aperto.',
  },
]
