import { describe, expect, it } from 'vitest'
import { gibusCatalogGroups, outdoorSolutions } from './atelierGibus'

describe('Gibus catalogue navigation', () => {
  it('keeps every showcased solution in exactly one catalogue family', () => {
    const grouped = gibusCatalogGroups.flatMap((group) => group.solutions)
    expect(grouped.map((solution) => solution.id).sort()).toEqual(
      outdoorSolutions.map((solution) => solution.id).sort(),
    )
    expect(new Set(grouped.map((solution) => solution.catalogUrl)).size).toBe(grouped.length)
    expect(gibusCatalogGroups.every((group) => group.solutions.length > 0)).toBe(true)
  })
})
