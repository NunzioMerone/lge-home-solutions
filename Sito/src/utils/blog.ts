import { blogPage } from '../config/blog'
import type { BlogCategory, BlogFilter, BlogPost } from '../types/blog'

export function getBlogPostPath(slug: string): string {
  return `${blogPage.path}/${encodeURIComponent(slug)}`
}

export function parseBlogFilter(
  value: string | null,
  categories: readonly BlogCategory[],
): BlogFilter {
  return categories.find((category) => category.id === value)?.id ?? 'tutti'
}

export function getBlogFilterPath(filter: BlogFilter): string {
  return filter === 'tutti' ? blogPage.path : `${blogPage.path}?argomento=${filter}`
}

export function getBlogPostFromPath(
  pathname: string,
  posts: readonly BlogPost[],
): BlogPost | undefined {
  const path = pathname.replace(/\/+$/, '')
  return posts.find((post) => getBlogPostPath(post.slug) === path)
}

export function getRelatedBlogPosts(
  post: BlogPost,
  posts: readonly BlogPost[],
  limit = 3,
): readonly BlogPost[] {
  const others = posts.filter((item) => item.slug !== post.slug)
  return [
    ...others.filter((item) => item.category === post.category),
    ...others.filter((item) => item.category !== post.category),
  ].slice(0, Math.max(0, limit))
}
