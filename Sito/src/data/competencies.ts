import type { Competency } from '../types/content'

export const competencies: Competency[] = [
  {
    id: 'posaclima',
    title: 'PosaClima',
    icon: 'craft',
    description:
      'La cura del nodo di posa contribuisce a mantenere comfort e prestazioni del serramento nel tempo.',
    status: 'unverified',
  },
  {
    id: 'eqf',
    title: 'Qualifica EQF 4',
    icon: 'shield',
    description:
      'Conoscenza tecnica, precisione e attenzione ai dettagli: le basi di una posa eseguita a regola d’arte.',
    status: 'unverified',
  },
  {
    id: 'thermography',
    title: 'Termografia',
    icon: 'thermal',
    description:
      'L’analisi termografica aiuta a individuare dispersioni e punti critici dell’involucro abitativo.',
    status: 'unverified',
  },
  {
    id: 'energy',
    title: 'Efficienza energetica',
    icon: 'energy',
    description:
      'Infissi e schermature scelti con attenzione per migliorare il comfort e contenere i consumi.',
    status: 'unverified',
  },
]
