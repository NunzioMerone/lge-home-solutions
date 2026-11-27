import { useState } from 'react'
import { Skeleton } from '../ui/Skeleton'
import { SettledImage } from '../ui/SettledImage'
import { assetUrl } from '../../utils/assetUrl'
import type { BlogPhotoProps, BlogPhotoStatus } from '../../types/blog'
import styles from './Blog.module.css'

export function BlogPhoto(props: BlogPhotoProps) {
  return <BlogPhotoContent key={props.image.path} {...props} />
}

function BlogPhotoContent({ image, sizes, critical = false, className = '' }: BlogPhotoProps) {
  const [status, setStatus] = useState<BlogPhotoStatus>('loading')
  return (
    <div className={`${styles.photo} ${className}`}>
      {status === 'loading' && <Skeleton className={styles.photoSkeleton} />}
      {status === 'error' ? (
        <span className={styles.photoFallback}>Immagine non disponibile</span>
      ) : (
        <SettledImage
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
          onSettled={(ready) => setStatus(ready ? 'ready' : 'error')}
        />
      )}
    </div>
  )
}
