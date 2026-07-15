import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlowMoReveal } from '@/components/animations/SlowMoReveal'
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee'

const brands = [
  'La Mer', 'La Prairie', 'Sisley', 'Augustinus Bader',
  'Clé de Peau', 'Valmont', '111Skin', 'Tata Harper',
  'La Mer', 'La Prairie', 'Sisley', 'Augustinus Bader',
]

const socialIcons = [
  { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { name: 'Pinterest', path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.042-3.438.218-.932 1.407-5.965 1.407-5.965s-.358-.72-.358-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.334 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z' },
  { name: 'TikTok', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
]

export function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/5 relative overflow-hidden">
      <div className="noise-overlay" />

      <div className="py-16 border-b border-white/5 relative z-10">
        <InfiniteMarquee speed={0.5} direction="left">
          {brands.map((brand, i) => (
            <span
              key={i}
              className="font-serif text-5xl md:text-7xl text-white/5 hover:text-white/20 
                         transition-colors duration-500 select-none"
            >
              {brand}
            </span>
          ))}
        </InfiniteMarquee>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <SlowMoReveal>
            <div>
              <h4 className="font-serif text-lg text-luxury-pearl mb-4">
                <Link to="/" className="hover:text-rose-300 transition-colors">BEAUTY</Link>
              </h4>
              <p className="text-sm text-luxury-silver/40 font-light leading-relaxed max-w-xs">
                Redefining luxury skincare through science and nature.
              </p>
            </div>
          </SlowMoReveal>

          <SlowMoReveal delay={0.1}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-luxury-silver/60 mb-4">Shop</h4>
              <ul className="space-y-2">
                {['Cleansers', 'Serums', 'Moisturizers', 'Masks', 'Sets'].map((item) => (
                  <li key={item}>
                    <Link to="/products" className="text-sm text-luxury-silver/40 hover:text-luxury-pearl transition-colors relative inline-block group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rose-400/60 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SlowMoReveal>

          <SlowMoReveal delay={0.2}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-luxury-silver/60 mb-4">Company</h4>
              <ul className="space-y-2">
                {[
                  { label: 'About', to: '/about' },
                  { label: 'Journal', to: '#' },
                  { label: 'Careers', to: '#' },
                  { label: 'Sustainability', to: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-luxury-silver/40 hover:text-luxury-pearl transition-colors relative inline-block group">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rose-400/60 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SlowMoReveal>

          <SlowMoReveal delay={0.3}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-luxury-silver/60 mb-4">Support</h4>
              <ul className="space-y-2">
                {['Contact', 'Shipping', 'Returns', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-luxury-silver/40 hover:text-luxury-pearl transition-colors relative inline-block group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rose-400/60 group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SlowMoReveal>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-luxury-silver/30">
            &copy; 2026 Beauty. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialIcons.map((social) => (
              <motion.a
                key={social.name}
                href="#"
                className="text-luxury-silver/30 hover:text-rose-300 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
