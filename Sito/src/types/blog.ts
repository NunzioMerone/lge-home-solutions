import type { ReactNode } from 'react'

export type BlogCategoryId = 'infissi' | 'comfort' | 'outdoor' | 'porte' | 'manutenzione'
export type BlogFilter = BlogCategoryId | 'tutti'
export type BlogPhotoStatus = 'loading' | 'ready' | 'error'

export interface BlogCategory {
  id: BlogCategoryId
  label: string
}

export interface BlogImage {
  path: string
  widths: readonly [number, ...number[]]
  width: number
  height: number
  alt: string
  caption: string
}

export interface BlogPost {
  slug: string
  category: BlogCategoryId
  title: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  image: BlogImage
}

export interface BlogSection {
  id: string
  title: string
  paragraphs: readonly string[]
  checklist?: readonly string[]
}

export interface BlogSectionPosition {
  id: string
  top: number
}

export interface BlogArticleSectionProps {
  section: BlogSection
}

export interface BlogArticleContent {
  introduction: string
  sections: readonly BlogSection[]
  takeaway: string
  solution: { label: string; path: string }
  sources: readonly { label: string; url: string }[]
}

export interface BlogPhotoProps {
  image: BlogImage
  sizes: string
  critical?: boolean
  className?: string | undefined
}

export interface BlogCardProps {
  post: BlogPost
  headingLevel?: 2 | 3
  critical?: boolean
}

export interface BlogLayoutProps {
  children: ReactNode
}
