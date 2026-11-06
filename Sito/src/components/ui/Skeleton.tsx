import type { SkeletonProps, SkeletonTextProps } from '../../types/skeleton'
import styles from './Skeleton.module.css'

export function Skeleton({ className }: SkeletonProps) {
  return <span className={`${styles.block} ${className ?? ''}`} data-skeleton aria-hidden="true" />
}

export function SkeletonText({ className, lines = 3 }: SkeletonTextProps) {
  return (
    <div className={`${styles.text} ${className ?? ''}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  )
}
