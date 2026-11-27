import { useHydrated } from '../../hooks/useHydrated'
import { useSearchParams } from 'react-router-dom'
import { PageLink } from '../../components/ui/PageLink'
import { BlogLayout } from '../../components/blog/BlogLayout'
import { BlogCard } from '../../components/blog/BlogCard'
import { BlogContact } from '../../components/blog/BlogContact'
import { blogCategories, blogPosts } from '../../data/blog'
import { getBlogFilterPath, parseBlogFilter } from '../../utils/blog'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import styles from '../../components/blog/Blog.module.css'

export function Blog() {
  const [params] = useSearchParams()
  const hydrated = useHydrated()
  const selected = parseBlogFilter(hydrated ? params.get('argomento') : null, blogCategories)
  const posts =
    selected === 'tutti' ? blogPosts : blogPosts.filter((post) => post.category === selected)
  const introRef = useSectionReveal({ duration: 1.1, stagger: 0.12 })
  const filtersRef = useSectionReveal({ duration: 1.15, stagger: 0.08 })
  const category = blogCategories.find((item) => item.id === selected)

  return (
    <BlogLayout>
      <div className="container">
        <header className={styles.intro} ref={introRef}>
          <h1 data-reveal>
            Idee per abitare <em>meglio.</em>
          </h1>
          <p data-reveal>Consigli e ispirazioni per la tua casa, dentro e fuori.</p>
        </header>
        <section
          className={styles.articles}
          aria-label="Articoli del blog"
          id="articoli"
          tabIndex={-1}
        >
          <nav className={styles.filters} aria-label="Argomenti del blog" ref={filtersRef}>
            <PageLink
              to={getBlogFilterPath('tutti')}
              aria-current={selected === 'tutti' ? 'page' : undefined}
              data-reveal
            >
              Tutti
            </PageLink>
            {blogCategories.map((item) => (
              <PageLink
                key={item.id}
                to={getBlogFilterPath(item.id)}
                aria-current={selected === item.id ? 'page' : undefined}
                data-reveal
              >
                {item.label}
              </PageLink>
            ))}
          </nav>
          <p className="sr-only" role="status" aria-atomic="true">
            {selected === 'tutti' ? 'Tutti gli articoli' : category?.label}: {posts.length}{' '}
            {posts.length === 1 ? 'articolo' : 'articoli'} nella raccolta.
          </p>
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} headingLevel={2} critical={index === 0} />
            ))}
          </div>
        </section>
      </div>
      <BlogContact />
    </BlogLayout>
  )
}
