import type { GalleryPhoto } from '../types/gallery'

export const gibusCatalogUrl = 'https://www.gibus.com/it/cataloghi/'
export const outdoorShowcaseId = 'gibus-soluzioni'

const solutions = [
  {
    id: 'pergole-bioclimatiche',
    title: 'Pergole bioclimatiche',
    feature: 'Luce e ombra, in armonia.',
    description:
      'Le lame orientabili permettono di regolare luce e ventilazione, creando il giusto equilibrio tra sole e ombra.',
    use: 'Uno spazio da vivere al tuo ritmo, dalla colazione all’aperto ai momenti di relax.',
    productUrl: 'https://www.gibus.com/it/prodotti/pergole-bioclimatiche/',
    catalogUrl:
      'https://backoffice.gibus.it/c56a022b15250525f8b9bdfc41a13152/MmUwMWEyM2ViOGI2NzNhNDBkMGUwNTFmNTI5ZDhhMzAzZThiZTZjZDc1YzM3ZGUxNTVkYzUwZDZkZDkwYjc4MA--/pergole_bioclimatiche_IT_EN_web.pdf',
    photoAlt: 'Lame aperte di una pergola bioclimatica sopra un tavolo in terrazza',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'pergole-90',
    title: 'Pergole a 90°',
    feature: 'Il cielo, quando vuoi.',
    description:
      'La copertura in telo offre ombra quando serve e si raccoglie per lasciare spazio al cielo.',
    use: 'Linee essenziali per creare sul terrazzo una zona pranzo o un angolo dedicato al relax.',
    productUrl: 'https://www.gibus.com/it/prodotti/pergole/pergole-90-gradi/',
    catalogUrl:
      'https://backoffice.gibus.it/acff1af62d0f91f4be73f4857552d70c/MGYwOWUyMDM0NTU1YzIyNTdhZTlmNjc5ZWIwMDViYTUyNDAzOGVkNmQwM2U1YjdlYmU0NDM4M2RhOTNkYzA2OQ--/pergola_90_IT-EN_web.pdf',
    photoAlt: 'Telo disteso della pergola Zenit sopra un salotto in terrazza',
    photoWidth: 940,
    photoHeight: 540,
  },
  {
    id: 'tende-a-bracci',
    title: 'Tende a bracci',
    feature: 'L’ombra che lascia spazio.',
    description:
      'Si aprono per ripararti dal sole e si richiudono quando desideri più luce, senza sostegni a terra.',
    use: 'Più comfort su balconi e terrazzi, con la libertà di arredarli e viverli come preferisci.',
    productUrl: 'https://www.gibus.com/it/prodotti/tende-e-oscuranti/tende-a-bracci/',
    catalogUrl:
      'https://backoffice.gibus.it/13e36f06c66134ad65f532e90d898545/NjVkM2MzMzUxZDM5ZjY3ZjY1OWZjMjQ4MGQ3NjU2YmEyNWJlODliM2MzNTUyYWFlZWYwNDRiNTViNGFmMjE4MQ--/tende_bracci_IT_EN_web.pdf',
    photoAlt: 'Tenda a bracci aperta sopra la terrazza di una casa contemporanea',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'vetrate-scorrevoli',
    title: 'Vetrate scorrevoli',
    feature: 'Al riparo, con la vista aperta.',
    description:
      'Vetrate scorrevoli che riparano dal vento, senza rinunciare alla luce e al panorama.',
    use: 'Per aprire pergole e portici verso l’esterno o renderli più riparati, secondo le tue esigenze.',
    productUrl: 'https://www.gibus.com/it/prodotti/vetrate/',
    catalogUrl:
      'https://backoffice.gibus.it/394868456436dbe743e4380554c0493a/MjJjYzlkYTdjZTkxMjNmMWVhNzYwMTViMzMxZTZhYmZmZTlhYTdmZWEyNzlhY2RhZDg4ODM5ODhkNDY5NzBjOQ--/vetrate_IT_EN_web.pdf',
    photoAlt: 'Vetrate panoramiche a tutta altezza di un padiglione affacciato sul giardino',
    photoWidth: 1440,
    photoHeight: 810,
  },
] as const

export const outdoorSolutions = solutions.map(
  ({ photoAlt, photoWidth, photoHeight, ...solution }) => ({
    ...solution,
    photo: {
      id: solution.id,
      category: solution.title,
      alt: photoAlt,
      width: photoWidth,
      height: photoHeight,
      previewWidths: photoWidth > 960 ? [480, 960, photoWidth] : [480, photoWidth],
      fullWidth: photoWidth,
      collection: 'atelier-gibus',
      status: 'partner-authorized',
    } satisfies GalleryPhoto,
  }),
)
