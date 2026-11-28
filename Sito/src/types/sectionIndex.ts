export interface SectionIndexItem {
  id: string
  label: string
  /** In a pinned presentation the scroll step occupies the chapter's place in the document. */
  scrollStepId?: string
}

export interface SectionIndexProps {
  label: string
  items: readonly SectionIndexItem[]
  className?: string | undefined
  /** Supply the existing reader's current section, including null before the first one. */
  activeId?: string | null
}
