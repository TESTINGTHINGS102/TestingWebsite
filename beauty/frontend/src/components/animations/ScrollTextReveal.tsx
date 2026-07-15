import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

interface ScrollTextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  stagger?: number
  duration?: number
  y?: number
  delay?: number
  splitBy?: 'chars' | 'words' | 'lines'
}

export function ScrollTextReveal({
  text,
  as: Tag = 'h2',
  className,
  stagger = 0.04,
  duration = 0.7,
  y = 60,
  delay = 0,
  splitBy = 'words',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const elements = el.querySelectorAll('.reveal-word, .reveal-char')

    const tl = gsap.fromTo(
      elements,
      { y, opacity: 0, rotateX: -10 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.refresh())
    }
  }, [text, stagger, duration, y, delay, splitBy])

  const renderContent = () => {
    if (splitBy === 'chars') {
      return text.split('').map((char, i) => (
        <span
          key={i}
          className="reveal-char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    }

    return text.split(' ').map((word, i) => (
      <span key={i} className="reveal-word inline-block mr-[0.3em]">
        {word}
      </span>
    ))
  }

  return (
    <Tag ref={containerRef as never} className={cn('overflow-hidden', className)}>
      {renderContent()}
    </Tag>
  )
}
