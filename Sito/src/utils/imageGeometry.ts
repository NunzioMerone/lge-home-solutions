import type { ImagePaintOptions, ImageRectangle } from '../types/media'

function positionOffset(value: string, space: number): number {
  if (value === 'left' || value === 'top') return 0
  if (value === 'right' || value === 'bottom') return space
  if (value === 'center') return space / 2
  const number = Number.parseFloat(value)
  if (!Number.isFinite(number)) return space / 2
  return value.endsWith('%') ? (space * number) / 100 : number
}

/** The full bitmap rectangle, including the parts hidden by the image's clipping frame. */
export function getImagePaintBounds({
  bounds,
  naturalWidth,
  naturalHeight,
  objectFit,
  objectPosition,
}: ImagePaintOptions): ImageRectangle {
  if (naturalWidth <= 0 || naturalHeight <= 0 || objectFit === 'fill') {
    return { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }
  }
  const horizontal = bounds.width / naturalWidth
  const vertical = bounds.height / naturalHeight
  const scale =
    objectFit === 'contain' ? Math.min(horizontal, vertical) : Math.max(horizontal, vertical)
  const width = naturalWidth * scale
  const height = naturalHeight * scale
  const [x = '50%', y = '50%'] = objectPosition.trim().split(/\s+/)
  return {
    left: bounds.left + positionOffset(x, bounds.width - width),
    top: bounds.top + positionOffset(y, bounds.height - height),
    width,
    height,
  }
}

export function relativeImageBounds(image: ImageRectangle, frame: ImageRectangle): ImageRectangle {
  return {
    left: image.left - frame.left,
    top: image.top - frame.top,
    width: image.width,
    height: image.height,
  }
}
