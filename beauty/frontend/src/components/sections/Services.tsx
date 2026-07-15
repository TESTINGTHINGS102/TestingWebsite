import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScrollTextReveal } from '@/components/animations/ScrollTextReveal'
import { SlowMoReveal } from '@/components/animations/SlowMoReveal'
import { GlowCard } from '@/components/animations/GlowCard'
import { staggerContainer } from '@/utils/animations'
import { cn } from '@/utils/cn'

const services = [
  {
    title: 'Facial Treatments',
    description: 'Customized facials using premium products tailored to your skin type and concerns.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    price: 'From $150',
    icon: '✨',
  },
  {
    title: 'Skin Analysis',
    description: 'Advanced skin diagnostics with AI-powered imaging for precise treatment planning.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
    price: 'From $80',
    icon: '🔬',
  },
  {
    title: 'Massage Therapy',
    description: 'Holistic massage techniques to relax, rejuvenate, and restore your natural glow.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    price: 'From $120',
    icon: '💆',
  },
  {
    title: 'Beauty Consultation',
    description: 'One-on-one consultation with our experts for a personalized skincare routine.',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80',
    price: 'From $60',
    icon: '💎',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Services() {
  const navigate = useNavigate()

  return (
    <section
      id="services"
      className="relative py-32 px-6 bg-luxury-black overflow-hidden"
    >
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <SlowMoReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-rose-300/60 mb-4 font-light">
              Premium Services
            </p>
          </SlowMoReveal>

          <ScrollTextReveal
            text="Indulge in Excellence"
            as="h2"
            className="font-serif text-4xl md:text-6xl text-luxury-pearl mb-6"
            splitBy="words"
            stagger={0.05}
          />

          <SlowMoReveal delay={0.3}>
            <p className="text-luxury-silver/40 font-light max-w-lg mx-auto">
              Experience our curated menu of luxury treatments designed to elevate your skincare journey.
            </p>
          </SlowMoReveal>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, i) => (
            <motion.div key={service.title} variants={cardVariants}>
              <GlowCard
                onClick={() => navigate('/services')}
                hoverScale={1.02}
                glowColor="rgba(244, 63, 94, 0.12)"
              >
                <div className="group relative overflow-hidden rounded-2xl bg-luxury-charcoal">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-transparent" />
                    <div className="shimmer-overlay" />
                  </div>

                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-rose-500/20 backdrop-blur-sm flex items-center justify-center text-lg">
                    {service.icon}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-rose-300/60 mb-2">
                      {service.price}
                    </p>
                    <h3 className="font-serif text-2xl text-luxury-pearl mb-2 group-hover:text-rose-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className={cn(
                      'text-sm text-luxury-silver/50 font-light max-w-md',
                      'transform transition-all duration-500',
                    )}>
                      {service.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 border border-white/0 group-hover:border-rose-500/30 rounded-2xl transition-all duration-500 pointer-events-none" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
