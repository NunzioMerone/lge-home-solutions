import type { Product } from '../types/content'

export const windowsPage = {
  path: '/prodotti/infissi',
  title: 'Infissi a Monte di Procida — LGE Home Solutions',
  description:
    'Confronta infissi in PVC, alluminio e legno-alluminio. Sfoglia i cataloghi COSMET e visita su appuntamento lo showroom LGE in via Roma 29.',
} as const

export const shuttersPage = {
  path: '/prodotti/oscuranti',
  title: 'Persiane e avvolgibili a Monte di Procida — LGE',
  description:
    'Scegli tra persiane a battente in alluminio o acciaio e tapparelle avvolgibili. Esplora cassonetti, motori e cataloghi per regolare luce e privacy in casa.',
} as const

export const securityDoorsPage = {
  path: '/prodotti/porte-e-sicurezza',
  title: 'Porte d’ingresso e blindate a Monte di Procida — LGE',
  description:
    'Confronta i portoncini TEHNi in alluminio a taglio termico e le porte blindate Effepi in acciaio. Sfoglia i cataloghi e valuta serratura, cerniere e apertura.',
} as const

export const atelierGibusPage = {
  path: '/atelier-gibus',
  title: 'Atelier Gibus Campi Flegrei — Pergole e tende da sole',
  description:
    'Pergole bioclimatiche, tende da sole e vetrate scorrevoli per vivere il terrazzo. Consulta i cataloghi Gibus e visita lo showroom LGE a Monte di Procida.',
  officialUrl: 'https://www.gibus.com/it/',
} as const

export const interiorDoorsPage = {
  path: '/prodotti/porte-interne',
  title: 'Porte interne a Monte di Procida — LGE',
  description:
    'Confronta porte a battente, scorrevoli a scomparsa e raso parete. Sfoglia le collezioni I-PEA in laccato, laminato e vetro per scegliere la finitura.',
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
