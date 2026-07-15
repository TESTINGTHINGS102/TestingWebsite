import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type GSAPTweenLike = {
  kill(): void
}

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  trigger?: HTMLElement | string
  start?: string
  end?: string
  toggleActions?: string
  stagger?: number
  y?: number
  duration?: number
  ease?: string
  scrub?: boolean | number
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const instanceRef = useRef<GSAPTweenLike | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      start = 'top 85%',
      toggleActions = 'play none none reverse',
      stagger = 0.08,
      y = 60,
      duration = 0.9,
      ease = 'power3.out',
      scrub = false,
    } = options

    const children = el.children

    if (scrub) {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start,
            end: 'top 30%',
            scrub: typeof scrub === 'number' ? scrub : 1,
          },
        },
      )
    } else if (children.length > 0) {
      instanceRef.current = gsap.fromTo(
        children,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions,
          },
        },
      )
    } else {
      instanceRef.current = gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions,
          },
        },
      )
    }

    return () => {
      instanceRef.current?.kill()
      ScrollTrigger.getAll().forEach((t) => t.refresh())
    }
  }, [])

  return ref
}
