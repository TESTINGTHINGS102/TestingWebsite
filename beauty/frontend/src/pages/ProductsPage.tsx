import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Products } from '@/components/sections/Products'

export function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <Products />
      </main>
      <Footer />
    </>
  )
}
