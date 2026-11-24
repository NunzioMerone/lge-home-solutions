import { useEffect, useRef, useState } from 'react'
import type { ElfsightReviewsProps } from '../../../types/reviews'

const platformUrl = 'https://elfsightcdn.com/platform.js'

function loadElfsightPlatform() {
  if (document.head.querySelector(`script[src="${platformUrl}"]`)) return

  const script = document.createElement('script')
  script.src = platformUrl
  script.async = true
  script.addEventListener('error', () => script.remove(), { once: true })
  document.head.append(script)
}

export function ElfsightReviews({ widgetId, children }: ElfsightReviewsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const embedRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const embed = embedRef.current
    if (!section || !embed) return

    // Elfsight hides an exhausted free widget. The original cards fill that space again.
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) setVisible(entry.contentRect.height > 0)
    })
    resizeObserver.observe(embed)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        intersectionObserver.disconnect()
        loadElfsightPlatform()
      },
      { rootMargin: '200px 0px' },
    )
    intersectionObserver.observe(section)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <div ref={sectionRef}>
      <div ref={embedRef}>
        <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy="" />
      </div>
      {!visible && children}
    </div>
  )
}
