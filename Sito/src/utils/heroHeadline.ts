import { heroHeadlineMotion, heroVideoFrameRate } from '../config/hero'
import { heroHeadlineCues } from '../data/hero'
import type { HeroHeadlineCue } from '../types/hero'

function easeProgress(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress))
  return clamped * clamped * (3 - 2 * clamped)
}

export function getHeroHeadlineAtTime(time: number) {
  const frame = Number.isFinite(time) ? Math.max(0, time) * heroVideoFrameRate : 0
  let current: HeroHeadlineCue = heroHeadlineCues[0]
  let next: HeroHeadlineCue | undefined

  for (const cue of heroHeadlineCues) {
    if (cue.startFrame > frame) {
      next = cue
      break
    }
    current = cue
  }

  const revealFrames = current.revealFrames ?? heroHeadlineMotion.revealFrames
  const reveal =
    current.startFrame === 0 ? 1 : easeProgress((frame - current.startFrame) / revealFrames)
  const opacity = next ? easeProgress((next.startFrame - frame) / heroHeadlineMotion.exitFrames) : 1
  const continuation = current.continuation

  return {
    phrase: current.phrase,
    opacity,
    maskPosition: continuation ? 0 : (1 - reveal) * 100,
    leadOpacity: continuation ? reveal : 1,
    continuation: continuation && {
      phrase: continuation.phrase,
      opacity: easeProgress((frame - continuation.startFrame) / continuation.revealFrames),
    },
  }
}
