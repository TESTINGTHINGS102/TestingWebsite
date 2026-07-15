import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
  once?: boolean
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  suffix = '',
  prefix = '',
  className,
  once = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })
  const [displayValue, setDisplayValue] = useState(from)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const range = to - from

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + range * eased

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  )
}
