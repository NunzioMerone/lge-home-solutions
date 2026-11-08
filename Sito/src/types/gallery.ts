import type { ReactNode, Ref } from 'react'

interface GalleryPhotoMetadata {
  id: string
  category: string
  alt: string
  width: number
  height: number
  previewWidths: readonly [number, number, ...number[]]
  fullWidth: number
}

export type GalleryPhoto = GalleryPhotoMetadata &
  (
    | { collection?: 'gallery-real' | 'gallery-home'; status: 'user-provided' }
    | {
        collection: 'atelier-gibus' | 'interior-doors' | 'sikur-home'
        status: 'partner-authorized'
      }
  )

export interface GalleryLightboxState {
  photo: GalleryPhoto
  trigger: HTMLButtonElement
}

export interface ShowroomClosingProps {
  titleId: string
  photo: GalleryPhoto | undefined
  worksPath: string
  worksLabel: string
  children: ReactNode
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
  selectedIndex: number
  reducedMotion: boolean
  compact: boolean
  onSelect: (index: number) => void
  onReady: () => void
  onClose: () => void
}

export interface GalleryLightboxSlideProps {
  photo: GalleryPhoto
  active: boolean
  navigable: boolean
  compact: boolean
  navigationReady?: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export type GalleryImageLoadState = 'loading' | 'ready' | 'failed'

export interface GalleryLightboxPhotoProps {
  photo: GalleryPhoto
  detailWidth: number
  active: boolean
}

export interface GalleryImageProps {
  photo: GalleryPhoto
  alt?: string
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
