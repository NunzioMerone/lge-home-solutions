import { useEffect } from 'react'
import { getSeoElements } from '../utils/siteSeo'

const managedElements = [
  'title',
  'meta[name="description"]',
  'meta[name="robots"]',
  'meta[name="google-site-verification"]',
  'meta[property^="og:"]',
  'link[rel="canonical"]',
  '#lge-local-business',
].join(', ')

export function usePageMetadata(pathname: string) {
  useEffect(() => {
    const fragment = document.createDocumentFragment()
    for (const { tag, attributes, text } of getSeoElements(pathname)) {
      const element = document.createElement(tag)
      for (const [name, value] of Object.entries(attributes ?? {})) {
        element.setAttribute(name, value)
      }
      if (text !== undefined) element.textContent = text
      fragment.append(element)
    }
    document.head.querySelectorAll(managedElements).forEach((element) => element.remove())
    document.head.append(fragment)
  }, [pathname])
}
