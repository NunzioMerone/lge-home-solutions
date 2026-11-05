import { heroVideoMedia, heroVideoSources } from '../../../config/hero'
import { useHeroVideo } from '../../../hooks/useHeroVideo'
import { assetUrl } from '../../../utils/assetUrl'
import type { PageActivityProps } from '../../../types/navigation'
import styles from './Hero.module.css'

export function HeroVideo({ active }: PageActivityProps) {
  const { videoRef, format, source, videoEnabled, onError } = useHeroVideo(active)

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <picture>
        <source
          media={heroVideoMedia.portrait}
          srcSet={assetUrl(heroVideoSources.mobile.poster)}
          width={heroVideoSources.mobile.width}
          height={heroVideoSources.mobile.height}
        />
        <source
          media={heroVideoMedia.compact}
          srcSet={assetUrl(heroVideoSources.tablet.poster)}
          width={heroVideoSources.tablet.width}
          height={heroVideoSources.tablet.height}
        />
        <img
          src={assetUrl(heroVideoSources.desktop.poster)}
          width={heroVideoSources.desktop.width}
          height={heroVideoSources.desktop.height}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
      {videoEnabled && (
        <video
          key={format}
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
          <source src={assetUrl(source.video)} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
