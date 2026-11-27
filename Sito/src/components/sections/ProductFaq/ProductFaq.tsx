import { productFaqId } from '../../../data/productFaqs'
import type { ProductFaqContent } from '../../../types/productFaq'
import { getBlogPostPath } from '../../../utils/blog'
import { PageLink } from '../../ui/PageLink'
import styles from './ProductFaq.module.css'

export function ProductFaq({ title, questions }: ProductFaqContent) {
  return (
    <section
      id={productFaqId}
      className={styles.section}
      aria-labelledby="product-faq-title"
      tabIndex={-1}
    >
      <div className={`container ${styles.layout}`}>
        <h2 id="product-faq-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.questions}>
          {questions.map(({ question, answer, guide }) => (
            <details className={styles.item} key={question}>
              <summary className={styles.question}>
                {question}
                <span className={styles.indicator} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>{answer}</p>
                {guide && <PageLink to={getBlogPostPath(guide.slug)}>{guide.label}</PageLink>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
