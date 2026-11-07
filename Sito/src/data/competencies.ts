import type { CompetencyHighlight, Credential } from '../types/competencies'

export const competencyHighlights: CompetencyHighlight[] = [
  {
    id: 'qualified-installation',
    title: 'Posa qualificata',
    label: 'UNI 11673-2 · EQF 4',
    icon: 'shield',
    description:
      "Competenze tecniche e precisione in ogni fase dell'installazione, per valorizzare le prestazioni di ogni serramento.",
  },
  {
    id: 'posaclima',
    title: 'PosaClima',
    label: 'Formazione specialistica',
    icon: 'craft',
    description:
      "Una cura particolare del punto d'incontro tra infisso e parete, per limitare spifferi e dispersioni.",
  },
  {
    id: 'thermography',
    title: 'Termografia',
    label: 'I e II livello',
    icon: 'thermal',
    description:
      'Analisi mirate per individuare dispersioni termiche e criticità spesso invisibili a occhio nudo.',
  },
]

export const competencies: Credential[] = [
  {
    id: 'qualified-installation',
    title: 'Posatori qualificati',
    label: 'UNI 11673-2 · EQF 4',
    icon: 'shield',
    description:
      'Qualifica EQF 4 Caposquadra: preparazione tecnica, coordinamento e precisione per una posa curata in ogni dettaglio.',
    source: 'company',
  },
  {
    id: 'posaclima',
    title: 'PosaClima',
    label: 'Formazione professionale',
    icon: 'craft',
    description:
      'Formazione per la posa e la riqualificazione del foro finestra, secondo i requisiti della norma UNI 11673-3.',
    source: 'document',
  },
  {
    id: 'thermography',
    title: 'Termografia di I e II livello',
    label: 'Analisi termografica',
    icon: 'thermal',
    description:
      'Competenze termografiche di I e II livello per analizzare le temperature superficiali e individuare dispersioni e punti critici degli ambienti.',
    source: 'company',
  },
]

export const recognitions: Credential[] = [
  {
    id: 'cosmet',
    title: 'Cosmet Group',
    label: 'Top Partner 2025',
    icon: 'award',
    description: 'Il riconoscimento alla nostra collaborazione con il gruppo.',
    source: 'document',
  },
  {
    id: 'gibus',
    title: 'Atelier Gibus',
    label: 'Atelier ufficiale',
    icon: 'pergola',
    description: 'Il riferimento Gibus per tutta l’Area Flegrea.',
    source: 'company',
  },
  {
    id: 'new-solar-sikurhome',
    title: 'New Solar · SikurHome',
    label: 'Punto vendita di zona',
    icon: 'store',
    description: 'Soluzioni da scoprire con una consulenza dedicata.',
    source: 'company',
  },
  {
    id: 'velux',
    title: 'VELUX',
    label: 'Punto ufficiale',
    icon: 'roof-window',
    description: 'Esposizione e vendita ufficiale delle soluzioni VELUX.',
    source: 'company',
  },
  {
    id: 'bettio',
    title: 'BETTIO',
    label: 'Punto ufficiale',
    icon: 'screen',
    description: 'Esposizione e vendita ufficiale delle zanzariere BETTIO.',
    source: 'company',
  },
]
