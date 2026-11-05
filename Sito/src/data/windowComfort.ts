import type { WindowComfortTopic } from '../types/windowComfort'

export const windowComfortTopics: readonly WindowComfortTopic[] = [
  {
    id: 'quiet',
    label: 'Silenzio',
    heading: 'Meno rumore, più tranquillità.',
    description:
      'Il comfort è anche potersi fermare. Vetri, guarnizioni e chiusure ben scelti aiutano ad attenuare i rumori che arrivano da fuori.',
    detail:
      'La soluzione giusta si sceglie insieme, in base alla tua casa. Anche una posa accurata contribuisce al risultato.',
  },
  {
    id: 'temperature',
    label: 'Temperatura',
    heading: 'Il piacere di un clima equilibrato.',
    description:
      'Un buon isolamento aiuta a trattenere il calore in inverno e a limitare il passaggio del caldo in estate, per ambienti più piacevoli.',
    detail:
      'Vetro, profilo ed esposizione si valutano insieme, con la stessa cura riservata al raccordo con la parete.',
  },
  {
    id: 'daylight',
    label: 'Luce',
    heading: 'Più spazio alla luce naturale.',
    description:
      'La finestra mette in relazione la casa con l’esterno. Proporzioni, profili e vetri influenzano la luce e il carattere di ogni stanza.',
    detail:
      'Troviamo il giusto equilibrio tra luminosità, privacy e protezione dal sole, rispettando il tuo modo di abitare.',
  },
]

export const windowsPage = {
  title: 'Infissi — Comfort, luce e benessere | LGE Home Solutions',
  description:
    'Infissi pensati per il tuo benessere: scopri come vetri, profili e posa contribuiscono al comfort acustico, all’isolamento e alla luce della tua casa.',
}
