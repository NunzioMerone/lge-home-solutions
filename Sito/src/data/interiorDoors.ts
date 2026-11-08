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
  status: 'partner-authorized',
} as const

export const interiorDoorOpenings = [
  {
    id: 'swing',
    title: 'A battente',
    headline: 'Lo spazio per aprire.',
    detail:
      'Quando c’è spazio per la rotazione dell’anta, puoi scegliere il verso di apertura in base ai passaggi e alla disposizione dei mobili.',
    model: 'Turtle',
    referenceUrl: `${glassCatalogUrl}#page/9`,
    photo: {
      ...catalogPhotoDefaults,
      id: 'turtle',
      category: 'I-PEA · Turtle',
      alt: 'Porta a battente in vetro satinato con motivo geometrico',
      height: 1345,
    } satisfies GalleryPhoto,
  },
  {
    id: 'sliding',
    title: 'Scorrevole',
    headline: 'Un passaggio più libero.',
    detail:
      'Utile nei passaggi stretti o dove vuoi tenere libera la zona vicino alla porta. L’anta può scorrere lungo la parete o rientrare al suo interno, se la struttura lo consente.',
    model: 'Float',
    referenceUrl: `${glassCatalogUrl}#page/19`,
    photo: {
      ...catalogPhotoDefaults,
      id: 'float',
      category: 'I-PEA · Float',
      alt: 'Ante scorrevoli in vetro trasparente tra due ambienti',
      height: 1345,
    } satisfies GalleryPhoto,
  },
  {
    id: 'flush',
    title: 'A filo parete',
    headline: 'In continuità con la parete.',
    detail:
      'L’anta si allinea alla parete. Puoi scegliere un colore simile per darle continuità, oppure una finitura a contrasto per metterla in risalto.',
    model: 'RM-INC3L',
    referenceUrl: `${lacquerCatalogUrl}#page/281`,
    photo: {
      ...catalogPhotoDefaults,
      id: 'rm-inc3l',
      category: 'I-PEA · RM-INC3L',
      alt: 'Porta a filo parete integrata nella boiserie laccata bianca',
      height: 1011,
    } satisfies GalleryPhoto,
  },
] as const
