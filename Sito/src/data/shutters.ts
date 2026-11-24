import type { ShutterGroup, ShutterSolution } from '../types/shutters'

const sikurHome = 'https://www.sikurhome.it'
const cosmetShutterBrochure = {
  label: 'Sfoglia la brochure COSMET',
  url: 'https://cosmetgroup.it/wp-content/uploads/2026/07/Alwo-Flyer-A4-5-ante_Persiane-Aurora-Astra-Luna-980X301.pdf',
}

const photoSizes = {
  width: 1440,
  previewWidths: [480, 960, 1440],
  fullWidth: 1440,
} as const

const rollerShutter: ShutterSolution = {
  name: 'Avvolgibili',
  headline: 'Luce e privacy, durante tutta la giornata.',
  detail:
    'Le tapparelle avvolgibili scorrono nelle guide laterali e si raccolgono nel cassonetto. Le versioni frangisole lasciano filtrare luce e aria anche a telo abbassato. Per chi cerca più protezione, esistono modelli di sicurezza con chiusura automatica.',
  references: [
    {
      label: 'Vedi la scheda EvoLine',
      url: `${sikurHome}/prodotti/tapparella-frangisole-avvolgibile-di-sicurezza/`,
    },
  ],
  caption: 'Ambientazione Ibrida 2.0 EvoLine',
  photo: {
    ...photoSizes,
    height: 957,
    collection: 'sikur-home',
    status: 'partner-authorized',
    id: 'evoline',
    category: 'Avvolgibili',
    alt: 'Camera da letto con due vetrate schermate da avvolgibili Ibrida EvoLine',
  },
}

const rollerAccessories = [
  {
    name: 'Cassonetti',
    headline: 'Il vano del rullo, isolato e accessibile.',
    detail:
      'Il cassonetto ospita il rullo sopra la finestra. Un modello coibentato aiuta a limitare le dispersioni attorno al vano. Se stai ristrutturando, si valutano gli ingombri e l’accesso al rullo per la manutenzione, anche quando si sostituisce un cassonetto esistente.',
    references: [
      {
        label: 'Vedi la scheda EcoBox',
        url: `${sikurHome}/prodotti/monoblocco-cassonetto-isolante/`,
      },
    ],
    caption: 'Dettaglio del monoblocco EcoBox',
    photo: {
      ...photoSizes,
      height: 957,
      collection: 'sikur-home',
      status: 'official-reference',
      id: 'ecobox',
      category: 'Cassonetti',
      alt: 'Cassonetto isolante del monoblocco EcoBox sopra un avvolgibile',
    },
  },
  {
    name: 'Motori',
    headline: 'Apri e chiudi con un comando.',
    detail:
      'Il motore tubolare si inserisce nel rullo e aziona l’avvolgibile. A seconda del modello, puoi comandarlo da un pulsante a parete, con un telecomando o tramite un impianto domotico compatibile. La scelta dipende dal peso del telo, dalle dimensioni del rullo e dall’alimentazione disponibile.',
    references: [
      {
        label: 'Approfondisci le motorizzazioni',
        url: 'https://www.somfy.it/prodotti/tapparelle/motori',
      },
    ],
    caption: 'Somfy LT50 · immagine illustrativa',
    photo: {
      ...photoSizes,
      height: 960,
      collection: 'shutters',
      status: 'illustrative',
      id: 'somfy-lt50',
      category: 'Motori',
      alt: 'Motore tubolare Somfy LT50 blu con testata gialla, accanto a un rullo metallico',
    },
  },
] as const satisfies readonly [ShutterSolution, ...ShutterSolution[]]

export const shutterGroups: readonly [ShutterGroup, ...ShutterGroup[]] = [
  {
    id: 'roller',
    name: 'Avvolgibili',
    overview: rollerShutter,
    optionsLabel: 'Componenti degli avvolgibili',
    options: rollerAccessories,
  },
  {
    id: 'hinged',
    name: 'Battenti',
    optionsLabel: 'Materiale delle persiane a battente',
    options: [
      {
        name: 'Alluminio',
        headline: 'Persiane a battente COSMET.',
        detail:
          'Aurora è una persiana in alluminio con ante a battente, disponibile con lamelle fisse o orientabili. Le lamelle orientabili permettono di dosare luce e aria ad ante chiuse. Colore e finitura si scelgono in base alla facciata.',
        references: [
          { label: 'Scopri la persiana Aurora', url: 'https://cosmetgroup.it/aurora/' },
          cosmetShutterBrochure,
        ],
        caption: 'Ambientazione COSMET · Aurora',
        photo: {
          id: 'cosmet-aurora',
          collection: 'shutters',
          status: 'official-reference',
          category: 'Persiane a battente in alluminio',
          alt: 'Persiana in alluminio Aurora marrone a due ante su una terrazza',
          width: 1000,
          height: 1000,
          previewWidths: [480, 960],
          fullWidth: 1000,
        },
      },
      {
        name: 'Acciaio',
        headline: 'Persiane a battente in acciaio.',
        detail:
          'Le ante in acciaio sono una scelta quando si cerca una schermatura robusta. Le lamelle fisse filtrano la luce e limitano la vista dall’esterno anche ad ante chiuse. Peso delle ante, cerniere e fissaggi si valutano in base alle misure e alla muratura.',
        references: [],
        caption: 'Foto LGE · Persiane a battente',
        photo: {
          ...photoSizes,
          height: 1080,
          collection: 'shutters',
          status: 'user-provided',
          id: 'lge-persiane-balcone',
          category: 'Persiane a battente',
          alt: 'Persiane a battente marroni aperte lungo un balcone',
        },
      },
    ],
  },
]

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
  {
    id: 'cosmet-shutters',
    title: 'Persiane in alluminio COSMET',
    detail: 'Brochure Aurora, Astra e Luna.',
    url: cosmetShutterBrochure.url,
  },
] as const
