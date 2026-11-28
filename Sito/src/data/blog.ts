import type { BlogCategory, BlogPost } from '../types/blog'

export const blogCategories: readonly BlogCategory[] = [
  { id: 'infissi', label: 'Infissi' },
  { id: 'comfort', label: 'Comfort in casa' },
  { id: 'sicurezza', label: 'Sicurezza' },
  { id: 'outdoor', label: 'Vivere all’aperto' },
  { id: 'porte', label: 'Porte e interni' },
  { id: 'manutenzione', label: 'Cura della casa' },
]

// Initial editorial proposals for the local blog. Review copy before publication.
// Image provenance and permissions are retained with the existing product assets.
export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'spifferi-dalle-finestre',
    publication: { status: 'draft' },
    category: 'comfort',
    otherCategories: ['infissi'],
    title: 'Perché sento uno spiffero anche con la finestra chiusa?',
    seoTitle: 'Spifferi dalle finestre chiuse, cause e controlli — LGE',
    seoDescription:
      'Senti aria vicino alla finestra chiusa? Scopri come distinguere un vetro freddo da uno spiffero e quando far controllare guarnizioni, telaio o cassonetto.',
    excerpt:
      'Un filo d’aria vicino alla maniglia e una corrente fredda ai piedi della vetrata possono avere cause diverse. Ecco cosa osservare prima di intervenire.',
    image: {
      path: 'img/infissi/fideal-vision',
      widths: [640, 1280],
      width: 1280,
      height: 720,
      alt: 'Due portefinestre a battente accanto a un divano in soggiorno',
      caption: 'Ambientazione COSMET · Portefinestre Vision a battente.',
    },
  },
  {
    slug: 'come-scegliere-porta-blindata',
    publication: { status: 'draft' },
    category: 'sicurezza',
    otherCategories: ['porte'],
    title: 'Come scegliere una porta blindata per casa?',
    seoTitle: 'Come scegliere una porta blindata in classe 3 o 4 — LGE',
    seoDescription:
      'Che differenza c’è tra una porta blindata RC3 e una RC4? Scopri come leggere la classe di resistenza e cosa verificare nel preventivo per il tuo ingresso.',
    excerpt:
      'Che cosa cambia tra classe 3 e classe 4, come valutare il tuo ingresso e quali dettagli cercare nel preventivo.',
    image: {
      path: 'img/effepi/hinges-visible',
      widths: [480, 800],
      width: 800,
      height: 545,
      alt: 'Porta blindata avorio con cerniere a vista sul lato sinistro',
      caption: 'Ambientazione Effepi · Garante Multi CL.',
    },
  },
  {
    slug: 'pergola-o-tenda-da-sole',
    publication: { status: 'draft' },
    category: 'outdoor',
    title: 'Pergola o tenda da sole? Immagina il tuo spazio.',
    seoTitle: 'Pergola o tenda da sole per il terrazzo? — LGE',
    seoDescription:
      'Confronta l’ombra di una tenda a bracci con quella di una pergola. Esposizione al sole, ingombri e arredi ti aiutano a scegliere la copertura per il terrazzo.',
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
    slug: 'condensa-sui-vetri',
    publication: { status: 'draft' },
    category: 'comfort',
    otherCategories: ['infissi'],
    title: 'Perché si forma la condensa sui vetri?',
    seoTitle: 'Condensa sul vetro interno, esterno o tra le lastre — LGE',
    seoDescription:
      'Gocce in cucina, vetro appannato al mattino o un alone tra le lastre? Il lato su cui compare la condensa aiuta a capire quando arieggiare e quando intervenire.',
    excerpt:
      'L’acqua si asciuga passando un panno o sembra intrappolata nel doppio vetro? Riconosci i tre casi e capisci cosa fare per ciascuno.',
    image: {
      path: 'img/hero/windows',
      widths: [480, 960],
      width: 960,
      height: 960,
      alt: 'Portafinestra a due ante affacciata su un giardino',
      caption: 'Portafinestra a due ante vista dal soggiorno. Immagine di ambientazione.',
    },
  },
  {
    slug: 'come-scegliere-avvolgibili-di-sicurezza',
    publication: { status: 'draft' },
    category: 'sicurezza',
    title: 'Come riconoscere una tapparella di sicurezza?',
    seoTitle: 'Come scegliere una tapparella di sicurezza per casa — LGE',
    seoDescription:
      'Scopri dove leggere la classe antieffrazione di un avvolgibile, come scegliere il passaggio di luce e quali misure verificare per utilizzare il vecchio cassonetto.',
    excerpt:
      'Il motore alza la tapparella. La classe RC ti dice come ha resistito alle prove. Cosa chiedere quando confronti due modelli per la stessa finestra.',
    image: {
      path: 'img/sikur-home/evoline',
      widths: [480, 960, 1440],
      width: 1440,
      height: 957,
      alt: 'Due vetrate di una camera da letto schermate dagli avvolgibili Ibrida EvoLine',
      caption: 'Ambientazione Sikur Home · Ibrida 2.0 EvoLine.',
    },
  },
  {
    slug: 'porta-ingresso-isolamento-termico',
    publication: { status: 'draft' },
    category: 'porte',
    otherCategories: ['comfort'],
    title: 'Come scegliere una porta d’ingresso termica?',
    seoTitle: 'Come scegliere una porta d’ingresso termica con il valore Ud — LGE',
    seoDescription:
      'Leggi il valore Ud della porta completa e scopri cosa controllare per spifferi, soglia e tenuta alla pioggia quando scegli un portoncino per l’esterno.',
    excerpt:
      'Dal valore Ud alla corrente che senti sotto la soglia, ecco cosa controllare per scegliere una porta che protegga l’ingresso dal freddo.',
    image: {
      path: 'img/tehni/tls-90',
      widths: [480, 800],
      width: 800,
      height: 545,
      alt: 'Portoncino grigio con inserti in vetro sotto un portico',
      caption: 'Ambientazione TEHNi · Sistema TLS 90.',
    },
  },
  {
    slug: 'come-scegliere-infissi',
    publication: { status: 'draft' },
    category: 'infissi',
    title: 'Nuovi infissi? Comincia dalla tua casa.',
    seoTitle: 'Come scegliere gli infissi di casa — LGE',
    seoDescription:
      'Battente o scorrevole? Dal posto occupato dall’anta alla luce che entra in casa, ecco cosa osservare prima di confrontare materiali e finiture degli infissi.',
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
    slug: 'porte-interne-spazi-e-finiture',
    publication: { status: 'draft' },
    category: 'porte',
    title: 'Porte interne: il dettaglio che unisce gli ambienti.',
    seoTitle: 'Come scegliere apertura e finitura delle porte interne — LGE',
    seoDescription:
      'Valuta lo spazio per un’anta a battente o scorrevole e confronta i campioni con il pavimento. Scopri come luce e privacy orientano la scelta delle porte.',
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
    slug: 'manutenzione-infissi-pvc',
    publication: { status: 'draft' },
    category: 'manutenzione',
    otherCategories: ['infissi'],
    title: 'Piccoli gesti, ogni giorno. La cura degli infissi in PVC.',
    seoTitle: 'Come pulire e mantenere gli infissi in PVC — LGE',
    seoDescription:
      'Come pulire i profili in PVC, controllare le guarnizioni e tenere liberi gli scarichi. Scopri quando una maniglia dura o un’anta che sfrega richiedono una verifica.',
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
