import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  hoverScale?: number
  onClick?: () => void
}

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(244, 63, 94, 0.15)',
  hoverScale = 1.02,
  onClick,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {children}

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${glowColor}, transparent 60%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isHovered ? 0.6 : 0,
          boxShadow: `inset 0 0 60px ${glowColor}`,
        }}
      />
    </motion.div>
  )
}
