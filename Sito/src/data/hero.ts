import { heroVideoEdit } from '../config/hero'
import type { HeroDescriptions, HeroHeadlineCue } from '../types/hero'

const phrases = {
  light: 'illumina i tuoi spazi',
  protection: 'protegge la tua casa',
  comfort: 'lascia fuori il rumore e dentro il benessere.',
  privacy: 'rispetta la tua privacy',
  outdoor: 'crea nuovi spazi da vivere',
} as const

export const heroCopy = {
  prefix: 'Il design che',
  phrases,
  subtitle: 'Ogni ambiente merita di essere vissuto al meglio.',
}

const { chapters, loopStartFrame, durationFrames } = heroVideoEdit
const chapterCues = (['comfort', 'protection', 'privacy', 'outdoor'] as const)
  .map((id) => ({ startFrame: chapters[id].startFrame, phrase: phrases[id] }))
  .sort((left, right) => left.startFrame - right.startFrame)

export const heroHeadlineCues = [
  { startFrame: chapters.light.startFrame, phrase: phrases.light },
  ...chapterCues,
  {
    startFrame: loopStartFrame,
    phrase: phrases.light,
    revealFrames: durationFrames - loopStartFrame,
  },
] as const satisfies readonly HeroHeadlineCue[]

export const heroDescriptions: HeroDescriptions = {
  windows: 'Più luce, più silenzio, più benessere.',
  shading: 'La luce che vuoi, la privacy che cerchi.',
  security: 'Protezione e design, in perfetto equilibrio.',
  interior: 'Dettagli che danno carattere ai tuoi spazi.',
  outdoor: "Il comfort di casa, anche all'aperto.",
}
