import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollTextReveal } from '@/components/animations/ScrollTextReveal'
import { SlowMoReveal } from '@/components/animations/SlowMoReveal'
import { Counter } from '@/components/animations/Counter'
import { RevealOnScroll } from '@/components/animations/RevealOnScroll'
import { ComparisonSlider } from '@/components/animations/ComparisonSlider'
import { EditorialParallax } from '@/components/animations/EditorialParallax'

const stats = [
  { label: 'Years of Excellence', value: 12, suffix: '+' },
  { label: 'Happy Clients', value: 15000, suffix: '+' },
  { label: 'Products Developed', value: 240, suffix: '+' },
  { label: 'Global Awards', value: 38, suffix: '' },
]

const milestones = [
  { year: '2014', title: 'Founded in Geneva', description: 'A vision to merge science with natural luxury.' },
  { year: '2017', title: 'First Flagship Store', description: 'Opened our doors in the heart of Zurich.' },
  { year: '2020', title: 'Global Expansion', description: 'Launched in 25 countries worldwide.' },
  { year: '2024', title: 'Innovation Lab', description: 'Opened state-of-the-art R&D facility in the Swiss Alps.' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 px-6 bg-luxury-black overflow-hidden"
    >
      <div className="noise-overlay" />
      <div className="glow-ring w-[500px] h-[500px] -bottom-48 -left-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative">
            <EditorialParallax
              layers={[
                {
                  src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
                  speed: -0.3,
                  className: 'w-64 h-64 -top-20 -left-20',
                  initialX: -50,
                  initialY: -50,
                },
              ]}
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-luxury-charcoal"
            >
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
                alt="Luxury skincare"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </EditorialParallax>

            <motion.div
              className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-luxury-charcoal"
              style={{ y: parallaxY }}
            >
              <img
                src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80"
                alt="Product detail"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </div>

          <div>
            <SlowMoReveal>
              <p className="text-xs tracking-[0.3em] uppercase text-rose-300/60 mb-4 font-light">
                Our Philosophy
              </p>
            </SlowMoReveal>

            <ScrollTextReveal
              text="Where Science Meets Nature"
              as="h2"
              className="font-serif text-4xl md:text-5xl text-luxury-pearl mb-6 leading-tight"
              splitBy="words"
            />

            <SlowMoReveal delay={0.3}>
              <p className="text-luxury-silver/50 font-light leading-relaxed mb-6">
                For over a decade, Beauty has been at the forefront of clean luxury skincare. 
                Our formulations combine cutting-edge biotechnology with the purest botanical 
                extracts sourced from sustainable farms worldwide.
              </p>
            </SlowMoReveal>

            <SlowMoReveal delay={0.5}>
              <p className="text-luxury-silver/40 font-light leading-relaxed">
                Every product is meticulously tested, dermatologist-approved, and crafted in 
                our state-of-the-art laboratories in the Swiss Alps. We believe that true 
                beauty is a harmonious balance of innovation and tradition.
              </p>
            </SlowMoReveal>
          </div>
        </div>

        <RevealOnScroll direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-luxury-charcoal/50 backdrop-blur-sm border border-white/5"
              >
                <p className="font-serif text-4xl md:text-5xl text-rose-300 mb-2">
                  <Counter to={stat.value} suffix={stat.suffix} duration={2.5} />
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-luxury-silver/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.2}>
          <div className="mb-32">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-rose-300/60 mb-4 font-light">
                Our Journey
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-luxury-pearl">
                Milestones
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/40 via-rose-500/20 to-transparent" />

              <div className="space-y-16">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-8 md:gap-16`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <p className="text-rose-300/60 text-sm tracking-widest uppercase mb-1">{milestone.year}</p>
                      <h3 className="font-serif text-2xl text-luxury-pearl mb-2">{milestone.title}</h3>
                      <p className="text-luxury-silver/40 font-light text-sm max-w-md">{milestone.description}</p>
                    </div>

                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500/30 border-2 border-rose-500/60" />

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="max-w-3xl mx-auto text-center mb-20">
          <SlowMoReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-rose-300/60 mb-4 font-light">
              See the Difference
            </p>
          </SlowMoReveal>

          <ScrollTextReveal
            text="Visible Results"
            as="h2"
            className="font-serif text-4xl md:text-5xl text-luxury-pearl mb-8"
            splitBy="words"
          />
        </div>

        <SlowMoReveal delay={0.3}>
          <ComparisonSlider
            before={{
              src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80',
              label: 'Before',
            }}
            after={{
              src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
              label: 'After (4 weeks)',
            }}
            className="max-w-2xl mx-auto aspect-square"
          />
        </SlowMoReveal>
      </div>
    </section>
  )
}
