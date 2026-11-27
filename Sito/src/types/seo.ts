export interface SeoElement {
  tag: 'title' | 'meta' | 'link' | 'script'
  attributes?: Readonly<Record<string, string>>
  text?: string
}
