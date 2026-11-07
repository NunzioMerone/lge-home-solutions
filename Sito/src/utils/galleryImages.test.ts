import { afterEach, describe, expect, it, vi } from 'vitest'
import type { GalleryPhoto } from '../types/gallery'
import { decodeGalleryImage, galleryImageUrl, lightboxImageWidth } from './galleryImages'

const photo: GalleryPhoto = {
  id: 'window',
  category: 'Infissi',
  alt: 'Finestra',
  width: 1600,
  height: 1200,
  previewWidths: [480, 960],
  fullWidth: 1600,
  status: 'user-provided',
}

afterEach(() => vi.unstubAllEnvs())

describe('lightbox image preparation', () => {
  it('uses an existing smaller source on phones and preserves desktop detail', () => {
    expect(lightboxImageWidth(photo, true)).toBe(960)
    expect(lightboxImageWidth(photo, false)).toBe(1600)
    expect(lightboxImageWidth({ ...photo, fullWidth: 800 }, true)).toBe(800)
  })

  it('uses the same public URLs for previews and detailed images on GitHub Pages', () => {
    vi.stubEnv('BASE_URL', '/lge-home-solutions/')
    expect(galleryImageUrl(photo, 960)).toBe('/lge-home-solutions/img/gallery-real/window-960.webp')
    expect(galleryImageUrl({ ...photo, collection: 'gallery-home' }, 480)).toBe(
      '/lge-home-solutions/img/gallery-home/window-480.webp',
    )
  })

  it('waits for decoding even when the download has completed', async () => {
    let finishDecode = () => {}
    const image = {
      complete: true,
      naturalWidth: 960,
      decode: () =>
        new Promise<void>((resolve) => {
          finishDecode = resolve
        }),
    }
    let ready = false
    const pending = decodeGalleryImage(image).then((result) => {
      ready = result
    })
    await Promise.resolve()
    expect(ready).toBe(false)
    finishDecode()
    await pending
    expect(ready).toBe(true)
  })

  it('keeps the preview available when the larger source cannot be decoded', async () => {
    const image = {
      complete: true,
      naturalWidth: 0,
      decode: () => Promise.reject(new Error('offline')),
    }
    expect(await decodeGalleryImage(image)).toBe(false)
  })
})
