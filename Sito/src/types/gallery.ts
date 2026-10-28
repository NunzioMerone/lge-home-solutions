import type { PhotoId } from './content'

export interface GalleryLightboxState {
  photo: PhotoId
  trigger: HTMLButtonElement
}

export interface GalleryCarouselProps {
  paused: boolean
  onOpen: (photo: PhotoId, trigger: HTMLButtonElement) => void
}

export interface GalleryLightboxProps extends GalleryLightboxState {
  onClose: () => void
}
