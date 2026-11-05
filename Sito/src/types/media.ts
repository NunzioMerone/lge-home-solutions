export type DecodableImage = Pick<HTMLImageElement, 'complete' | 'naturalWidth' | 'decode'>

export interface ImageReadinessOptions {
  signal?: AbortSignal
  timeoutMs?: number
}
