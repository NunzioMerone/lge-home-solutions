import { describe, expect, it } from 'vitest'
import { blogCategories, blogPosts } from '../data/blog'
import { blogArticles } from '../data/blogArticles'
import {
  getBlogPostFromPath,
  getBlogPostPath,
  getRelatedBlogPosts,
  hasBlogCategory,
  parseBlogFilter,
} from './blog'

describe('blog navigation and editorial integrity', () => {
  it('falls back to the complete collection for missing or unknown query values', () => {
    for (const value of [null, '', 'not-a-category', 'Comfort', '../infissi']) {
      expect(parseBlogFilter(value, blogCategories)).toBe('tutti')
    }
    expect(parseBlogFilter('comfort', blogCategories)).toBe('comfort')
    expect(parseBlogFilter('sicurezza', blogCategories)).toBe('sicurezza')
  })

  it('includes the security guides together and the entrance door under porte as well', () => {
    const security = blogPosts.filter((post) => hasBlogCategory(post, 'sicurezza'))
    expect(security.map((post) => post.slug).sort()).toEqual(
      ['come-scegliere-avvolgibili-di-sicurezza', 'come-scegliere-porta-blindata'].sort(),
    )
    expect(
      security.filter((post) => hasBlogCategory(post, 'porte')).map((post) => post.slug),
    ).toEqual(['come-scegliere-porta-blindata'])
  })

  it('resolves every article link, including trailing slashes, to complete content', () => {
    expect(new Set(blogPosts.map((post) => post.slug)).size).toBe(blogPosts.length)
    for (const post of blogPosts) {
      const path = getBlogPostPath(post.slug)
      expect(getBlogPostFromPath(path, blogPosts)).toBe(post)
      expect(getBlogPostFromPath(`${path}/`, blogPosts)).toBe(post)
      const content = blogArticles[post.slug]
      expect(content?.introduction).toBeTruthy()
      expect(content?.sections.length).toBeGreaterThan(0)
      const sectionIds = content?.sections.map((section) => section.id) ?? []
      expect(new Set(sectionIds).size).toBe(sectionIds.length)
    }
    expect(getBlogPostFromPath('/blog/unknown', blogPosts)).toBeUndefined()
    expect(getBlogPostFromPath('/blog/come-scegliere-infissi/extra', blogPosts)).toBeUndefined()
  })

  it('prioritizes related topics without suggesting the current article or duplicates', () => {
    const current = blogPosts.find((post) => post.slug === 'condensa-sui-vetri')
    if (!current) throw new Error('Missing comfort article fixture')
    const related = getRelatedBlogPosts(current, blogPosts)
    expect(related[0]?.slug).toBe('spifferi-dalle-finestre')
    expect(related).toHaveLength(3)
    expect(related.every((post) => post.slug !== current.slug)).toBe(true)
    expect(new Set(related.map((post) => post.slug)).size).toBe(related.length)
    expect(getRelatedBlogPosts(current, [current])).toEqual([])
    expect(getRelatedBlogPosts(current, blogPosts, 0)).toEqual([])
  })
})
