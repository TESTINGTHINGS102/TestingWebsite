import { useRef, useCallback, type RefObject } from 'react'

interface MagneticOptions {
  strength?: number
  radius?: number
}

export function useMagneticEffect<T extends HTMLElement>({
  strength = 0.3,
  radius = 200,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  const attach = useCallback(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        const power = (1 - distance / radius) * strength
        const moveX = distX * power
        const moveY = distY * power
        el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
      } else {
        el.style.transform = 'translate(0, 0) scale(1)'
      }
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0, 0) scale(1)'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    cleanupRef.current = () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, radius])

  const detach = useCallback(() => {
    cleanupRef.current?.()
  }, [])

  return { ref, attach, detach } as const
}
