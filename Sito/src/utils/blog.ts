import { blogPage } from '../config/blog'
import type { BlogCategory, BlogCategoryId, BlogFilter, BlogPost } from '../types/blog'

export function getBlogPostPath(slug: string): string {
  return `${blogPage.path}/${encodeURIComponent(slug)}`
}

export function getArticleBreadcrumbs(post: BlogPost) {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: blogPage.path },
    { name: post.title, path: getBlogPostPath(post.slug) },
  ]
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

export function hasBlogCategory(post: BlogPost, category: BlogCategoryId): boolean {
  return post.category === category || post.otherCategories?.includes(category) === true
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
  const topics = [post.category, ...(post.otherCategories ?? [])]
  function relevance(item: BlogPost) {
    if (item.category === post.category) return 2
    return topics.some((topic) => hasBlogCategory(item, topic)) ? 1 : 0
  }
  return posts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => relevance(b) - relevance(a))
    .slice(0, Math.max(0, limit))
}
