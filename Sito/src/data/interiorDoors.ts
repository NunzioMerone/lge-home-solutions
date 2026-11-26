import type { GalleryPhoto } from '../types/gallery'

const lacquerCatalogUrl = 'https://heyzine.com/flip-book/36ea2c97b4.html'
const glassCatalogUrl = 'https://heyzine.com/flip-book/21206e5c48.html'

// The manufacturer links these viewers from its official catalogue index.
export const ipeaCatalogs = [
  {
    id: 'lacquer',
    title: 'Laccate',
    detail:
      'Superfici lisce o incise, dal bianco alle tonalità più calde. Una porta può fondersi con la parete o introdurre un colore nuovo.',
    url: lacquerCatalogUrl,
  },
  {
    id: 'laminate',
    title: 'Laminati',
    detail:
      'Venature, toni effetto legno e finiture materiche da accostare al pavimento e all’arredo. Nel catalogo trovi, tra le altre, le varianti Noce e Spiga.',
    url: 'https://heyzine.com/flip-book/1b39a8ff61.html',
  },
  {
    id: 'glass',
    title: 'Vetro',
    detail:
      'Vetri trasparenti, satinati o decorati per far passare la luce e scegliere quanto lasciare in vista. Il catalogo include anche la linea Kombi in vetro e alluminio.',
    url: glassCatalogUrl,
  },
] as const

const catalogPhotoDefaults = {
  width: 1440,
  previewWidths: [480, 960, 1440],
  fullWidth: 1440,
  collection: 'interior-doors',
} as const

export const interiorDoorOpenings = [
  {
    id: 'swing',
    title: 'Battente',
    headline: 'Lo spazio per aprire.',
    detail:
      'Quando c’è spazio per la rotazione dell’anta, puoi scegliere il verso di apertura in base ai passaggi e alla disposizione dei mobili.',
    model: 'EV-PR',
    referenceUrl: `${lacquerCatalogUrl}#page/23`,
    photo: {
      ...catalogPhotoDefaults,
      id: 'ev-pr',
      category: 'I-PEA · EV-PR',
      alt: 'Porta a battente bianca laccata con maniglia a leva e cornice a vista',
      height: 1013,
      status: 'official-reference',
    } satisfies GalleryPhoto,
  },
  {
    id: 'sliding',
    title: 'Scorrevole',
    headline: 'Un passaggio più libero.',
    detail:
      'Utile nei passaggi stretti o dove vuoi tenere libera la zona vicino alla porta. L’anta può scorrere lungo la parete o rientrare al suo interno, se la struttura lo consente.',
    model: 'EV-UR · Essential',
    referenceUrl: `${lacquerCatalogUrl}#page/29`,
    photo: {
      ...catalogPhotoDefaults,
      id: 'ev-ur-essential',
      category: 'I-PEA · EV-UR Essential',
      alt: 'Porta scorrevole a scomparsa color tortora, parzialmente aperta',
      height: 1011,
      status: 'official-reference',
    } satisfies GalleryPhoto,
  },
  {
    id: 'flush',
    title: 'Raso parete',
    headline: 'In continuità con la parete.',
    detail:
      'L’anta si allinea alla parete. Puoi scegliere un colore simile per darle continuità, oppure una finitura a contrasto per metterla in risalto.',
    model: 'RM-INC3L',
    referenceUrl: `${lacquerCatalogUrl}#page/281`,
    photo: {
      ...catalogPhotoDefaults,
      id: 'rm-inc3l',
      category: 'I-PEA · RM-INC3L',
      alt: 'Porta raso parete integrata nella boiserie laccata bianca',
      height: 1011,
      status: 'partner-authorized',
    } satisfies GalleryPhoto,
  },
] as const
