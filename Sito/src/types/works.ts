import type { GalleryLightboxProps, GalleryPhoto } from './gallery'
import type { PhotoId } from './content'

export type WorkCategoryId =
  'infissi' | 'oscuranti' | 'porte-e-sicurezza' | 'porte-interne' | 'atelier-gibus'

export type WorkFilter = 'tutti' | WorkCategoryId
export type WorkColumnCount = 1 | 2 | 3

export interface WorkCategory {
  id: WorkCategoryId
  title: string
  description: string
  galleryCategory: GalleryPhoto['category']
  layout: 'landscape' | 'portrait'
  featuredIds: readonly string[]
  cover: PhotoId
}

export interface WorkCollection extends WorkCategory {
  photos: readonly GalleryPhoto[]
}

export interface WorkFiltersProps {
  selected: WorkFilter
}

export interface WorkCategoryLabelProps {
  title: string
}

export interface WorkGalleryProps {
  photos: readonly GalleryPhoto[]
  title: string
  onOpen: (photo: GalleryPhoto, trigger: HTMLAnchorElement) => void
}

export interface WorkPhotoColumn {
  photos: GalleryPhoto[]
  relativeHeight: number
}

export interface WorkPhotoProps {
  photo: GalleryPhoto
  interactive: boolean
  onOpen: WorkGalleryProps['onOpen']
}

export interface WorkFilterPhotoProps {
  photo: PhotoId
}

export interface WorkCaseStudy {
  id: string
  category: WorkCategoryId
  title: string
  need: string
  solution: string
  installation: string
  contribution: string
  result: string
  photos: readonly [GalleryPhoto, ...GalleryPhoto[]]
}

export interface WorkCaseStudiesProps {
  selected: WorkFilter
  onOpen: (selection: Omit<GalleryLightboxProps, 'onClose'>) => void
}
