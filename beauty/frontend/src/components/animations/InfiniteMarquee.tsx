import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/utils/cn'

interface InfiniteMarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  pauseOnHover?: boolean
}

export function InfiniteMarquee({
  children,
  speed = 1,
  direction = 'left',
  className,
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const items = track.children
    if (items.length === 0) return

    const itemWidth = items[0].getBoundingClientRect().width
    const gap = 32
    const totalWidth = (itemWidth + gap) * items.length

    const directionFactor = direction === 'left' ? -1 : 1

    gsap.set(track, { x: 0 })

    const tween = gsap.to(track, {
      x: directionFactor * totalWidth,
      duration: totalWidth / (100 * speed),
      ease: 'none',
      repeat: -1,
    })

    const container = containerRef.current
    if (container && pauseOnHover) {
      const pause = () => tween.pause()
      const resume = () => tween.resume()

      container.addEventListener('mouseenter', pause)
      container.addEventListener('mouseleave', resume)

      return () => {
        tween.kill()
        container.removeEventListener('mouseenter', pause)
        container.removeEventListener('mouseleave', resume)
      }
    }

    return () => {
      tween.kill()
    }
  }, [speed, direction, pauseOnHover])

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden whitespace-nowrap', className)}
    >
      <div ref={trackRef} className="inline-flex gap-8">
        {children}
        {children}
      </div>
    </div>
  )
}
