import type { HeroDescriptions } from '../types/hero'

export const heroCopy = {
  prefix: 'Il design che',
  phrases: [
    'illumina i tuoi spazi',
    'protegge la tua casa',
    'valorizza ogni ambiente',
    'rispetta la tua privacy',
    'crea nuovi spazi da vivere',
  ] as const,
  subtitle: 'Ogni ambiente merita di essere vissuto al meglio.',
}

export const heroDescriptions: HeroDescriptions = {
  windows: 'Più luce, più silenzio, più benessere.',
  shading: 'La luce che vuoi, la privacy che cerchi.',
  security: 'Protezione e design, in perfetto equilibrio.',
  interior: 'Dettagli che danno carattere ai tuoi spazi.',
  outdoor: "Il comfort di casa, anche all'aperto.",
}
