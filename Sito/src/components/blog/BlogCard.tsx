import { PageLink } from '../ui/PageLink'
import { blogCategories } from '../../data/blog'
import { getBlogPostPath } from '../../utils/blog'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { Icon } from '../ui/Icon'
import { BlogPhoto } from './BlogPhoto'
import type { BlogCardProps } from '../../types/blog'
import styles from './Blog.module.css'

export function BlogCard({ post, headingLevel = 3, critical = false }: BlogCardProps) {
  const category = blogCategories.find((item) => item.id === post.category)
  const titleId = `blog-post-${post.slug}`
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const ref = useSectionReveal()
  return (
    <article className={styles.card} ref={ref}>
      <PageLink
        className={styles.cardLink}
        to={getBlogPostPath(post.slug)}
        aria-labelledby={titleId}
        data-reveal
      >
        <BlogPhoto
          image={post.image}
          critical={critical}
          sizes="(min-width: 1660px) 480px, (min-width: 1100px) 29vw, (min-width: 600px) 44vw, 90vw"
          className={styles.cardPhoto}
        />
        <div className={styles.cardCopy}>
          <span className={styles.cardMeta}>{category?.label}</span>
          <Heading id={titleId}>{post.title}</Heading>
          <p>{post.excerpt}</p>
          <span className={styles.readLink}>
            Leggi la guida <Icon name="arrow" />
          </span>
        </div>
      </PageLink>
    </article>
  )
}
