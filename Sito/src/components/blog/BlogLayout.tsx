import { Header } from '../layout/Header'
import { Footer } from '../layout/Footer'
import { useBlogPageEntry } from '../../hooks/useBlogPageEntry'
import type { BlogLayoutProps } from '../../types/blog'
import styles from './Blog.module.css'

export function BlogLayout({ children }: BlogLayoutProps) {
  const mainRef = useBlogPageEntry()
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#blog-content">
        Vai al contenuto
      </a>
      <Header />
      <main className={styles.main} id="blog-content" tabIndex={-1} ref={mainRef}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
