import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SlowMoRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  scale?: number
  blur?: string
  once?: boolean
}

export function SlowMoReveal({
  children,
  className,
  delay = 0,
  duration = 1.8,
  y = 40,
  scale = 0.95,
  blur = '6px',
  once = true,
}: SlowMoRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{
          opacity: 0,
          y,
          scale,
          filter: `blur(${blur})`,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }
            : {}
        }
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
