import { describe, expect, it } from 'vitest'
import { gallery } from '../data/gallery'
import { allWorkPhotos, workCategories, workCollections } from '../data/works'
import { homeGallery } from '../data/homeGallery'
import homeSelection from '../../references/home-gallery-selection.json'
import { worksPage } from '../config/works'
import {
  distributeWorkPhotos,
  getWorkCategoryPath,
  interleaveWorkPhotos,
  parseWorkFilter,
} from './works'

describe('work collections', () => {
  it('includes every original photograph exactly once across the five categories', () => {
    const ids = workCollections.flatMap((collection) => collection.photos.map((photo) => photo.id))
    expect(workCollections).toHaveLength(5)
    expect(ids).toHaveLength(gallery.length)
    expect(new Set(ids).size).toBe(gallery.length)
    expect(new Set(ids)).toEqual(new Set(gallery.map((photo) => photo.id)))
    for (const collection of workCollections) {
      expect(
        collection.photos.every((photo) => photo.category === collection.galleryCategory),
      ).toBe(true)
      expect(collection.photos.slice(0, 3).map((photo) => photo.id)).toEqual(collection.featuredIds)
    }
  })

  it('uses every photograph in the exact user selection only on the homepage', () => {
    expect(homeGallery).toHaveLength(11)
    expect(homeGallery.map((photo) => photo.id)).toEqual(
      homeSelection.photos.map((photo) => photo.id),
    )
    expect(new Set(homeGallery.map((photo) => photo.id)).size).toBe(homeGallery.length)
    expect(homeGallery.every((photo) => photo.collection === 'gallery-home')).toBe(true)
    expect(allWorkPhotos.every((photo) => photo.collection !== 'gallery-home')).toBe(true)
  })

  it('round-trips category links and falls back safely for unknown URL values', () => {
    expect(getWorkCategoryPath('tutti')).toBe(worksPage.path)
    for (const category of workCategories) {
      const url = new URL(getWorkCategoryPath(category.id), 'https://example.test')
      expect(parseWorkFilter(url.searchParams.get('categoria'), workCategories)).toBe(category.id)
      expect(url.hash).toBe('')
    }
    for (const value of [null, '', 'tutti', 'unknown', '../../privacy-policy']) {
      expect(parseWorkFilter(value, workCategories)).toBe('tutti')
    }
  })

  it('preserves the position of existing photos within each column when more are added', () => {
    for (const count of [1, 2, 3] as const) {
      const first = distributeWorkPhotos(gallery.slice(0, 12), count)
      const expanded = distributeWorkPhotos(gallery.slice(0, 24), count)
      for (const [index, column] of first.entries()) {
        expect(expanded[index]?.slice(0, column.length)).toEqual(column)
      }
      expect(new Set(expanded.flat().map((photo) => photo.id)).size).toBe(24)
    }
  })

  it('alternates the complete collections without omitting photographs from shorter categories', () => {
    expect(allWorkPhotos).toHaveLength(gallery.length)
    expect(new Set(allWorkPhotos.map((photo) => photo.id))).toEqual(
      new Set(gallery.map((photo) => photo.id)),
    )
    expect(allWorkPhotos.slice(0, 5).map((photo) => photo.category)).toEqual(
      workCategories.map((category) => category.galleryCategory),
    )
    for (const collection of workCollections) {
      expect(
        allWorkPhotos.filter((photo) => photo.category === collection.galleryCategory),
      ).toEqual(collection.photos)
    }
    expect(interleaveWorkPhotos([])).toEqual([])
  })

  it('balances portrait and landscape photographs while keeping every original image', () => {
    const columns = distributeWorkPhotos(allWorkPhotos, 3)
    const heights = columns.map((column) =>
      column.reduce((sum, photo) => sum + photo.height / photo.width, 0),
    )
    const tallest = Math.max(...allWorkPhotos.map((photo) => photo.height / photo.width))
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(tallest)
    expect(new Set(columns.flat().map((photo) => photo.id)).size).toBe(allWorkPhotos.length)
  })
})
