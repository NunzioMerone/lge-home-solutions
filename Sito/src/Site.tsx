import App from './App'
import { MotionProvider } from './components/ui/MotionProvider'
import { ProductTransitionProvider } from './components/ui/ProductTransitionProvider'

export function Site() {
  return (
    <MotionProvider>
      <ProductTransitionProvider>
        <App />
      </ProductTransitionProvider>
    </MotionProvider>
  )
}
