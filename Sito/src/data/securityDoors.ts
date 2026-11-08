export const tehniCatalogIndex = 'https://tehni.eu/it/downloads/'

export const securityDoorSystems = [
  {
    id: 'tls-90',
    name: 'TLS 90',
    eyebrow: 'PORTA D’INGRESSO IN ALLUMINIO',
    headline: 'La porta di ogni giorno.',
    description:
      'Una porta a battente da abbinare alla facciata. Nel configuratore puoi confrontare i telai, scegliere la finitura e decidere quanta luce far entrare con gli inserti in vetro.',
    catalogDescription:
      'Telai, pannelli, vetri e accessori per le porte a battente della famiglia TLS.',
    photoAlt: 'Ingresso TEHNi TLS 90 con porta grigia e inserti vetrati sotto un portico',
    configurator: 'https://mydoormaker.com/it/configurator/',
    catalog: 'https://tehni.eu/wp-content/uploads/TLS-2025-04.pdf',
  },
  {
    id: 'multiframe',
    name: 'Multiframe',
    eyebrow: 'VERSIONE SECURITY',
    headline: 'Protezione con il tuo stile.',
    description:
      'Multiframe comprende la versione Security, con rivestimenti in alluminio, legno, vetro o pannello composito. Usa il configuratore per confrontare materiali, dimensioni e maniglie.',
    catalogDescription:
      'Le versioni del sistema Multiframe, inclusa Security, con telai e rivestimenti.',
    photoAlt:
      'Porta d’ingresso TEHNi Multiframe effetto legno su una parete scura accanto a una siepe',
    configurator: 'https://multi.mydoormaker.com/it/configurator/',
    catalog: 'https://tehni.eu/wp-content/uploads/TEHNi-MULTI-2025.pdf',
  },
  {
    id: 'pivot',
    name: 'Superior Pivot',
    eyebrow: 'APERTURA A BILICO',
    headline: 'Un nuovo modo di entrare.',
    description:
      'L’anta ruota su un asse verticale e cambia la percezione dell’ingresso. Prova proporzioni, rivestimenti e accessori per capire come la porta dialoga con la facciata.',
    catalogDescription:
      'Porte a bilico, modelli di grandi dimensioni, materiali e opzioni di apertura.',
    photoAlt: 'Porta TEHNi Superior Pivot scura, aperta a bilico tra colonne in pietra',
    configurator: 'https://mypivotmaker.com/',
    catalog: 'https://tehni.eu/wp-content/uploads/SuperiorPivotCatalog-2025.pdf',
  },
] as const

export const securityDoorChecks = [
  {
    icon: 'shield',
    title: 'Serratura e resistenza',
    detail: 'Valutiamo la serratura e la classe antieffrazione documentata per la porta scelta.',
  },
  {
    icon: 'thermal',
    title: 'Tenuta e isolamento',
    detail: 'Consideriamo quanto l’ingresso è esposto al sole, al vento e alla pioggia.',
  },
  {
    icon: 'craft',
    title: 'Soglia e posa',
    detail: 'Verifichiamo il passaggio utile, il verso di apertura e il raccordo con il pavimento.',
  },
] as const
