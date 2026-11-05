import { useContext } from 'react'
import { ProductTransitionContext } from '../config/productTransitionContext'

export function useProductTransition() {
  const transition = useContext(ProductTransitionContext)
  if (!transition) throw new Error('useProductTransition requires ProductTransitionProvider')
  return transition
}
