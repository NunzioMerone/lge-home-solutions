import { describe, expect, it } from 'vitest'
import { getActiveArticleSection } from './articleNavigation'

describe('article reading position', () => {
  it('does not select a chapter while the reader is still above the article body', () => {
    expect(getActiveArticleSection([], 112, 700)).toBeNull()
    expect(getActiveArticleSection([{ id: 'first', top: 701 }], 112, 700)).toBeNull()
    expect(getActiveArticleSection([{ id: 'first', top: 700 }], 112, 700)).toBe('first')
  })

  it('selects the first visible chapter before its heading reaches the navigation offset', () => {
    expect(
      getActiveArticleSection(
        [
          { id: 'first', top: 350 },
          { id: 'second', top: 750 },
        ],
        112,
        700,
      ),
    ).toBe('first')
  })

  it('changes at the heading boundary in both scroll directions, independent of the URL hash', () => {
    const positions = (secondTop: number) => [
      { id: 'first', top: secondTop - 400 },
      { id: 'second', top: secondTop },
      { id: 'third', top: secondTop + 400 },
    ]
    expect(getActiveArticleSection(positions(113), 112, 700)).toBe('first')
    expect(getActiveArticleSection(positions(112), 112, 700)).toBe('second')
    expect(getActiveArticleSection(positions(112.75), 112, 700)).toBe('second')
    expect(getActiveArticleSection(positions(111), 112, 700)).toBe('second')
    expect(getActiveArticleSection(positions(113), 112, 700)).toBe('first')
  })

  it('handles direct navigation past several chapters and keeps the last chapter selected', () => {
    expect(
      getActiveArticleSection(
        [
          { id: 'first', top: -1500 },
          { id: 'second', top: -800 },
          { id: 'third', top: -300 },
        ],
        112,
        700,
      ),
    ).toBe('third')
  })
})
