import { useImperativeHandle, useRef, useState } from 'react'
import { EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import type { GalleryLightboxCarouselProps } from '../../../types/gallery'
import { getLoopOffset } from '../../../utils/loopCarousel'
import { GalleryLightboxSlide } from './GalleryLightboxSlide'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import styles from './GalleryLightbox.module.css'

export default function GalleryLightboxCarousel({
  ref,
  photos,
  initialIndex,
  selectedIndex,
  reducedMotion,
  onSelect,
  onReady,
  onClose,
}: GalleryLightboxCarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const [settledIndex, setSettledIndex] = useState(initialIndex)
  const speed = reducedMotion ? 0 : 480
  const previous = () => swiperRef.current?.slidePrev(speed)
  const next = () => swiperRef.current?.slideNext(speed)

  useImperativeHandle(ref, () => ({ previous, next }))

  return (
    <Swiper
      key={reducedMotion ? 'reduced' : 'coverflow'}
      className={styles.viewport}
      modules={[EffectCoverflow]}
      effect={reducedMotion ? 'slide' : 'coverflow'}
      coverflowEffect={{ rotate: 45, depth: 100, stretch: '28%', slideShadows: false }}
      initialSlide={selectedIndex}
      centeredSlides
      slidesPerView="auto"
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
      onTransitionEnd={(swiper) => setSettledIndex(swiper.realIndex)}
    >
      {photos.map((photo, index) => {
        const active = index === selectedIndex
        // Keep the outgoing neighbours until settling so a flick cannot reveal an empty frame.
        const nearby =
          Math.abs(getLoopOffset(index, selectedIndex, photos.length)) <= 1 ||
          Math.abs(getLoopOffset(index, settledIndex, photos.length)) <= 1
        return (
          <SwiperSlide
            className={styles.slide}
            key={photo.id}
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
                navigable={photos.length > 1}
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
