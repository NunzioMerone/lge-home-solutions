import type { Product } from '../types/content'

export const windowsPage = {
  path: '/prodotti/infissi',
  title: 'Infissi COSMET a Monte di Procida — LGE Home Solutions',
  description:
    'Confronta gli infissi COSMET in legno alluminio, alluminio e PVC, a battente e scorrevoli. Consulta i cataloghi e prova il configuratore ufficiale.',
} as const

export const shuttersPage = {
  path: '/prodotti/oscuranti',
  title: 'Oscuranti a Monte di Procida — LGE Home Solutions',
  description:
    'Confronta avvolgibili, cassonetti e motori con le persiane a battente in alluminio e acciaio. Sfoglia i cataloghi e scegli i tuoi oscuranti con LGE.',
} as const

export const securityDoorsPage = {
  path: '/prodotti/porte-e-sicurezza',
  title: 'Porte d’ingresso TEHNi ed Effepi a Monte di Procida — LGE Home Solutions',
  description:
    'Confronta le porte TEHNi in alluminio a taglio termico e le blindate Effepi in acciaio. Sfoglia i cataloghi e scegli il tuo ingresso con LGE.',
} as const

export const atelierGibusPage = {
  path: '/atelier-gibus',
  title: 'Outdoor Gibus a Monte di Procida — LGE Home Solutions',
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
    title: 'Porte d’ingresso',
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
    title: 'Outdoor',
    path: atelierGibusPage.path,
    description: 'Pergole e soluzioni outdoor per vivere il piacere di stare all’aperto.',
  },
]
