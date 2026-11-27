import { useState } from 'react'
import { PageLink } from '../../ui/PageLink'
import { contacts } from '../../../config/contacts'
import type { ProjectClosingProps } from '../../../types/gallery'
import { Icon } from '../../ui/Icon'
import { Skeleton } from '../../ui/Skeleton'
import { WhatsAppContactLink } from '../../ui/WhatsAppContactLink'
import { GalleryImage } from './GalleryImage'
import styles from './ProjectClosing.module.css'

const showroomAddress = [contacts.address, `${contacts.locality} (${contacts.province})`]
  .filter(Boolean)
  .join(', ')

export function ProjectClosing({
  titleId,
  title,
  description,
  photo,
  showroom,
}: ProjectClosingProps) {
  const [settledPhoto, setSettledPhoto] = useState<string>()
  const portrait = photo ? photo.height > photo.width : false

  return (
    <section className={styles.closing} aria-labelledby={titleId}>
      <div className="container">
        <div
          className={styles.layout}
          data-photo-shape={photo && (portrait ? 'portrait' : 'landscape')}
        >
          <div className={styles.copy}>
            {showroom && <p className={styles.showroom}>Vieni a trovarci nel nostro showroom</p>}
            <h2 id={titleId} className={showroom ? styles.title : styles.galleryTitle}>
              {title}
            </h2>
            <p className={styles.description}>{description}</p>
            {showroom?.showAddress && (
              <address className={styles.address}>
                <Icon name="pin" />
                {showroomAddress}
              </address>
            )}
            <div className={styles.actions}>
              <WhatsAppContactLink className={styles.contact} />
              {showroom && (
                <a
                  className={styles.link}
                  href={contacts.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Indicazioni <Icon name="external" />
                  <span className="sr-only"> (nuova scheda)</span>
                </a>
              )}
            </div>
          </div>
          {photo && (
            <figure className={styles.figure}>
              <div className={styles.media}>
                {settledPhoto !== photo.id && <Skeleton className={styles.placeholder} />}
                <GalleryImage
                  key={photo.id}
                  photo={photo}
                  alt={photo.alt}
                  includeFullWidth
                  sizes={
                    portrait
                      ? 'auto, (min-width: 1660px) 560px, (min-width: 900px) 35vw, (min-width: 470px) 340px, 76vw'
                      : 'auto, (min-width: 1660px) 900px, (min-width: 900px) 54vw, (min-width: 820px) 720px, 86vw'
                  }
                  onSettled={() => setSettledPhoto(photo.id)}
                />
              </div>
              <figcaption className={styles.caption}>
                <span>Una realizzazione LGE</span>
                {showroom && (
                  <PageLink className={styles.link} to={showroom.worksPath}>
                    {showroom.worksLabel} <Icon name="arrow" />
                  </PageLink>
                )}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}
