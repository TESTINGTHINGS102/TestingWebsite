import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollTextReveal } from '@/components/animations/ScrollTextReveal'
import { SlowMoReveal } from '@/components/animations/SlowMoReveal'
import { ParticleBackground } from '@/components/animations/ParticleBackground'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'

const floatingOrbs = [
  { size: 300, x: '10%', y: '20%', delay: 0, color: 'rgba(244,63,94,0.08)' },
  { size: 200, x: '80%', y: '30%', delay: 1.5, color: 'rgba(244,63,94,0.05)' },
  { size: 150, x: '60%', y: '70%', delay: 3, color: 'rgba(201,169,110,0.06)' },
  { size: 250, x: '30%', y: '80%', delay: 2, color: 'rgba(201,169,110,0.04)' },
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-luxury-black"
    >
      <ParticleBackground particleCount={50} speed={0.2} />

      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-luxury-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-radial from-rose-500/10 via-transparent to-transparent" />
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-luxury-black to-luxury-black" />
        <div className="noise-overlay" />
      </motion.div>

      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <SlowMoReveal delay={0.2}>
          <p className="text-xs tracking-[0.3em] uppercase text-rose-300/80 mb-6 font-light">
            Luxury Skincare Collection
          </p>
        </SlowMoReveal>

        <ScrollTextReveal
          text="Radiance in Every Drop"
          as="h1"
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-pearl leading-[1.1] mb-8 tracking-tight"
          splitBy="words"
          stagger={0.06}
          duration={0.9}
        />

        <SlowMoReveal delay={0.6}>
          <p className="text-base md:text-lg text-luxury-silver/50 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Where science meets nature. Discover our curated collection of premium skincare 
            formulated for the discerning.
          </p>
        </SlowMoReveal>

        <SlowMoReveal delay={0.9}>
          <div className="flex items-center justify-center gap-4">
            <MagneticButton onClick={() => navigate('/products')}>
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </MagneticButton>
            <MagneticButton onClick={() => navigate('/about')}>
              <Button variant="outline" size="lg">
                Our Story
              </Button>
            </MagneticButton>
          </div>
        </SlowMoReveal>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20 animate-bounce">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
