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
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const ref = useSectionReveal()
  return (
    <article className={styles.card} ref={ref}>
      <div className={styles.cardBody} data-reveal>
        <BlogPhoto
          image={post.image}
          critical={critical}
          sizes="(min-width: 1660px) 480px, (min-width: 1100px) 29vw, (min-width: 600px) 44vw, 90vw"
          className={styles.cardPhoto}
        />
        <div className={styles.cardCopy}>
          <span className={styles.cardMeta}>{category?.label}</span>
          <Heading>{post.title}</Heading>
          <p>{post.excerpt}</p>
          <PageLink className={styles.readLink} to={getBlogPostPath(post.slug)}>
            Leggi la guida<span className="sr-only">: {post.title}</span>
            <Icon name="arrow" />
          </PageLink>
        </div>
      </div>
    </article>
  )
}
