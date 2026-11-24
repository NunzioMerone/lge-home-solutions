import { describe, expect, it } from 'vitest'
import { NavigationType } from 'react-router-dom'
import { getHomeScrollTarget } from './homeNavigation'

describe('homepage navigation memory', () => {
  it('restores the exact position on Back rather than following the old hero anchor', () => {
    expect(getHomeScrollTarget(NavigationType.Pop, '#inizio', { x: 0, y: 1158 }, true)).toEqual({
      kind: 'position',
      position: { x: 0, y: 1158 },
    })
  })

  it('honors an explicit Home link even when a position was previously saved', () => {
    expect(getHomeScrollTarget(NavigationType.Push, '#inizio', { x: 0, y: 1158 }, true)).toEqual({
      kind: 'anchor',
      id: 'inizio',
      behavior: 'auto',
    })
  })

  it('opens a direct section link before there is any saved position', () => {
    expect(getHomeScrollTarget(NavigationType.Pop, '#prodotti', undefined, false)).toEqual({
      kind: 'anchor',
      id: 'prodotti',
      behavior: 'instant',
    })
  })

  it('enters a home section immediately from a different page', () => {
    expect(getHomeScrollTarget(NavigationType.Push, '#contatti', undefined, false)).toEqual({
      kind: 'anchor',
      id: 'contatti',
      behavior: 'instant',
    })
  })

  it('uses the page scroll behavior when reselecting a home section', () => {
    expect(getHomeScrollTarget(NavigationType.Replace, '#contatti', undefined, true)).toEqual({
      kind: 'anchor',
      id: 'contatti',
      behavior: 'auto',
    })
  })

  it('falls back safely for an invalid anchor', () => {
    expect(getHomeScrollTarget(NavigationType.Push, '#%broken', undefined, true)).toEqual({
      kind: 'position',
      position: { x: 0, y: 0 },
    })
  })
})
