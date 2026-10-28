import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ProductPlaceholder } from './pages/ProductPlaceholder/ProductPlaceholder'
import { products } from './data/products'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {products.map((product) => (
        <Route key={product.path} path={product.path} element={<ProductPlaceholder />} />
      ))}
      <Route path="*" element={<ProductPlaceholder />} />
    </Routes>
  )
}
