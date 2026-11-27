import { describe, expect, it } from 'vitest'
import { heroHeadlineMotion, heroVideoEdit, heroVideoFrameRate } from '../config/hero'
import { heroCopy } from '../data/hero'
import { getHeroHeadlineAtTime } from './heroHeadline'

const { phrases } = heroCopy
const { chapters, loopStartFrame, durationFrames } = heroVideoEdit
const headlineAtFrame = (frame: number) => getHeroHeadlineAtTime(frame / heroVideoFrameRate)

describe('hero headline across the video chapters', () => {
  it.each([
    [phrases.light, chapters.light.startFrame, chapters.comfort.startFrame],
    [phrases.protection, chapters.protection.startFrame, chapters.privacy.startFrame],
    [phrases.privacy, chapters.privacy.startFrame, chapters.outdoor.startFrame],
    [phrases.outdoor, chapters.outdoor.startFrame, loopStartFrame],
  ] as const)('holds “%s” through the dissolves within its chapter', (phrase, start, next) => {
    const firstVisible = start === 0 ? 0 : start + heroHeadlineMotion.revealFrames
    const lastVisible = next - heroHeadlineMotion.exitFrames
    expect(lastVisible).toBeGreaterThan(firstVisible)
    for (let frame = firstVisible; frame <= lastVisible; frame += 10) {
      expect(headlineAtFrame(frame)).toEqual({
        phrase,
        opacity: 1,
        maskPosition: 0,
        leadOpacity: 1,
      })
    }
  })

  it('reveals the comfort lines at their cues over the VEKA closure', () => {
    const start = chapters.comfort.startFrame
    // The door reaches its stop 107 frames after the first line starts.
    const contact = start + 107
    expect(headlineAtFrame(start - 1).phrase).toBe(phrases.light)
    expect(headlineAtFrame(start + 18)).toMatchObject({
      phrase: 'lascia fuori il rumore',
      leadOpacity: expect.closeTo(0.5),
      maskPosition: 0,
      continuation: { phrase: 'e dentro il benessere.', opacity: 0 },
    })
    expect(headlineAtFrame(contact)).toMatchObject({ leadOpacity: 1, continuation: { opacity: 0 } })
    expect(headlineAtFrame(contact + 14)).toMatchObject({
      leadOpacity: 1,
      continuation: { opacity: expect.closeTo(0.474, 2) },
    })

    for (
      let frame = contact + 30;
      frame <= chapters.protection.startFrame - heroHeadlineMotion.exitFrames;
      frame += 10
    ) {
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
    const leaving = headlineAtFrame(chapters.outdoor.startFrame - 16)
    const entering = headlineAtFrame(chapters.outdoor.startFrame + 16)

    expect(leaving.phrase).toBe(phrases.privacy)
    expect(leaving.opacity).toBeGreaterThan(0)
    expect(leaving.opacity).toBeLessThan(1)
    expect(entering.phrase).toBe(phrases.outdoor)
    expect(entering.maskPosition).toBeGreaterThan(0)
    expect(entering.maskPosition).toBeLessThan(100)
  })

  it('returns to the opening phrase during the loop dissolve and stays on it across the loop', () => {
    expect(headlineAtFrame(loopStartFrame - 1).phrase).toBe(phrases.outdoor)
    expect(headlineAtFrame((loopStartFrame + durationFrames) / 2)).toEqual({
      phrase: phrases.light,
      opacity: 1,
      maskPosition: expect.closeTo(50),
      leadOpacity: 1,
    })
    expect(headlineAtFrame(durationFrames)).toEqual(headlineAtFrame(0))
  })
})
