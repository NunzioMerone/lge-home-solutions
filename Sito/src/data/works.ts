import { gallery } from './gallery'
import { interleaveWorkPhotos, orderWorkPhotos } from '../utils/works'
import type { WorkCategory, WorkCollection } from '../types/works'

export const workCategories: readonly WorkCategory[] = [
  {
    id: 'infissi',
    cover: 'windows',
    title: 'Infissi',
    description: 'Finestre, portefinestre e vetrate: ambienti e dettagli di posa.',
    galleryCategory: 'Infissi',
    layout: 'landscape',
    featuredIds: ['lge-0db25f41', 'lge-320edfa5', 'lge-8956c0db'],
  },
  {
    id: 'oscuranti',
    cover: 'shading',
    title: 'Oscuranti',
    description: 'Frangisole, persiane e tende tecniche nelle nostre realizzazioni.',
    galleryCategory: 'Oscuranti',
    layout: 'landscape',
    featuredIds: ['lge-76cd6474', 'lge-0317eb86', 'lge-1e08fc98'],
  },
  {
    id: 'porte-e-sicurezza',
    cover: 'security',
    title: 'Porte e sicurezza',
    description: 'Porte d’ingresso: pannelli, maniglioni e dettagli d’installazione.',
    galleryCategory: 'Porte e sicurezza',
    layout: 'portrait',
    featuredIds: ['lge-e7b0f444', 'lge-b523a228', 'lge-e2d1ec8e'],
  },
  {
    id: 'porte-interne',
    cover: 'interior',
    title: 'Porte interne',
    description: 'Porte a battente, scorrevoli e a filo parete.',
    galleryCategory: 'Porte interne',
    layout: 'portrait',
    featuredIds: ['lge-3b069cab', 'lge-3087d625', 'lge-e131e7a7'],
  },
  {
    id: 'atelier-gibus',
    cover: 'outdoor',
    title: 'Atelier Gibus',
    description: 'Pergole, tende da sole e chiusure vetrate.',
    galleryCategory: 'Outdoor',
    layout: 'landscape',
    featuredIds: ['lge-89a82d37', 'lge-fb1ac1a2', 'lge-4460a88d'],
  },
]

export const workCollections: readonly WorkCollection[] = workCategories.map((category) => ({
  ...category,
  photos: orderWorkPhotos(gallery, category),
}))

export const allWorkPhotos = interleaveWorkPhotos(workCollections)
