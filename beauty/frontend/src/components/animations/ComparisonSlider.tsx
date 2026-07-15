import { useRef, useState, useCallback, useEffect } from 'react'
import { cn } from '@/utils/cn'

interface ComparisonSliderProps {
  before: { src: string; label?: string }
  after: { src: string; label?: string }
  className?: string
  defaultPosition?: number
}

export function ComparisonSlider({
  before,
  after,
  className,
  defaultPosition = 50,
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setPosition(percentage)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updatePosition(e.clientX)
  }, [updatePosition])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX)
    const handleMouseUp = () => setIsDragging(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, updatePosition])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden select-none rounded-2xl',
        'bg-luxury-charcoal',
        className,
      )}
      onMouseDown={handleMouseDown}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <img
        src={after.src}
        alt={after.label || 'After'}
        className="w-full h-full object-cover block"
        draggable={false}
      />

      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before.src}
          alt={before.label || 'Before'}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ width: `${100 / (position / 100)}%` }}
          draggable={false}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-10 h-10 rounded-full bg-white/90 shadow-xl',
            'flex items-center justify-center',
            'transition-transform duration-200',
            isDragging ? 'scale-110' : 'scale-100',
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L2 8L6 13" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 3L14 8L10 13" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {before.label && (
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full">
          {before.label}
        </span>
      )}
      {after.label && (
        <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full">
          {after.label}
        </span>
      )}
    </div>
  )
}
