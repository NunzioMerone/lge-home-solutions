import type { WindowMaterial, WindowOpening } from '../types/infissi'

const cosmetConfigurator = 'https://configura.cosmetgroup.it/'

export const windowCollection = {
  id: 'modelli-cosmet',
  configuratorId: 'configuratore-cosmet',
  configuratorUrl: cosmetConfigurator,
  guidedUrl: `${cosmetConfigurator}lasciati-guidare/`,
  catalogUrl: `${cosmetConfigurator}catalogo/`,
} as const

export const windowOpenings: ReadonlyArray<{ id: WindowOpening; name: string }> = [
  { id: 'battente', name: 'Battente' },
  { id: 'scorrevole', name: 'Scorrevole' },
]

export const windowMaterials: readonly [WindowMaterial, ...WindowMaterial[]] = [
  {
    id: 'legno-alluminio',
    name: 'Legno alluminio',
    headline: 'Il calore del legno, la solidità dell’alluminio.',
    models: {
      battente: {
        id: 'fideal-vision',
        name: 'Fideal Vision',
        description:
          'Il legno a vista scalda gli interni, mentre l’alluminio riveste il telaio all’esterno. Le ante a battente si aprono nella stanza e lasciano libero il passaggio quando lo spazio lo consente.',
        image: {
          width: 1280,
          height: 720,
          small: 640,
          alt: 'Due portefinestre Fideal Vision in un soggiorno dalle pareti blu',
        },
        productUrl: 'https://cosmetgroup.it/vision/',
        brochureUrl:
          'https://cosmetgroup.it/wp-content/uploads/2026/10/Fideal-Flyer-A4-4-ante_Vision.pdf',
      },
      scorrevole: {
        id: 'luce-intensa',
        name: 'Luce Intensa Slim',
        description:
          'Grandi superfici vetrate, con il legno a vista verso la casa. L’anta scorre di lato e lascia più spazio agli arredi vicino alla finestra.',
        image: {
          width: 1280,
          height: 720,
          small: 640,
          alt: 'Vetrata scorrevole Luce Intensa Slim accanto a un soggiorno',
        },
        productUrl: 'https://cosmetgroup.it/luce-intensa/',
        brochureUrl:
          'https://cosmetgroup.it/wp-content/uploads/2026/08/Fideal-Flyer-A4-4-ante_Luce-intensa-slim.pdf',
      },
    },
  },
  {
    id: 'alluminio',
    name: 'Alluminio',
    headline: 'Linee sottili. Orizzonti più ampi.',
    models: {
      battente: {
        id: 'prime',
        name: 'Prime',
        description:
          'Un telaio in alluminio dal disegno essenziale. Nella versione a battente, i profili sottili danno più spazio al vetro anche quando l’apertura è contenuta.',
        image: {
          width: 1280,
          height: 960,
          small: 640,
          alt: 'Portafinestra e finestra a battente Prime in un soggiorno dai toni caldi',
        },
        productUrl: 'https://cosmetgroup.it/prime/',
      },
      scorrevole: {
        id: 'luce-metal-slim',
        name: 'Alwo Luce Metal Slim',
        description:
          'Una vetrata scorrevole in alluminio per dare continuità tra la stanza e l’esterno. Il telaio sottile lascia spazio alla luce e al panorama.',
        image: {
          width: 1280,
          height: 720,
          small: 640,
          alt: 'Vetrata scorrevole Alwo Luce Metal Slim affacciata su una terrazza sul mare',
        },
        productUrl: 'https://cosmetgroup.it/luce-metal-slim/',
        brochureUrl:
          'https://cosmetgroup.it/wp-content/uploads/2026/07/Alwo-Flyer-A4-4-ante_Luce-metalslim.pdf',
      },
    },
  },
  {
    id: 'pvc',
    name: 'PVC',
    headline: 'Il comfort che vivi ogni giorno.',
    models: {
      battente: {
        id: 'vista',
        name: 'Vista',
        description:
          'Una finestra in PVC dalle linee essenziali, disponibile con doppio o triplo vetro. Le ante sottili lasciano spazio alla luce nelle stanze.',
        image: {
          width: 1280,
          height: 923,
          small: 640,
          alt: 'Portafinestra Vista dai profili scuri in un soggiorno',
        },
        productUrl: 'https://cosmetgroup.it/vista/',
        brochureUrl:
          'https://cosmetgroup.it/wp-content/uploads/2026/08/Cosmet-Flyer-A4-4-ante_VistaMetal_02.pdf',
        configurationUrl: `${cosmetConfigurator}configuratore/?sku=GAMCSMPPWW0HSLI01&productName=VISTA`,
      },
      scorrevole: {
        id: 'luce-poly-slim',
        name: 'Luce Poly Slim',
        description:
          'Uno scorrevole in PVC dai profili sottili, pensato per le aperture verso terrazzi e giardini. L’anta si sposta di lato e lascia libero lo spazio davanti al vetro.',
        image: {
          width: 1280,
          height: 923,
          small: 640,
          alt: 'Scorrevole Luce Poly Slim tra soggiorno e terrazza',
        },
        productUrl: 'https://cosmetgroup.it/luce-poly-slim/',
        brochureUrl:
          'https://cosmetgroup.it/wp-content/uploads/2026/07/Cosmet-Flyer-A4-4-ante_Luce-Polyslim.pdf',
      },
    },
  },
]
