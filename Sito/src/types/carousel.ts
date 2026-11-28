export interface LoopCarouselOptions {
  active?: boolean
  paused?: boolean
  delay?: number
  continuousSpeed?: number
  onSelect?: () => void
}
export interface CarouselArrowProps {
  direction: 'previous' | 'next'
  label: string
  controlsId: string
  onClick: () => void
  disabled?: boolean
  showOnMobile?: boolean
}

export interface PaginationWindow {
  start: number
  from: number
  size: number
  selected: number
  indices: number[]
}
