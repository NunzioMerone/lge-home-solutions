import { Icon } from './Icon'
import styles from './ConfiguratorLink.module.css'

export function ConfiguratorLink() {
  return (
    <span className={styles.link} role="link" aria-disabled="true" tabIndex={0}>
      Vai al configuratore <Icon name="arrow" />
    </span>
  )
}
