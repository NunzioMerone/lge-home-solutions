import type { Credential } from '../types/competencies'

export const competencies: readonly Credential[] = [
  {
    id: 'qualified-installation',
    title: 'Progettisti e posatori qualificati',
    label: 'UNI 11673-2 · EQF 3 e EQF 4',
    icon: 'shield',
    description:
      'Studiamo la posizione del telaio in base alla parete e alle finiture della casa, poi curiamo la posa in cantiere.',
    source: 'company',
  },
  {
    id: 'posaclima',
    title: 'PosaClima',
    label: 'Formazione specialistica',
    icon: 'craft',
    description:
      'Isoliamo e sigilliamo il raccordo tra telaio e parete, la parte della posa che resta nascosta sotto le finiture.',
    source: 'document',
  },
  {
    id: 'thermography',
    title: 'Termografia',
    label: 'Analisi degli edifici',
    icon: 'thermal',
    description:
      'Con la termocamera osserviamo come cambia la temperatura attorno agli infissi e individuiamo le zone da controllare più da vicino.',
    source: 'document',
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
