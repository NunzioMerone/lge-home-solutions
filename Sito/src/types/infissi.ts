export type WindowOpening = 'battente' | 'scorrevole'

export interface WindowModel {
  id: string
  name: string
  description: string
  image: {
    width: number
    height: number
    small: number
    alt: string
  }
  productUrl: string
  brochureUrl?: string
  configurationUrl?: string
}

export interface WindowMaterial {
  id: string
  name: string
  headline: string
  models: Readonly<Record<WindowOpening, WindowModel>>
}
