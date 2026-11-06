export interface SkeletonProps {
  className?: string | undefined
}

export interface SkeletonTextProps extends SkeletonProps {
  lines?: number
}

export type RouteSkeletonKind = 'competencies' | 'works' | 'article'
