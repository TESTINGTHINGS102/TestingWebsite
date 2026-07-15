import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { cn } from '@/utils/cn'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  onClick,
}: MagneticButtonProps) {
  const { ref } = useMagneticEffect<HTMLDivElement>({ strength })

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block cursor-pointer relative group', className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      data-hoverable
    >
      <div className="absolute inset-0 rounded-full bg-rose-500/0 group-hover:bg-rose-500/10 transition-all duration-500 scale-0 group-hover:scale-100 blur-xl" />
      {children}
    </motion.div>
  )
}
