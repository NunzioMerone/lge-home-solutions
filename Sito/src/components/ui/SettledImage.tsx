import { useEffectEvent, useLayoutEffect, useRef } from 'react'
import type { SettledImageProps } from '../../types/media'
import { decodeGalleryImage } from '../../utils/galleryImages'

export function SettledImage({
  onSettled,
  decodeBeforeSettling = false,
  ...props
}: SettledImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const report = useEffectEvent(onSettled)
  const { src, srcSet, sizes } = props

  useLayoutEffect(() => {
    const image = ref.current
    if (!image) return
    let active = true
    let loadedSource: string | null = null

    const loaded = () => {
      const source = image.currentSrc || image.src
      if (loadedSource === source) return
      loadedSource = source
      if (!decodeBeforeSettling) {
        report(true)
        return
      }
      void decodeGalleryImage(image).then((ready) => {
        if (active && loadedSource === source && (image.currentSrc || image.src) === source)
          report(ready)
      })
    }
    const failed = () => {
      loadedSource = null
      report(false)
    }

    image.addEventListener('load', loaded)
    image.addEventListener('error', failed)
    // The prerendered image may have finished before React attached either listener.
    if (image.complete) {
      if (image.naturalWidth > 0) loaded()
      else failed()
    }
    return () => {
      active = false
      image.removeEventListener('load', loaded)
      image.removeEventListener('error', failed)
    }
  }, [src, srcSet, sizes, decodeBeforeSettling])

  return <img {...props} ref={ref} />
}
