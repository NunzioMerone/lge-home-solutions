import type { GalleryImageLoadState } from './gallery'

export interface ShowroomFrame {
  current: number | null
  previous: number | null
  target: number
  loadState: GalleryImageLoadState
}
