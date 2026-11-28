import type { BlogBylineProps } from '../../types/blog'
import styles from './Blog.module.css'

const editorialDate = new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'UTC' })

export function BlogByline({ publication }: BlogBylineProps) {
  if (publication.status !== 'published') return null
  const { author, datePublished, dateModified } = publication
  if (!author && !datePublished && !dateModified) return null

  return (
    <div className={styles.byline}>
      {author && <span>Di {author.name}</span>}
      {datePublished && (
        <span>
          Pubblicato il{' '}
          <time dateTime={datePublished}>
            {editorialDate.format(new Date(datePublished.slice(0, 10)))}
          </time>
        </span>
      )}
      {dateModified && dateModified !== datePublished && (
        <span>
          Aggiornato il{' '}
          <time dateTime={dateModified}>
            {editorialDate.format(new Date(dateModified.slice(0, 10)))}
          </time>
        </span>
      )}
    </div>
  )
}
