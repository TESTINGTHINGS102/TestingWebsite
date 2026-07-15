import { useEffect, useRef } from 'react'

interface CursorState {
  x: number
  y: number
  scale: number
  opacity: number
}

export function useFluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<CursorState>({ x: 0, y: 0, scale: 1, opacity: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      stateRef.current.opacity = 1
      cursor.style.opacity = '1'
    }

    const onMouseDown = () => {
      stateRef.current.scale = 0.8
    }

    const onMouseUp = () => {
      stateRef.current.scale = 1
    }

    const onMouseLeave = () => {
      stateRef.current.opacity = 0
      cursor.style.opacity = '0'
    }

    const onMouseEnterLink = () => {
      stateRef.current.scale = 2
    }

    const onMouseLeaveLink = () => {
      stateRef.current.scale = 1
    }

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      const s = stateRef.current
      s.x = lerp(s.x, mouseX, 0.15)
      s.y = lerp(s.y, mouseY, 0.15)

      cursor.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%) scale(${s.scale})`

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)

    document.querySelectorAll('a, button, [data-hoverable]').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return cursorRef
}
