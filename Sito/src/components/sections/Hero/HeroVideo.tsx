import { heroVideoMedia, heroVideoSources } from '../../../config/hero'
import { useHeroVideo } from '../../../hooks/useHeroVideo'
import { assetUrl } from '../../../utils/assetUrl'
import styles from './Hero.module.css'

export function HeroVideo() {
  const { videoRef, format, source, videoEnabled, onError } = useHeroVideo()

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
          src={assetUrl(source.video)}
          poster={assetUrl(source.poster)}
          width={source.width}
          height={source.height}
          muted
          playsInline
          loop
          preload="auto"
          tabIndex={-1}
          onError={onError}
        />
      )}
    </div>
  )
}
