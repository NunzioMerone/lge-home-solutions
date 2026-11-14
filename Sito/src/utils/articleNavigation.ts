import type { BlogSectionPosition } from '../types/blog'

/** Keep the last heading that has reached the reading line, including when scrolling upward. */
export function getActiveArticleSection(
  sections: readonly BlogSectionPosition[],
  readingLine: number,
  visibleBottom: number,
): string | null {
  const first = sections[0]
  if (!first || first.top > visibleBottom) return null

  let activeId = first.id
  for (const section of sections) {
    // Anchor scrolling can leave a fractional pixel beyond its requested offset.
    if (Math.floor(section.top) > readingLine) break
    activeId = section.id
  }
  return activeId
}
