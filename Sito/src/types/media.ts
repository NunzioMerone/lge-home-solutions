export type DecodableImage = Pick<HTMLImageElement, 'complete' | 'naturalWidth' | 'decode'>

export interface ImageReadinessOptions {
  signal?: AbortSignal
  timeoutMs?: number
}

export interface ImageRectangle {
  left: number
  top: number
  width: number
  height: number
}

export interface ImagePaintOptions {
  bounds: ImageRectangle
  naturalWidth: number
  naturalHeight: number
  objectFit: string
  objectPosition: string
}
