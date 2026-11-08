const cosmetConfigurator = 'https://configura.cosmetgroup.it/'

export const windowCollection = {
  id: 'modelli-cosmet',
  configuratorId: 'configuratore-cosmet',
  configuratorUrl: cosmetConfigurator,
  guidedUrl: `${cosmetConfigurator}lasciati-guidare/`,
  catalogUrl: `${cosmetConfigurator}catalogo/`,
} as const

const vistaBrochure =
  'https://cosmetgroup.it/wp-content/uploads/2026/08/Cosmet-Flyer-A4-4-ante_VistaMetal_02.pdf'

export const windowModels = [
  {
    id: 'vista',
    name: 'Vista',
    family: 'Finestra in PVC',
    description:
      'Ante dal profilo sottile per dare spazio al vetro. Una finestra dalle linee essenziali, disponibile con doppio o triplo vetro.',
    detail: 'Per finestre e portefinestre che portano luce nelle stanze.',
    image: {
      width: 1280,
      height: 923,
      small: 640,
      alt: 'Portafinestra Vista dai profili scuri in un soggiorno',
    },
    brochureUrl: vistaBrochure,
    productUrl: 'https://cosmetgroup.it/vista/',
    configurationUrl: `${cosmetConfigurator}configuratore/?sku=GAMCSMPPWW0HSLI01&productName=VISTA`,
  },
  {
    id: 'vista-metal',
    name: 'Vista Metal',
    family: 'Finestra in PVC e alluminio',
    description:
      'Il profilo in PVC è rivestito all’esterno in alluminio. Puoi scegliere due finiture diverse per abbinare l’infisso agli interni e alla facciata.',
    detail: 'Per coordinare i colori di casa e rispettare quelli del prospetto.',
    image: {
      width: 700,
      height: 540,
      small: 480,
      alt: 'Portafinestra Vista Metal color chiaro in un soggiorno',
    },
    brochureUrl: vistaBrochure,
    productUrl: 'https://cosmetgroup.it/vista-metal/',
    configurationUrl: `${cosmetConfigurator}configuratore/?sku=CSMPAWW0HVSM01&productName=VISTA%20METAL`,
  },
  {
    id: 'luce-poly-slim',
    name: 'Luce Poly Slim',
    family: 'Scorrevole in PVC',
    description:
      'Uno scorrevole dai profili sottili che lascia più spazio alla superficie vetrata e riduce l’ingombro dell’anta quando si apre.',
    detail: 'Per grandi aperture verso terrazzi e giardini.',
    image: {
      width: 1280,
      height: 923,
      small: 640,
      alt: 'Scorrevole Luce Poly Slim tra soggiorno e terrazza',
    },
    brochureUrl:
      'https://cosmetgroup.it/wp-content/uploads/2026/07/Cosmet-Flyer-A4-4-ante_Luce-Polyslim.pdf',
    productUrl: 'https://cosmetgroup.it/luce-poly-slim/',
    configurationUrl: null,
  },
] as const
