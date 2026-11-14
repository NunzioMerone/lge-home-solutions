import { useSectionReveal } from '../../hooks/useSectionReveal'
import type { BlogArticleSectionProps } from '../../types/blog'
import styles from './Blog.module.css'

export function BlogArticleSection({ section }: BlogArticleSectionProps) {
  const ref = useSectionReveal()

  return (
    <section
      id={section.id}
      tabIndex={-1}
      className={styles.articleSection}
      ref={ref}
      data-blog-section
    >
      <h2 data-reveal>{section.title}</h2>
      <div data-reveal>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.checklist && (
          <ul className={styles.checklist}>
            {section.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
