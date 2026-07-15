import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

interface StaggerFadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  duration?: number
  y?: number
  once?: boolean
}

export function StaggerFadeIn({
  children,
  className,
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.6,
  y = 30,
  once = true,
}: StaggerFadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  return (
    <div ref={ref} className={cn('', className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration,
                delay: delay + i * staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : (
          <motion.div
            initial={{ opacity: 0, y }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        )}
    </div>
  )
}
