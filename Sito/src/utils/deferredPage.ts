import { lazy } from 'react'
import type { ComponentType } from 'react'

/** The Vite module ID also identifies the route's styles in the client build manifest. */
export function createDeferredPage<Props>(
  modules: Record<string, () => Promise<ComponentType<Props>>>,
) {
  const entry = Object.entries(modules)[0]
  if (!entry || Object.keys(modules).length !== 1) throw new Error('Expected one route module')
  const [moduleId, load] = entry
  let prepared: ComponentType<Props> | undefined
  let pending: Promise<{ default: ComponentType<Props> }> | undefined

  function loadPage() {
    pending ??= load().then(
      (Page) => {
        prepared = Page
        return { default: Page }
      },
      (error: unknown) => {
        pending = undefined
        throw error
      },
    )
    return pending
  }

  const LazyPage = lazy(loadPage)
  return {
    moduleId: moduleId.slice(1),
    prepare: () => (prepared ? undefined : loadPage()),
    getPage: () => prepared ?? LazyPage,
  }
}
