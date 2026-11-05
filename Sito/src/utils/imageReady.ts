import type { DecodableImage, ImageReadinessOptions } from '../types/media'

/** Wait for a first uncached image without trapping navigation on a failed request. */
export function waitForImage(
  image: DecodableImage,
  { signal, timeoutMs = 1600 }: ImageReadinessOptions = {},
): Promise<boolean> {
  if (signal?.aborted) return Promise.resolve(false)
  if (image.complete && image.naturalWidth > 0) return Promise.resolve(true)
  return new Promise((resolve) => {
    let settled = false
    const finish = (ready: boolean) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      signal?.removeEventListener('abort', abort)
      resolve(ready)
    }
    const abort = () => finish(false)
    const timer = setTimeout(() => finish(false), timeoutMs)
    signal?.addEventListener('abort', abort, { once: true })
    void Promise.resolve()
      .then(() => image.decode())
      .then(
        () => finish(image.naturalWidth > 0),
        () => finish(false),
      )
  })
}
