import type { CarouselArrowProps } from '../../types/carousel'
import { Icon } from './Icon'
import styles from './CarouselArrow.module.css'

export function CarouselArrow({
  direction,
  label,
  controlsId,
  onClick,
  disabled = false,
  showOnMobile = false,
}: CarouselArrowProps) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label={label}
      aria-controls={controlsId}
      onClick={onClick}
      disabled={disabled}
      data-direction={direction}
      data-show-on-mobile={showOnMobile || undefined}
    >
      <Icon name={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
    </button>
  )
}
