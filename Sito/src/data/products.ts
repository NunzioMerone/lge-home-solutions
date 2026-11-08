import type { Product } from '../types/content'

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

export const products: Product[] = [
  {
    id: 'windows',
    title: 'Infissi',
    path: '/prodotti/infissi',
    description: 'Più luce, comfort e armonia tra la tua casa e il mondo fuori.',
  },
  {
    id: 'shading',
    title: 'Oscuranti',
    path: '/prodotti/oscuranti',
    description: 'La luce che desideri, la privacy di cui hai bisogno.',
  },
  {
    id: 'security',
    title: 'Porte e sicurezza',
    path: '/prodotti/porte-e-sicurezza',
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
