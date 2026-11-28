import type { DocumentPreviewProps } from '../../types/competencyDocuments'
import { Icon } from '../../components/ui/Icon'
import styles from './Competencies.module.css'

export function DocumentPreview({ document, onOpen }: DocumentPreviewProps) {
  return (
    <button
      type="button"
      className={styles.document}
      onClick={(event) => onOpen({ document, trigger: event.currentTarget })}
      aria-haspopup="dialog"
    >
      <span className={styles.documentImage}>
        <img
          src={document.thumbnail ?? document.preview}
          alt=""
          width={document.width}
          height={document.height}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className={styles.documentHolder}>{document.holder}</span>
      <span className={styles.documentLink}>
        Visualizza attestato<span className="sr-only"> · {document.title}</span>
        <Icon name="expand" />
      </span>
    </button>
  )
}
