import type { GalleryLightboxState, GalleryPhoto } from './gallery'

export type GibusCatalogGroupId = 'pergole' | 'tende' | 'vetrate'

export interface GibusCatalogGroupDefinition {
  id: GibusCatalogGroupId
  title: string
  solutionIds: readonly string[]
}

export interface GibusGalleryPhotoDefinition {
  id: string
  alt: string
  width: number
  height: number
}

export interface GibusGalleryProps {
  id: string
  title: string
  photos: readonly [GalleryPhoto, ...GalleryPhoto[]]
  showGalleryImages: boolean
  onOpen: (photo: GalleryPhoto, trigger: HTMLButtonElement) => void
}

export interface GibusLightboxState extends GalleryLightboxState {
  photos: readonly GalleryPhoto[]
}
