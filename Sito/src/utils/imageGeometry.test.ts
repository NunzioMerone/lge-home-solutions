import { describe, expect, it } from 'vitest'
import { getImagePaintBounds, relativeImageBounds } from './imageGeometry'

describe('continuous product photo geometry', () => {
  it('preserves the off-center 1.5× crop of the Oscuranti card', () => {
    const frame = { left: 20, top: 450, width: 254, height: 254 }
    // Actual transformed image box: scale(1.5), origin 22% 68%.
    const paint = getImagePaintBounds({
      bounds: { left: -7.94, top: 363.64, width: 381, height: 381 },
      naturalWidth: 1539,
      naturalHeight: 1022,
      objectFit: 'cover',
      objectPosition: '25% 50%',
    })
    const relative = relativeImageBounds(paint, frame)
    expect(relative.left + frame.left).toBeCloseTo(paint.left)
    expect(relative.top).toBeCloseTo(-86.36)
    expect(relative.width).toBeCloseTo(573.7368, 3)
    expect(relative.left).toBeLessThan(-76)
    expect(relative.height).toBe(381)
  })

  it('keeps the entrance door zoom rather than resetting it to the frame size', () => {
    const paint = getImagePaintBounds({
      bounds: { left: -47.5, top: 363.6, width: 435, height: 435 },
      naturalWidth: 1383,
      naturalHeight: 1137,
      objectFit: 'cover',
      objectPosition: '50% 50%',
    })
    expect(paint.top).toBe(363.6)
    expect(paint.width).toBeGreaterThan(435)
    expect(paint.left).toBeLessThan(-47.5)
    expect(paint.width / paint.height).toBeCloseTo(1383 / 1137)
  })

  it('finds the full destination image for a contain layout without changing its proportions', () => {
    const paint = getImagePaintBounds({
      bounds: { left: 20, top: 110, width: 335, height: 335 },
      naturalWidth: 1500,
      naturalHeight: 1000,
      objectFit: 'contain',
      objectPosition: '50% 50%',
    })
    expect(paint.width).toBe(335)
    expect(paint.height).toBeCloseTo(223.3333)
    expect(paint.top).toBeCloseTo(165.8333)
  })

  it('preserves an image that already matches its frame', () => {
    const bounds = { left: 32, top: 120, width: 300, height: 300 }
    expect(
      getImagePaintBounds({
        bounds,
        naturalWidth: 1000,
        naturalHeight: 1000,
        objectFit: 'cover',
        objectPosition: '50% 45%',
      }),
    ).toEqual(bounds)
  })
})
