import type { Ref } from 'react'

export interface GalleryPhoto {
  id: string
  category: string
  alt: string
  width: number
  height: number
  previewWidths: readonly [number, number]
  fullWidth: number
  collection?: 'gallery-real' | 'gallery-home'
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
  photos?: readonly GalleryPhoto[]
}

export type GalleryLightboxControl = 'close' | 'previous' | 'next'

export interface GalleryLightboxNavigation {
  previous: () => void
  next: () => void
}

export interface GalleryLightboxCarouselProps {
  ref: Ref<GalleryLightboxNavigation>
  photos: readonly GalleryPhoto[]
  initialIndex: number
  selectedIndex: number
  reducedMotion: boolean
  onSelect: (index: number) => void
  onReady: () => void
  onClose: () => void
}

export interface GalleryLightboxSlideProps {
  photo: GalleryPhoto
  active: boolean
  navigable: boolean
  navigationReady?: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export interface GalleryImageProps {
  photo: GalleryPhoto
  full?: boolean
  sizes?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  onSettled?: () => void
}

export interface GalleryPaginationProps {
  count: number
  selected: number
  onSelect: (index: number) => void
}
