import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const clientSnapshot = () => true
const staticSnapshot = () => false

/** Browser-only state can differ from the URL and preferences of the static document. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, clientSnapshot, staticSnapshot)
}
