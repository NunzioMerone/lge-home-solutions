import type { ProductOptionDetailsProps } from '../../types/ui'
import styles from './ProductOptionDetails.module.css'

/** Without JavaScript, the same model descriptions can be opened using their native summaries. */
export function ProductOptionDetails({ active, label, children }: ProductOptionDetailsProps) {
  return (
    <details className={styles.option} open={active}>
      <summary>{label}</summary>
      {children}
    </details>
  )
}
