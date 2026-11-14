import { useState } from 'react'
import { Skeleton } from '../ui/Skeleton'
import { assetUrl } from '../../utils/assetUrl'
import type { BlogPhotoProps, BlogPhotoStatus } from '../../types/blog'
import styles from './Blog.module.css'

export function BlogPhoto({ image, sizes, critical = false, className = '' }: BlogPhotoProps) {
  const [status, setStatus] = useState<BlogPhotoStatus>('loading')
  return (
    <div className={`${styles.photo} ${className}`}>
      {status === 'loading' && <Skeleton className={styles.photoSkeleton} />}
      {status === 'error' ? (
        <span className={styles.photoFallback}>Immagine non disponibile</span>
      ) : (
        <img
          src={assetUrl(`${image.path}-${image.widths[0]}.webp`)}
          srcSet={image.widths
            .map((width) => `${assetUrl(`${image.path}-${width}.webp`)} ${width}w`)
            .join(', ')}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={critical ? 'eager' : 'lazy'}
          fetchPriority={critical ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  )
}
