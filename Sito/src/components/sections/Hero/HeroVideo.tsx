import { desktopHeroVideoSource, responsiveHeroVideoSources } from '../../../config/hero'
import { assetUrl } from '../../../utils/assetUrl'
import type { HeroVideoProps } from '../../../types/hero'
import styles from './Hero.module.css'

export function HeroVideo({ backdropRef, videoRef, source, visible, onError }: HeroVideoProps) {
  return (
    <div ref={backdropRef} className={styles.backdrop} aria-hidden="true">
      <picture>
        {responsiveHeroVideoSources.map(({ media, poster, width, height }) => (
          <source
            key={media}
            media={media}
            srcSet={assetUrl(poster)}
            width={width}
            height={height}
          />
        ))}
        <img
          src={assetUrl(desktopHeroVideoSource.poster)}
          width={desktopHeroVideoSource.width}
          height={desktopHeroVideoSource.height}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
      {source && (
        <video
          key={source.video}
          ref={videoRef}
          id="hero-video"
          className={styles.video}
          poster={assetUrl(source.poster)}
          width={source.width}
          height={source.height}
          muted
          playsInline
          loop
          preload={visible ? 'auto' : 'none'}
          tabIndex={-1}
          onError={(event) => {
            if (event.target === event.currentTarget) onError(source.video)
          }}
        >
          {source.efficientVideo && (
            <source src={assetUrl(source.efficientVideo)} type='video/mp4; codecs="hvc1"' />
          )}
          <source
            src={assetUrl(source.video)}
            type="video/mp4"
            onError={() => onError(source.video)}
          />
        </video>
      )}
    </div>
  )
}
