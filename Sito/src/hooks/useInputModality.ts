import { useLayoutEffect } from 'react'

/** Programmatic dialog focus stays accessible without leaving a keyboard ring after a tap. */
export function useInputModality() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const previous = root.dataset.inputModality
    const pointer = () => {
      root.dataset.inputModality = 'pointer'
    }
    const keyboard = (event: KeyboardEvent) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        ['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)
      )
        return
      root.dataset.inputModality = 'keyboard'
    }
    document.addEventListener('pointerdown', pointer, true)
    document.addEventListener('keydown', keyboard, true)
    return () => {
      document.removeEventListener('pointerdown', pointer, true)
      document.removeEventListener('keydown', keyboard, true)
      if (previous === undefined) delete root.dataset.inputModality
      else root.dataset.inputModality = previous
    }
  }, [])
}
