import { useEffect, useState } from 'react'

export function useHomeSectionInView(sectionId: string | undefined): boolean {
  const [visibleSectionId, setVisibleSectionId] = useState<string>()

  useEffect(() => {
    const section = sectionId ? document.getElementById(sectionId) : null
    if (!section) return

    let observer: IntersectionObserver | undefined
    const observe = () => {
      observer?.disconnect()
      // Use the center of the viewport to ignore sections just entering or leaving an edge.
      const inset = Math.floor(window.innerHeight / 3)
      observer = new IntersectionObserver(
        ([entry]) => setVisibleSectionId(entry?.isIntersecting ? section.id : undefined),
        { rootMargin: `-${inset}px 0px` },
      )
      observer.observe(section)
    }
    observe()
    window.addEventListener('resize', observe)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', observe)
    }
  }, [sectionId])

  return sectionId !== undefined && visibleSectionId === sectionId
}
