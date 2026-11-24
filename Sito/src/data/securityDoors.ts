import type { SecurityDoorMaterial, SecurityDoorSystem } from '../types/securityDoors'

const effepi = 'https://www.effepisecuritydoors.com'

const aluminiumSystems = [
  {
    id: 'tls-90',
    name: 'TLS 90',
    eyebrow: 'PORTA D’INGRESSO IN ALLUMINIO',
    headline: 'La porta di ogni giorno.',
    description:
      'Una porta a battente da abbinare alla facciata. Nel configuratore puoi confrontare i telai, scegliere la finitura e decidere quanta luce far entrare con gli inserti in vetro.',
    catalogDescription: 'Telai, pannelli, vetri e accessori.',
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
    catalogDescription: 'Varianti Multiframe, inclusa Security.',
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
    catalogDescription: 'Porte a bilico e opzioni di apertura.',
    photoAlt: 'Porta TEHNi Superior Pivot scura, aperta a bilico tra colonne in pietra',
    configurator: 'https://mypivotmaker.com/',
    catalog: 'https://tehni.eu/wp-content/uploads/SuperiorPivotCatalog-2025.pdf',
  },
] as const satisfies readonly [SecurityDoorSystem, ...SecurityDoorSystem[]]

export const securityDoorMaterials: readonly [SecurityDoorMaterial, ...SecurityDoorMaterial[]] = [
  {
    id: 'aluminium',
    label: 'Alluminio a taglio termico',
    brand: 'TEHNi',
    photoDirectory: 'tehni',
    catalogFormat: 'PDF',
    catalogIndex: 'https://tehni.eu/it/downloads/',
    systems: aluminiumSystems,
  },
  {
    id: 'steel',
    label: 'Blindato in acciaio',
    brand: 'Effepi',
    photoDirectory: 'effepi',
    catalogFormat: 'Online',
    catalogIndex: `${effepi}/download`,
    systems: [
      {
        id: 'hinges-concealed',
        name: 'Cerniere a scomparsa',
        eyebrow: 'BLINDATE EFFEPI · IMMENSA',
        headline: 'Cerniere a scomparsa.',
        description:
          'Con la porta chiusa, le cerniere restano nascoste tra anta e telaio. Nella versione Immensa Rasomuro, la superficie della porta si allinea alla parete, così l’ingresso si integra con le finiture della stanza.',
        catalogDescription: 'Immensa, Immensa Rasomuro e Hide System Kit.',
        photoAlt: 'Porta blindata Effepi Immensa Rasomuro grigia a filo parete in un soggiorno',
        catalog: `${effepi}/cataloghi/cerniere_a_scomparsa/`,
      },
      {
        id: 'hinges-visible',
        name: 'Cerniere a vista',
        eyebrow: 'BLINDATE EFFEPI · GARANTE MULTI CL',
        headline: 'Cerniere a vista.',
        description:
          'Le cerniere restano visibili sul lato di apertura. La gamma Effepi comprende porte a una o due ante, con diversi sistemi di chiusura e rivestimenti. Garante Multi CL è un esempio a un’anta con rivestimento della collezione Tratto.',
        catalogDescription: 'Modelli Effepi in classe 4.',
        photoAlt:
          'Porta blindata Effepi Garante Multi CL avorio con cerniere a vista sul lato sinistro',
        catalog: `${effepi}/cataloghi/classe_rc4/`,
      },
    ],
  },
]

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
    icon: 'door-open',
    title: 'Sistema di apertura',
    detail:
      'Confrontiamo battente e bilico, valutando il verso di apertura e lo spazio di passaggio.',
  },
] as const
