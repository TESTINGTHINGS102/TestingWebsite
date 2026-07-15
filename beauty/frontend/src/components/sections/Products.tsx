import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollTextReveal } from '@/components/animations/ScrollTextReveal'
import { SlowMoReveal } from '@/components/animations/SlowMoReveal'
import { LiquidMask } from '@/components/animations/LiquidMask'
import { GlowCard } from '@/components/animations/GlowCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import { staggerContainer } from '@/utils/animations'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: '1',
    name: 'Radiance Renewal Serum',
    description: 'A potent concentrate of vitamin C and hyaluronic acid for luminous skin.',
    price: 185,
    category: 'Serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    isNew: true,
  },
  {
    id: '2',
    name: 'Silk Protein Moisturizer',
    description: 'Ultra-rich cream infused with silk amino acids and ceramides.',
    price: 220,
    category: 'Moisturizers',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80',
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Golden Eye Treatment',
    description: 'Luxurious eye cream with 24k gold micro-particles and peptides.',
    price: 275,
    category: 'Eye Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    isNew: true,
  },
  {
    id: '4',
    name: 'Rose Clay Mask',
    description: 'Detoxifying mask with Moroccan rose clay and chamomile.',
    price: 95,
    category: 'Masks',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee8e39?w=600&q=80',
    isBestSeller: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.product-card')
    if (!cards?.length) return

    cards.forEach((card) => {
      const img = card.querySelector('img')
      if (!img) return

      const tl = gsap.timeline({ paused: true })
      tl.to(img, { scale: 1.1, duration: 0.6, ease: 'power2.out' })

      card.addEventListener('mouseenter', () => tl.play())
      card.addEventListener('mouseleave', () => tl.reverse())
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-32 px-6 bg-luxury-black overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="glow-ring w-[600px] h-[600px] -top-48 -right-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <SlowMoReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-rose-300/60 mb-4 font-light">
              Curated Collection
            </p>
          </SlowMoReveal>

          <ScrollTextReveal
            text="Discover Your Ritual"
            as="h2"
            className="font-serif text-4xl md:text-6xl text-luxury-pearl mb-6"
            splitBy="words"
            stagger={0.05}
          />

          <SlowMoReveal delay={0.3}>
            <p className="text-luxury-silver/40 font-light max-w-lg mx-auto">
              Each product is meticulously crafted with the finest ingredients sourced from around the world.
            </p>
          </SlowMoReveal>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, i) => (
            <motion.div key={product.id} variants={cardVariants}>
              <motion.div
                className="product-card group cursor-pointer"
                onHoverStart={() => setHoveredId(product.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => navigate(`/products/${product.id}`)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard glowColor="rgba(244, 63, 94, 0.1)" hoverScale={1}>
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-luxury-charcoal">
                    <LiquidMask
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={800}
                      className="w-full h-full"
                    />
                    <div className={cn(
                      'absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent',
                      'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    )} />
                    {product.isNew && (
                      <motion.span
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-3 left-3 px-3 py-1 bg-rose-500/90 text-white text-[10px] tracking-widest uppercase rounded-full"
                      >
                        New
                      </motion.span>
                    )}
                    {product.isBestSeller && (
                      <motion.span
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-3 left-3 px-3 py-1 bg-champagne-500/90 text-luxury-black text-[10px] tracking-widest uppercase rounded-full"
                      >
                        Best Seller
                      </motion.span>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.span
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white text-xs tracking-widest uppercase border border-white/20"
                      >
                        Quick View
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-rose-300/40">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-lg text-luxury-pearl group-hover:text-rose-200 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-luxury-silver/30 font-light line-clamp-1">
                      {product.description}
                    </p>
                    <p className="font-medium text-luxury-pearl/80">${product.price}</p>
                  </div>
                </GlowCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <SlowMoReveal delay={0.6}>
          <div className="text-center mt-16">
            <MagneticButton onClick={() => navigate('/products')}>
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </MagneticButton>
          </div>
        </SlowMoReveal>
      </div>
    </section>
  )
}
