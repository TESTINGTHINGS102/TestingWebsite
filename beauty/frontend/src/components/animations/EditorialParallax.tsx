import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ParallaxLayer {
  src: string
  speed: number
  className?: string
  initialX?: number
  initialY?: number
}

interface EditorialParallaxProps {
  layers: ParallaxLayer[]
  className?: string
  children?: React.ReactNode
}

export function EditorialParallax({ layers, className, children }: EditorialParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {layers.map((layer, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, layer.speed * 200])
        const x = useTransform(
          scrollYProgress,
          [0, 1],
          [layer.initialX || 0, (layer.initialX || 0) + layer.speed * 80],
        )

        return (
          <motion.div
            key={i}
            className={cn('absolute will-change-transform', layer.className)}
            style={{ y, x }}
          >
            <img
              src={layer.src}
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        )
      })}

      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  )
}
