/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF5',
          100: '#FFF8E7',
          200: '#FFF0CF',
          300: '#FFE3A8',
          400: '#FFD37A',
          500: '#FFC04D',
          600: '#E6A835',
          700: '#BF8A2A',
          800: '#996E22',
          900: '#73521A',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        champagne: {
          50: '#FEFCF8',
          100: '#FDF6E8',
          200: '#FBEBCB',
          300: '#F8DBA3',
          400: '#F3C875',
          500: '#EDB24E',
          600: '#D99733',
          700: '#B5792A',
          800: '#916128',
          900: '#764F24',
        },
        luxury: {
          black: '#0A0A0A',
          charcoal: '#1A1A1A',
          graphite: '#2D2D2D',
          silver: '#E5E5E5',
          pearl: '#F5F0EB',
          gold: '#C9A96E',
          rosegold: '#B76E79',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'slow-spin': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'breathing': 'breathing 4s ease-in-out infinite',
        'slide-up-fade': 'slide-up-fade 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'orbit': 'orbit 12s linear infinite',
        'ripple': 'ripple 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(8px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(8px) rotate(-360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.6 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
