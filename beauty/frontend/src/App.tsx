import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { FluidCursor } from '@/components/ui/FluidCursor'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { AboutPage } from '@/pages/AboutPage'

export default function App() {
  return (
    <ErrorBoundary>
      <FluidCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </ErrorBoundary>
  )
}
