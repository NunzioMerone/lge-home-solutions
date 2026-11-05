import { createContext } from 'react'
import type { ProductTransitionContextValue } from '../types/productTransition'

export const ProductTransitionContext = createContext<ProductTransitionContextValue | null>(null)
