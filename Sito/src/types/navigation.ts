import type { ReactNode } from 'react'

export interface MobileMenuProps {
  open: boolean
  activePath: string
  solutionsActive: boolean
  sectionsOpen: boolean
  onToggleSections: () => void
  onNavigate: () => void
}

export interface ScrollPosition {
  x: number
  y: number
}

export type HomeScrollTarget =
  { kind: 'position'; position: ScrollPosition } | { kind: 'anchor'; id: string }

export interface PageActivityProps {
  active: boolean
}

export interface PageLoadBoundaryProps {
  children: ReactNode
}

export interface PageLoadBoundaryState {
  failed: boolean
}
