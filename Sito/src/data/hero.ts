import { heroVideoEdit } from '../config/hero'
import type { HeroDescriptions, HeroHeadlineCue } from '../types/hero'

const comfortLead = 'lascia fuori il rumore'
const comfortContinuation = 'e dentro il benessere.'

const phrases = {
  light: 'illumina i tuoi spazi',
  protection: 'protegge la tua casa',
  comfort: `${comfortLead} ${comfortContinuation}`,
  privacy: 'rispetta la tua privacy',
  outdoor: 'crea nuovi spazi da vivere',
} as const

export const heroCopy = {
  prefix: 'Il design che',
  phrases,
  subtitle: 'Ogni ambiente merita di essere vissuto al meglio.',
  services: 'Infissi, porte e soluzioni outdoor. Consulenza e posa qualificata nei Campi Flegrei.',
}

const { chapters, loopStartFrame, durationFrames } = heroVideoEdit
const { comfort } = chapters

const chapterCues: HeroHeadlineCue[] = [
  ...(['protection', 'privacy', 'outdoor'] as const).map((id) => ({
    startFrame: chapters[id].startFrame,
    phrase: phrases[id],
  })),
  {
    startFrame: comfort.startFrame,
    phrase: comfortLead,
    revealFrames: comfort.revealFrames,
    continuation: {
      phrase: comfortContinuation,
      startFrame: comfort.startFrame + comfort.continuation.delayFrames,
      revealFrames: comfort.continuation.revealFrames,
    },
  },
]

export const heroHeadlineChapters: readonly [HeroHeadlineCue, ...HeroHeadlineCue[]] = [
  { startFrame: chapters.light.startFrame, phrase: phrases.light },
  ...chapterCues.sort((left, right) => left.startFrame - right.startFrame),
]

export const heroHeadlineCues = [
  ...heroHeadlineChapters,
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
