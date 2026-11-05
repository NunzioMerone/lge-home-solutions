import { afterEach, describe, expect, it, vi } from 'vitest'
import { waitForImage } from './imageReady'

afterEach(() => vi.useRealTimers())

describe('image readiness for route transitions', () => {
  it('uses an already loaded image without decoding it again', async () => {
    const image = { complete: true, naturalWidth: 480, decode: vi.fn() }
    expect(await waitForImage(image)).toBe(true)
    expect(image.decode).not.toHaveBeenCalled()
  })

  it('waits for the first uncached image instead of skipping its transition', async () => {
    let completeDecode = () => {}
    const image = {
      complete: false,
      naturalWidth: 0,
      decode: () =>
        new Promise<void>((resolve) => {
          completeDecode = resolve
        }),
    }
    const ready = waitForImage(image)
    await Promise.resolve()
    image.complete = true
    image.naturalWidth = 960
    completeDecode()
    expect(await ready).toBe(true)
  })

  it('allows a normal navigation when the source request fails', async () => {
    const image = {
      complete: false,
      naturalWidth: 0,
      decode: () => Promise.reject(new Error('load failed')),
    }
    expect(await waitForImage(image)).toBe(false)
  })

  it('cancels a pending decode when the user navigates elsewhere', async () => {
    vi.useFakeTimers()
    const controller = new AbortController()
    const image = { complete: false, naturalWidth: 0, decode: () => new Promise<void>(() => {}) }
    const ready = waitForImage(image, { signal: controller.signal })
    controller.abort()
    expect(await ready).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('does not trap a click indefinitely on a stalled request', async () => {
    vi.useFakeTimers()
    const image = { complete: false, naturalWidth: 0, decode: () => new Promise<void>(() => {}) }
    const ready = waitForImage(image, { timeoutMs: 1200 })
    await vi.advanceTimersByTimeAsync(1200)
    expect(await ready).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })
})
