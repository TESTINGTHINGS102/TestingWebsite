import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useAppContext } from '@/context/AppContext'
import type { NavLink } from '@/types'

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/products' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [cartBounce, setCartBounce] = useState(false)
  const { isMenuOpen, toggleMenu, closeMenu, toggleCart, cartCount } = useAppContext()
  const location = useLocation()
  const prevCartCount = useRef(cartCount)

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartBounce(true)
      setTimeout(() => setCartBounce(false), 300)
    }
    prevCartCount.current = cartCount
  }, [cartCount])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY
      const pastThreshold = currentScrollY > 80

      setScrolled(pastThreshold)
      setVisible(!scrollingDown || !pastThreshold)

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        visible ? 'translate-y-0' : '-translate-y-full',
        scrolled
          ? 'bg-luxury-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-2xl tracking-[0.15em] text-luxury-pearl relative group"
          onClick={closeMenu}
        >
          BEAUTY
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-rose-400 to-rose-600 group-hover:w-full transition-all duration-500" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                'text-sm tracking-widest uppercase transition-colors duration-300 relative py-1',
                isActive(link.href)
                  ? 'text-luxury-pearl'
                  : 'text-luxury-silver/70 hover:text-luxury-pearl',
              )}
              data-hoverable
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-rose-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            className="relative text-luxury-silver hover:text-luxury-pearl transition-colors"
            aria-label="Cart"
            data-hoverable
            onClick={toggleCart}
            animate={cartBounce ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 1L6 16H17L20 5H5.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          <button
            className="md:hidden text-luxury-silver hover:text-luxury-pearl transition-colors"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass-panel-strong mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    'text-lg tracking-widest uppercase py-2 transition-colors',
                    isActive(link.href)
                      ? 'text-luxury-pearl'
                      : 'text-luxury-silver/70 hover:text-luxury-pearl',
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
