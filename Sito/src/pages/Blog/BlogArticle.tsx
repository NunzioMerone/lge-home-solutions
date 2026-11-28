import { useParams } from 'react-router-dom'
import { PageLink } from '../../components/ui/PageLink'
import { blogPage } from '../../config/blog'
import { blogCategories, blogPosts } from '../../data/blog'
import { blogArticles } from '../../data/blogArticles'
import { getArticleBreadcrumbs, getBlogFilterPath, getRelatedBlogPosts } from '../../utils/blog'
import { BlogLayout } from '../../components/blog/BlogLayout'
import { BlogPhoto } from '../../components/blog/BlogPhoto'
import { BlogCard } from '../../components/blog/BlogCard'
import { BlogContact } from '../../components/blog/BlogContact'
import { BlogArticleSection } from '../../components/blog/BlogArticleSection'
import { BlogByline } from '../../components/blog/BlogByline'
import { useActiveArticleSection } from '../../hooks/useActiveArticleSection'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { Icon } from '../../components/ui/Icon'
import { SectionIndex } from '../../components/ui/SectionIndex'
import styles from '../../components/blog/Blog.module.css'

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((item) => item.slug === slug)
  const content = post ? blogArticles[post.slug] : undefined
  const { bodyRef, activeSectionId } = useActiveArticleSection(content?.sections)
  const headerRef = useSectionReveal()
  const photoRef = useSectionReveal()
  const asideRef = useSectionReveal()
  const leadRef = useSectionReveal<HTMLDivElement>()
  const endingRef = useSectionReveal<HTMLDivElement>()
  const relatedRef = useSectionReveal()
  const notFoundRef = useSectionReveal<HTMLDivElement>()

  if (!post || !content)
    return (
      <BlogLayout>
        <div className={`container ${styles.notFound}`} ref={notFoundRef}>
          <span className="eyebrow" data-reveal>
            Blog LGE · Pagina non trovata
          </span>
          <h1 data-reveal>
            Questo articolo <em>non è qui.</em>
          </h1>
          <p data-reveal>
            Il collegamento potrebbe non essere corretto. Nel blog trovi tutte le nostre guide.
          </p>
          <PageLink className={styles.readLink} to={blogPage.path} data-reveal>
            Torna al blog <Icon name="arrow" />
          </PageLink>
        </div>
      </BlogLayout>
    )

  const category = blogCategories.find((item) => item.id === post.category)
  const related = getRelatedBlogPosts(post, blogPosts)
  const breadcrumbs = getArticleBreadcrumbs(post)

  return (
    <BlogLayout>
      <article className="container">
        <SectionIndex
          className={styles.mobileIndex}
          label="Indice della guida"
          items={content.sections.map(({ id, title }) => ({ id, label: title }))}
          activeId={activeSectionId}
        />
        <nav className={styles.breadcrumb} aria-label="Percorso di navigazione">
          <ol>
            {breadcrumbs.map(({ name, path }, index) => (
              <li key={path}>
                {index > 0 && <Icon name="chevron-right" />}
                {index === breadcrumbs.length - 1 ? (
                  <span aria-current="page">{name}</span>
                ) : (
                  <PageLink to={path}>{name}</PageLink>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <header className={styles.articleHeader} ref={headerRef}>
          <h1 data-reveal>{post.title}</h1>
          <p data-reveal>{post.excerpt}</p>
          <BlogByline publication={post.publication} />
          <PageLink
            className={`${styles.backLink} ${styles.mobileTopic}`}
            to={getBlogFilterPath(post.category)}
          >
            Tutte le guide: {category?.label} <Icon name="arrow" />
          </PageLink>
        </header>
        <figure className={styles.articleFigure} ref={photoRef}>
          <div data-reveal>
            <BlogPhoto
              image={post.image}
              critical
              sizes="(min-width: 1660px) 1500px, 91vw"
              className={styles.articlePhoto}
            />
          </div>
          <figcaption data-reveal>{post.image.caption}</figcaption>
        </figure>
        <div className={styles.articleLayout}>
          <aside className={styles.articleAside} ref={asideRef}>
            <nav
              className={styles.tableOfContents}
              aria-label="Indice dell’articolo"
              data-reveal
              data-reveal-direction="fade"
            >
              <span className="eyebrow">In questa guida</span>
              <ol>
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={activeSectionId === section.id ? 'location' : undefined}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
              <PageLink className={styles.backLink} to={getBlogFilterPath(post.category)}>
                <Icon name="chevron-left" /> Tutte le guide: {category?.label}
              </PageLink>
            </nav>
          </aside>
          <div className={styles.articleBody} ref={bodyRef}>
            <div ref={leadRef}>
              <p className={styles.articleLead} data-reveal>
                {content.introduction}
              </p>
            </div>
            {content.sections.map((section) => (
              <BlogArticleSection key={section.id} section={section} />
            ))}
            <div ref={endingRef}>
              <div className={styles.takeaway} data-reveal>
                <span className="eyebrow">Da tenere a mente</span>
                <p>{content.takeaway}</p>
                <PageLink className={styles.readLink} to={content.solution.path}>
                  {content.solution.label}
                  <Icon name="arrow" />
                </PageLink>
              </div>
              <div className={styles.sources} data-reveal>
                <h2>Per approfondire</h2>
                <ul>
                  {content.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.label}
                        <Icon name="external" />
                        <span className="sr-only"> (nuova scheda)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <PageLink className={styles.backLink} to={blogPage.path} data-reveal>
                <Icon name="chevron-left" /> Torna a tutti gli articoli
              </PageLink>
            </div>
          </div>
        </div>
      </article>
      <section className={`container ${styles.related}`} aria-labelledby="blog-related-title">
        <header className={styles.articlesHeading} ref={relatedRef}>
          <h2 id="blog-related-title" data-reveal>
            Altre idee, <em>per la tua casa.</em>
          </h2>
        </header>
        <div className={styles.grid}>
          {related.map((item) => (
            <BlogCard key={item.slug} post={item} />
          ))}
        </div>
      </section>
      <BlogContact />
    </BlogLayout>
  )
}
