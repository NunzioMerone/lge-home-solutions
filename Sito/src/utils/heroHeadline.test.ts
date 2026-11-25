import { describe, expect, it } from 'vitest'
import { heroVideoEdit, heroVideoFrameRate } from '../config/hero'
import { heroCopy } from '../data/hero'
import { getHeroHeadlineAtTime } from './heroHeadline'

const { phrases } = heroCopy

describe('hero headline across the video chapters', () => {
  it.each([
    [phrases.light, [0, 3.9, 7.2, 11.3]],
    [phrases.comfort, [17.75, 20.9, 22]],
    [phrases.protection, [25.5, 27]],
    [phrases.privacy, [30.8, 31.2, 33]],
    [phrases.outdoor, [36, 37.15, 39.75, 42.15, 45.35, 48]],
  ])('holds “%s” through the dissolves within its chapter', (phrase, times) => {
    for (const time of times) {
      expect(getHeroHeadlineAtTime(time)).toEqual({ phrase, opacity: 1, maskPosition: 0 })
    }
  })

  it('uses each phrase once per cycle before returning to the opening', () => {
    const sequence: string[] = []
    for (let frame = 0; frame < heroVideoEdit.durationFrames; frame += 1) {
      const { phrase } = getHeroHeadlineAtTime(frame / heroVideoFrameRate)
      if (sequence.at(-1) !== phrase) sequence.push(phrase)
    }
    expect(sequence).toEqual([
      phrases.light,
      phrases.comfort,
      phrases.protection,
      phrases.privacy,
      phrases.outdoor,
      phrases.light,
    ])
  })

  it('fades the previous phrase and reveals the next at a chapter boundary', () => {
    const leaving = getHeroHeadlineAtTime(34)
    const entering = getHeroHeadlineAtTime(34.6)

    expect(leaving.phrase).toBe(phrases.privacy)
    expect(leaving.opacity).toBeGreaterThan(0)
    expect(leaving.opacity).toBeLessThan(1)
    expect(entering.phrase).toBe(phrases.outdoor)
    expect(entering.maskPosition).toBeGreaterThan(0)
    expect(entering.maskPosition).toBeLessThan(100)
  })

  it('returns to the opening phrase during the loop dissolve and stays on it across the loop', () => {
    expect(getHeroHeadlineAtTime(49.5).phrase).toBe(phrases.outdoor)
    expect(getHeroHeadlineAtTime(49.9)).toEqual({
      phrase: phrases.light,
      opacity: 1,
      maskPosition: expect.closeTo(50),
    })
    expect(getHeroHeadlineAtTime(50.2)).toEqual(getHeroHeadlineAtTime(0))
  })
})
