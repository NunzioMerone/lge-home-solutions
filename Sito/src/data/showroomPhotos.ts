import type { GalleryPhoto } from '../types/gallery'

function showroomPhoto(
  id: string,
  category: string,
  alt: string,
  width: number,
  height: number,
): GalleryPhoto {
  return {
    id,
    category,
    alt,
    width,
    height,
    previewWidths: [480, Math.min(width, 960)],
    fullWidth: width,
    collection: 'showroom/retouched',
    status: 'user-provided',
  }
}

export const showroomPhotos = [
  showroomPhoto(
    'gibus-pergola-frontale',
    'Outdoor',
    'Pergola Gibus con illuminazione integrata e vetrata laterale nello showroom',
    1024,
    739,
  ),
  showroomPhoto(
    'porte-interne-esposizione',
    'Porte interne',
    'Porte interne in diverse finiture esposte sotto la volta dello showroom',
    1024,
    768,
  ),
  showroomPhoto(
    'gibus-pergola-lamelle-illuminate',
    'Outdoor',
    'Pergola Gibus con lamelle illuminate, vetrata e campionari',
    1024,
    768,
  ),
  showroomPhoto(
    'porta-blindata-finitura-legno',
    'Porte d’ingresso',
    'Porta blindata con finitura legno e incisioni geometriche',
    1024,
    768,
  ),
  showroomPhoto(
    'gibus-tenda-e-sezioni-tecniche',
    'Outdoor',
    'Tenda Gibus aperta sopra una selezione di sezioni tecniche in alluminio',
    1024,
    768,
  ),
  showroomPhoto(
    'porte-interne-prospettiva',
    'Porte interne',
    'Porte interne viste in prospettiva con anta bianca venata in primo piano',
    758,
    941,
  ),
  showroomPhoto(
    'gibus-campionari-e-profili',
    'Outdoor',
    'Cataloghi Gibus e campioni di profili per pergole e schermature',
    1024,
    768,
  ),
  showroomPhoto(
    'porta-grigia-e-maniglie',
    'Porte interne',
    'Porta interna grigia accanto a un campionario di maniglie e finiture',
    756,
    1024,
  ),
  showroomPhoto(
    'sezioni-infissi-in-vetrina',
    'Infissi',
    'Vetrina dello showroom con sezioni di telai per infissi',
    742,
    991,
  ),
  showroomPhoto(
    'porta-blindata-dettaglio',
    'Porte d’ingresso',
    'Dettaglio della finitura scura e del bordo di una porta blindata',
    768,
    1024,
  ),
] as const
