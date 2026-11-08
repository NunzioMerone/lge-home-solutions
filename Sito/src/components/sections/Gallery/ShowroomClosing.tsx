import { Link } from 'react-router-dom'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import type { ShowroomClosingProps } from '../../../types/gallery'
import { Icon } from '../../ui/Icon'
import { GalleryImage } from './GalleryImage'
import styles from './ShowroomClosing.module.css'

export function ShowroomClosing({
  titleId,
  photo,
  worksPath,
  worksLabel,
  children,
}: ShowroomClosingProps) {
  const section = useSectionReveal()
  const portrait = photo ? photo.height > photo.width : false

  return (
    <section
      className={styles.closing}
      aria-labelledby={titleId}
      data-photo={photo ? (portrait ? 'portrait' : 'landscape') : undefined}
      ref={section}
    >
      <div className={`container ${styles.inner}`}>
        <header className={styles.copy} data-reveal>
          {children}
          {photo && (
            <Link className={styles.worksLink} to={worksPath}>
              {worksLabel} <Icon name="arrow" />
            </Link>
          )}
        </header>
        {photo && (
          <figure className={styles.figure} data-reveal>
            <GalleryImage
              photo={photo}
              alt={photo.alt}
              sizes={portrait ? 'auto, (min-width: 500px) 540px, 91vw' : 'auto, 91vw'}
            />
            <figcaption>Una realizzazione LGE</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
