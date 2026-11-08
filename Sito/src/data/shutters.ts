import type { GalleryPhoto } from '../types/gallery'

const sikurHome = 'https://www.sikurhome.it'

const partnerPhoto = {
  width: 1440,
  height: 957,
  previewWidths: [480, 960, 1440],
  fullWidth: 1440,
  collection: 'sikur-home',
  status: 'partner-authorized',
} as const

export const shutterSolutions = [
  {
    id: 'smartapp',
    need: 'Cassonetto esistente',
    name: 'Smartapp',
    category: 'Avvolgibile frangisole',
    headline: 'Filtra la luce, con poco ingombro.',
    detail:
      'Un avvolgibile in alluminio pensato per gestire luce e ricambio d’aria anche quando lo spazio nel cassonetto è limitato. In fase di rilievo si verifica se è possibile conservare guide e cassonetto esistenti.',
    productUrl: `${sikurHome}/prodotti/tapparella-avvolgibile-frangisole/`,
    photo: {
      ...partnerPhoto,
      id: 'smartapp',
      category: 'Smartapp',
      alt: 'Luce calda tra le fasce dell’avvolgibile Smartapp accanto a una seduta',
    } satisfies GalleryPhoto,
  },
  {
    id: 'giant',
    need: 'Grandi vetrate',
    name: 'Giant',
    category: 'Frangisole per grandi aperture',
    headline: 'Più ombra, anche sulle grandi vetrate.',
    detail:
      'Una schermatura avvolgibile per aperture ampie. Il produttore indica una larghezza fino a 7 metri con un telo unico, da verificare in base ad altezza, supporti e caratteristiche del vano.',
    productUrl: `${sikurHome}/prodotti/il-frangisole-grandioso-giant/`,
    photo: {
      ...partnerPhoto,
      id: 'giant',
      category: 'Giant',
      alt: 'Ampia vetrata di un soggiorno con frangisole Giant parzialmente abbassato',
    } satisfies GalleryPhoto,
  },
  {
    id: 'evoline',
    need: 'Più protezione',
    name: 'Ibrida 2.0 EvoLine',
    category: 'Avvolgibile frangisole di sicurezza',
    headline: 'Schermatura e protezione in un solo sistema.',
    detail:
      'Abbina il controllo della luce a una tapparella di sicurezza con serratura automatica. Le varianti per il passaggio di aria e luce e la classe antieffrazione si valutano insieme, in base al modello.',
    productUrl: `${sikurHome}/prodotti/tapparella-frangisole-avvolgibile-di-sicurezza/`,
    photo: {
      ...partnerPhoto,
      id: 'evoline',
      category: 'Ibrida 2.0 EvoLine',
      alt: 'Camera da letto con due vetrate schermate da avvolgibili Ibrida EvoLine',
    } satisfies GalleryPhoto,
  },
] as const

export const shutterCatalogs = [
  {
    id: 'protection',
    title: 'Frangisole avvolgibili',
    detail: 'Schermature e avvolgibili per dosare la luce, anche sulle aperture più ampie.',
    url: `${sikurHome}/catalogo-casa-protetta`,
  },
  {
    id: 'security',
    title: 'Il massimo della sicurezza',
    detail: 'Avvolgibili e schermature di sicurezza, con le varianti di Ibrida 2.0 EvoLine.',
    url: `${sikurHome}/catalogo-casa-sicura`,
  },
] as const
