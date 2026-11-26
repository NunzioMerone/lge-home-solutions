import { describe, expect, it } from 'vitest'
import { heroVideoEdit, heroVideoFrameRate } from '../config/hero'
import { heroCopy } from '../data/hero'
import { getHeroHeadlineAtTime } from './heroHeadline'

const { phrases } = heroCopy
const headlineAtFrame = (frame: number) => getHeroHeadlineAtTime(frame / heroVideoFrameRate)

describe('hero headline across the video chapters', () => {
  it.each([
    [phrases.light, [0, 3.9, 7.2, 11.3, 14.2, 17.75, 20.4]],
    [phrases.protection, [30.5, 32]],
    [phrases.privacy, [35.8, 36.2, 38]],
    [phrases.outdoor, [41, 42.15, 44.75, 47.15, 50.35, 53]],
  ])('holds “%s” through the dissolves within its chapter', (phrase, times) => {
    for (const time of times) {
      expect(getHeroHeadlineAtTime(time)).toEqual({
        phrase,
        opacity: 1,
        maskPosition: 0,
        leadOpacity: 1,
      })
    }
  })

  it('reveals the comfort lines at their cues over the VEKA closure', () => {
    expect(headlineAtFrame(1273).phrase).toBe(phrases.light)
    expect(headlineAtFrame(1292)).toMatchObject({
      phrase: 'lascia fuori il rumore',
      leadOpacity: expect.closeTo(0.5),
      maskPosition: 0,
      continuation: { phrase: 'e dentro il benessere.', opacity: 0 },
    })
    expect(headlineAtFrame(1380)).toMatchObject({ leadOpacity: 1, continuation: { opacity: 0 } })
    expect(headlineAtFrame(1395)).toMatchObject({
      leadOpacity: 1,
      continuation: { opacity: expect.closeTo(0.474, 2) },
    })

    for (const frame of [1411, 1460, 1555, 1630]) {
      expect(headlineAtFrame(frame)).toMatchObject({
        phrase: 'lascia fuori il rumore',
        opacity: 1,
        leadOpacity: 1,
        continuation: { phrase: 'e dentro il benessere.', opacity: 1 },
      })
    }
  })

  it('uses each phrase once per cycle before returning to the opening', () => {
    const sequence: string[] = []
    for (let frame = 0; frame < heroVideoEdit.durationFrames; frame += 1) {
      const { phrase, continuation } = headlineAtFrame(frame)
      const completePhrase = continuation ? `${phrase} ${continuation.phrase}` : phrase
      if (sequence.at(-1) !== completePhrase) sequence.push(completePhrase)
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
    const leaving = getHeroHeadlineAtTime(39)
    const entering = getHeroHeadlineAtTime(39.6)

    expect(leaving.phrase).toBe(phrases.privacy)
    expect(leaving.opacity).toBeGreaterThan(0)
    expect(leaving.opacity).toBeLessThan(1)
    expect(entering.phrase).toBe(phrases.outdoor)
    expect(entering.maskPosition).toBeGreaterThan(0)
    expect(entering.maskPosition).toBeLessThan(100)
  })

  it('returns to the opening phrase during the loop dissolve and stays on it across the loop', () => {
    expect(getHeroHeadlineAtTime(54.5).phrase).toBe(phrases.outdoor)
    expect(getHeroHeadlineAtTime(54.9)).toEqual({
      phrase: phrases.light,
      opacity: 1,
      maskPosition: expect.closeTo(50),
      leadOpacity: 1,
    })
    expect(getHeroHeadlineAtTime(55.2)).toEqual(getHeroHeadlineAtTime(0))
  })
})
