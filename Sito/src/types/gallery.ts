export interface GalleryPhoto {
  id: string
  category: string
  alt: string
  width: number
  height: number
  previewWidths: readonly [number, number]
  fullWidth: number
  status: 'user-provided'
}

export interface GalleryLightboxState {
  photo: GalleryPhoto
  trigger: HTMLButtonElement
}

export interface GalleryCarouselProps {
  paused: boolean
  onOpen: (photo: GalleryPhoto, trigger: HTMLButtonElement) => void
}

export interface GalleryLightboxProps extends GalleryLightboxState {
  onClose: () => void
}

export interface GalleryImageProps {
  photo: GalleryPhoto
  full?: boolean
}

export interface GalleryPaginationProps {
  count: number
  selected: number
  onSelect: (index: number) => void
}
