import type { BlogCategory, BlogPost } from '../types/blog'

export const blogCategories: readonly BlogCategory[] = [
  { id: 'infissi', label: 'Infissi' },
  { id: 'comfort', label: 'Comfort in casa' },
  { id: 'outdoor', label: 'Vivere all’aperto' },
  { id: 'porte', label: 'Porte e interni' },
  { id: 'manutenzione', label: 'Cura della casa' },
]

// Initial editorial proposals for the local blog. Review copy before publication.
// Image provenance and permissions are retained with the existing product assets.
export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'come-scegliere-infissi',
    category: 'infissi',
    title: 'Nuovi infissi? Comincia dalla tua casa.',
    excerpt:
      'Prima del materiale e del colore, ci sono la luce, gli spazi e le tue abitudini. Le domande da cui partire per scegliere con più consapevolezza.',
    image: {
      path: 'img/infissi/luce-metal-slim',
      widths: [640, 1280],
      width: 1280,
      height: 720,
      alt: 'Vetrata scorrevole dai profili sottili in un soggiorno affacciato sul mare',
      caption: 'Ambientazione COSMET · Alwo Luce Metal Slim.',
    },
  },
  {
    slug: 'pergola-o-tenda-da-sole',
    category: 'outdoor',
    title: 'Pergola o tenda da sole? Immagina il tuo spazio.',
    excerpt:
      'Un pranzo sul terrazzo, un angolo di lettura, più ombra nel pomeriggio. La scelta parte dal tuo modo di vivere all’aperto.',
    image: {
      path: 'img/atelier-gibus/pergole-bioclimatiche',
      widths: [480, 960, 1440],
      width: 1440,
      height: 810,
      alt: 'Pergola bioclimatica con lame orientabili sopra un tavolo in terrazza',
      caption: 'Ambientazione Gibus · Pergola bioclimatica.',
    },
  },
  {
    slug: 'porte-interne-spazi-e-finiture',
    category: 'porte',
    title: 'Porte interne: il dettaglio che unisce gli ambienti.',
    excerpt:
      'Aperture, finiture e passaggi di luce: come pensare alle porte insieme al resto della casa.',
    image: {
      path: 'img/interior-doors/rm-inc3l',
      widths: [480, 960, 1440],
      width: 1440,
      height: 1011,
      alt: 'Porta a filo parete bianca integrata in una boiserie contemporanea',
      caption: 'Ambientazione I-PEA Porte Design · RM-INC3L.',
    },
  },
  {
    slug: 'condensa-sui-vetri',
    category: 'comfort',
    title: 'Condensa sui vetri: da dove cominciare?',
    excerpt:
      'Osservare dove e quando compare è il primo passo. Una guida per capire il rapporto tra umidità, superfici fredde e ricambio d’aria.',
    image: {
      path: 'img/hero/windows',
      widths: [480, 960],
      width: 1000,
      height: 1000,
      alt: 'Finestra in legno affacciata su un giardino',
      caption:
        'Immagine di ambientazione già presente nel sito; non rappresenta un caso di condensa.',
    },
  },
  {
    slug: 'scegliere-zanzariere',
    category: 'comfort',
    title: 'La zanzariera giusta segue i tuoi gesti.',
    excerpt:
      'Una finestra e una portafinestra si usano in modo diverso. Passaggi, ingombri e apertura contano nella scelta.',
    image: {
      path: 'img/gallery-home/home-infissi-cucina',
      widths: [480, 960, 1448],
      width: 1448,
      height: 1086,
      alt: 'Portafinestra chiara affacciata sull’esterno in una cucina luminosa',
      caption:
        'Realizzazione LGE · Un ambiente con portafinestra, a illustrazione del passaggio verso l’esterno.',
    },
  },
  {
    slug: 'manutenzione-infissi-pvc',
    category: 'manutenzione',
    title: 'Piccoli gesti, ogni giorno. La cura degli infissi in PVC.',
    excerpt:
      'Pulizia delicata, guarnizioni e scarichi: cosa osservare per prenderti cura delle finestre nel tempo.',
    image: {
      path: 'img/infissi/vista',
      widths: [640, 1280],
      width: 1280,
      height: 923,
      alt: 'Portafinestra Vista in PVC con profili scuri in un soggiorno',
      caption: 'Ambientazione COSMET · Vista.',
    },
  },
]
