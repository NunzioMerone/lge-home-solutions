import type { GalleryPhoto } from './gallery'

export interface ShutterSolution {
  name: string
  headline: string
  detail: string
  references: readonly { label: string; url: string }[]
  caption: string
  photo: GalleryPhoto
}

export interface ShutterGroup {
  id: 'roller' | 'hinged'
  name: string
  overview?: ShutterSolution
  optionsLabel: string
  options: readonly [ShutterSolution, ...ShutterSolution[]]
}
