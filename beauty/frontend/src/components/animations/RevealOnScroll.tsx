import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
}

const directionMap = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  none: {},
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 50,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  const dir = directionMap[direction]
  const initial: Record<string, number> = { opacity: 0, ...dir }
  if ('x' in initial) initial.x = initial.x! * distance
  if ('y' in initial) initial.y = initial.y! * distance

  return (
    <div ref={ref} className={cn('', className)}>
      <motion.div
        initial={initial}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
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
