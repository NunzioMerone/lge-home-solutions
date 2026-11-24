import type { GalleryPhoto } from '../types/gallery'
import type { GibusCatalogGroupDefinition } from '../types/atelierGibus'
import { gibusGalleryPhotos } from './gibusGalleryPhotos'

export const gibusCatalogUrl = 'https://www.gibus.com/it/cataloghi/'
export const outdoorShowcaseId = 'gibus-soluzioni'
export const gibusCatalogsId = 'cataloghi-gibus'

const solutions = [
  {
    id: 'pergole-bioclimatiche',
    photoStatus: 'partner-authorized',
    title: 'Pergole bioclimatiche',
    feature: 'Luce e ombra, in armonia.',
    description:
      'Le lame orientabili permettono di regolare luce e ventilazione, creando il giusto equilibrio tra luce e ombra.',
    use: 'Uno spazio da vivere al tuo ritmo, dalla colazione all’aperto ai momenti di relax.',
    productUrl: 'https://www.gibus.com/it/prodotti/pergole-bioclimatiche/',
    catalogUrl:
      'https://backoffice.gibus.it/c56a022b15250525f8b9bdfc41a13152/MmUwMWEyM2ViOGI2NzNhNDBkMGUwNTFmNTI5ZDhhMzAzZThiZTZjZDc1YzM3ZGUxNTVkYzUwZDZkZDkwYjc4MA--/pergole_bioclimatiche_IT_EN_web.pdf',
    photoAlt: 'Lame aperte di una pergola bioclimatica sopra un tavolo in terrazza',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'energy-pergola',
    photoStatus: 'official-reference',
    title: 'Energy Pergola',
    feature: 'Il sole, una risorsa in più.',
    description:
      'La pergola bioclimatica integra moduli fotovoltaici nella copertura, affiancando la produzione di energia alla gestione di luce e ombra.',
    use: 'Una soluzione da valutare insieme, considerando lo spazio e il progetto dell’impianto.',
    productUrl: 'https://www.gibus.com/it/energy-pergola/',
    catalogUrl:
      'https://backoffice.gibus.it/679d8bbd776e0bbf3b044306c5be94ae/M2IzZTZkMTI4YTQyYjY2MDgyMDhhNGIxMWM2OGQwOGY4ZjZkMWY0ZjEyZWNkODVkNTRlYWNkOWFlMGVhOTU1Nw--/energy_pergola_IT-EN_web.pdf',
    photoAlt: 'Pergola Gibus con pannelli fotovoltaici sopra una zona pranzo in giardino',
    photoWidth: 1440,
    photoHeight: 598,
  },
  {
    id: 'pergole-inclinate',
    photoStatus: 'official-reference',
    title: 'Pergole inclinate',
    feature: 'In armonia con la tua casa.',
    description:
      'Una copertura in telo impacchettabile con pendenza, pensata per accompagnare le linee della facciata.',
    use: 'Per dare ombra a un terrazzo o a uno spazio addossato alla casa, con una struttura da progettare su misura.',
    productUrl: 'https://www.gibus.com/it/prodotti/pergole/pergole-inclinate-addossate/',
    catalogUrl:
      'https://backoffice.gibus.it/298f587406c914fad5373bb689300433/MmYyOGQwYzg2ZmU3MGIxY2EzMDJmNzVjMzY0MDg4MzAwODFiYjVmOWM0NjIwMmJiM2I2ZjRiY2ZhY2I5Njg4ZQ--/pergole_inclinate_IT_EN_web.pdf',
    photoAlt: 'Pergola Gibus inclinata addossata alla facciata con copertura in telo',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'pergole-90',
    photoStatus: 'partner-authorized',
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
    photoStatus: 'partner-authorized',
    title: 'Tende a bracci',
    feature: 'L’ombra che lascia spazio.',
    description:
      'Si aprono per ripararti dal sole e si richiudono quando desideri più luce, senza sostegni a terra.',
    use: 'Più comfort su balconi e terrazzi, con la libertà di arredarli e viverli come preferisci.',
    productUrl: 'https://www.gibus.com/it/prodotti/tende-da-sole/tende-a-bracci/',
    catalogUrl:
      'https://backoffice.gibus.it/13e36f06c66134ad65f532e90d898545/NjVkM2MzMzUxZDM5ZjY3ZjY1OWZjMjQ4MGQ3NjU2YmEyNWJlODliM2MzNTUyYWFlZWYwNDRiNTViNGFmMjE4MQ--/tende_bracci_IT_EN_web.pdf',
    photoAlt: 'Tenda a bracci aperta sopra la terrazza di una casa contemporanea',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'tende-a-caduta',
    photoStatus: 'official-reference',
    title: 'Tende a caduta',
    feature: 'L’ombra segue la facciata.',
    description:
      'Il telo scende in verticale per schermare finestre, balconi e superfici vetrate, lasciando libero lo spazio davanti alla casa.',
    use: 'Per modulare il sole e la riservatezza, scegliendo il tessuto e la configurazione adatti all’esposizione.',
    productUrl: 'https://www.gibus.com/it/prodotti/tende-da-sole/tende-a-caduta/',
    catalogUrl:
      'https://backoffice.gibus.it/f8f122d50eba11c3af5607575b277bc6/MmMwNWYwMGYxOWRiNzI3Y2M5ODAxNDI3YmUwOGQ1ODNhZTY5ZjYyODljODZmZTkwZjQ0ZjQ2MzljNWFjZDIyZA--/tende_a_caduta_IT-EN_web.pdf',
    photoAlt: 'Tende a caduta verticali sulla facciata vetrata di una casa con piscina',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'schermature-zip',
    photoStatus: 'official-reference',
    title: 'Schermature Zip',
    feature: 'Più controllo sulla luce.',
    description:
      'Le guide laterali con sistema Zip accompagnano il telo lungo la discesa, per schermare finestre, vetrate e pergole.',
    use: 'Tessuti ombreggianti, oscuranti o altre configurazioni si scelgono in base allo spazio e all’uso desiderato.',
    productUrl: 'https://www.gibus.com/it/prodotti/tende-da-sole/schermature-zip-screen/',
    catalogUrl:
      'https://backoffice.gibus.it/79f69230354b71206fb723c571cce58b/ZGVjYzEyYTQyNzNmYTk5YThiMDM4OGI5OWQ5NzhmMDkzNDJlNWM2ZjdiNDVhYWZjMDAwMDliM2YwZjhhNTM3MQ--/Click_zip_IT_EN_web.pdf',
    photoAlt: 'Schermature Gibus Zip davanti alle finestre di un’abitazione contemporanea',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'tende-in-trazione',
    photoStatus: 'official-reference',
    title: 'Tende in trazione',
    feature: 'Un telo, nuove possibilità.',
    description:
      'Il tessuto teso si estende sopra lo spazio da ombreggiare e si raccoglie nel cassonetto quando non serve.',
    use: 'Per coperture e superfici vetrate da vivere con una luce più controllata, secondo la configurazione del modello.',
    productUrl: 'https://www.gibus.com/it/prodotti/tende-da-sole/tende-in-trazione-nivo/',
    catalogUrl:
      'https://backoffice.gibus.it/ac3870fcad1cfc367825cda0101eee62/MjNiN2FhNTQxODE4MmQwZTkxYzFjOWQwZjkyYjg1MGMzZDVmOGQ4ZDAzNjZhYjNlYzI3MmVmOWIyNzA3ZTZjMg--/2026_Nivo_IT-EN.pdf',
    photoAlt: 'Tenda Gibus in trazione su una struttura antracite davanti a un soggiorno',
    photoWidth: 1440,
    photoHeight: 810,
  },
  {
    id: 'vetrate-scorrevoli',
    photoStatus: 'partner-authorized',
    title: 'Vetrate scorrevoli',
    feature: 'Al riparo, con la vista aperta.',
    description:
      'Vetrate scorrevoli che riparano da acqua e vento, senza rinunciare alla luce e al panorama.',
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
  ({ photoAlt, photoWidth, photoHeight, photoStatus, ...solution }) => {
    const cover: GalleryPhoto = {
      id: solution.id,
      category: solution.title,
      alt: photoAlt,
      width: photoWidth,
      height: photoHeight,
      previewWidths: photoWidth > 960 ? [480, 960, photoWidth] : [480, photoWidth],
      fullWidth: photoWidth,
      collection: 'atelier-gibus',
      status: photoStatus,
    }
    const gallery = gibusGalleryPhotos[solution.id].map((photo): GalleryPhoto => ({
      ...photo,
      category: solution.title,
      previewWidths: photo.width > 960 ? [480, 960, photo.width] : [480, photo.width],
      fullWidth: photo.width,
      collection: 'atelier-gibus',
      status: 'official-reference',
    }))
    return { ...solution, photos: [cover, ...gallery] as const }
  },
)

const catalogGroupDefinitions: readonly GibusCatalogGroupDefinition[] = [
  {
    id: 'pergole',
    title: 'Pergole',
    solutionIds: ['pergole-bioclimatiche', 'energy-pergola', 'pergole-inclinate', 'pergole-90'],
  },
  {
    id: 'tende',
    title: 'Tende e schermature',
    solutionIds: ['tende-a-bracci', 'tende-a-caduta', 'schermature-zip', 'tende-in-trazione'],
  },
  { id: 'vetrate', title: 'Vetrate', solutionIds: ['vetrate-scorrevoli'] },
]

export const gibusCatalogGroups = catalogGroupDefinitions.map(({ solutionIds, ...group }) => ({
  ...group,
  solutions: outdoorSolutions.filter((solution) => solutionIds.includes(solution.id)),
}))
