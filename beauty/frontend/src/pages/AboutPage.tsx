import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { About } from '@/components/sections/About'

export function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </>
  )
}
