import { desktopHeroVideoSource, responsiveHeroVideoSources } from '../../../config/hero'
import { useHeroVideo } from '../../../hooks/useHeroVideo'
import { assetUrl } from '../../../utils/assetUrl'
import type { PageActivityProps } from '../../../types/navigation'
import styles from './Hero.module.css'

export function HeroVideo({ active }: PageActivityProps) {
  const { videoRef, source, videoEnabled, onError } = useHeroVideo(active)

  return (
    <div className={styles.backdrop} aria-hidden="true">
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
      {videoEnabled && (
        <video
          key={source.video}
          ref={videoRef}
          id="hero-video"
          className={styles.video}
          poster={assetUrl(source.poster)}
          width={source.width}
          height={source.height}
          muted
          autoPlay={active}
          playsInline
          loop
          preload="auto"
          tabIndex={-1}
          onError={(event) => {
            if (event.target === event.currentTarget) onError()
          }}
        >
          {source.efficientVideo && (
            <source src={assetUrl(source.efficientVideo)} type='video/mp4; codecs="hvc1"' />
          )}
          <source src={assetUrl(source.video)} type="video/mp4" onError={onError} />
        </video>
      )}
    </div>
  )
}
