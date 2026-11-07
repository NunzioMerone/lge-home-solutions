import { useCallback, useImperativeHandle, useRef } from 'react'
import { EffectCoverflow, Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import type { GalleryLightboxCarouselProps } from '../../../types/gallery'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { GalleryLightboxSlide } from './GalleryLightboxSlide'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/virtual'
import styles from './GalleryLightbox.module.css'

export default function GalleryLightboxCarousel({
  ref,
  photos,
  selectedIndex,
  reducedMotion,
  compact,
  onSelect,
  onReady,
  onClose,
}: GalleryLightboxCarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const speed = reducedMotion ? 0 : 400
  // Auto-sized slides make Swiper recalculate its position on every late image load.
  const slidesPerView = compact ? 1 / 0.84 : 1.5
  const previous = useCallback(() => {
    swiperRef.current?.slidePrev(speed)
  }, [speed])
  const next = useCallback(() => {
    swiperRef.current?.slideNext(speed)
  }, [speed])

  useImperativeHandle(ref, () => ({ previous, next }))

  return (
    <Swiper
      key={reducedMotion ? 'reduced' : 'coverflow'}
      className={styles.viewport}
      modules={[EffectCoverflow, Virtual]}
      effect={reducedMotion ? 'slide' : 'coverflow'}
      coverflowEffect={{ rotate: 45, depth: 100, stretch: '28%', slideShadows: false }}
      initialSlide={selectedIndex}
      centeredSlides
      slidesPerView={slidesPerView}
      virtual={photos.length > 9 ? { cache: false, addSlidesBefore: 1, addSlidesAfter: 1 } : false}
      loop={photos.length >= 5}
      rewind={photos.length < 5}
      loopPreventsSliding={false}
      speed={speed}
      threshold={8}
      grabCursor
      touchStartPreventDefault={false}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
        onReady()
      }}
      onRealIndexChange={(swiper) => onSelect(swiper.realIndex)}
    >
      {photos.map((photo, index) => {
        const active = index === selectedIndex
        // Decode two neighbours ahead; Virtual keeps the carousel's DOM bounded too.
        const nearby = Math.abs(getLoopOffset(index, selectedIndex, photos.length)) <= 2
        return (
          <SwiperSlide
            className={styles.slide}
            key={photo.id}
            virtualIndex={index}
            data-active={active}
            aria-hidden={!active}
            inert={!active}
            role="group"
            aria-roledescription="fotografia"
            aria-label={`${index + 1} di ${photos.length}`}
          >
            {nearby && (
              <GalleryLightboxSlide
                photo={photo}
                active={active}
                navigable={photos.length > 1 && !compact}
                compact={compact}
                onClose={onClose}
                onPrevious={previous}
                onNext={next}
              />
            )}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
