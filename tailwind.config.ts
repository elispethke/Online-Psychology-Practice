import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          deep:   '#9F4A5A',
          mid:    '#C07A86',
          light:  '#E8C4CB',
          wash:   '#FAF2F3',
        },
        ink: {
          DEFAULT: '#2E2E2E',
          soft:    '#5A5A5A',
          faint:   '#9A9A9A',
        },
        surface: '#FDFBFB',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'xs':  ['0.72rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        sm:  '0 2px 12px rgba(159,74,90,0.08)',
        md:  '0 8px 32px rgba(159,74,90,0.12)',
        lg:  '0 20px 60px rgba(159,74,90,0.16)',
        rose:'0 4px 20px rgba(159,74,90,0.30)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease both',
        'scale-in':   'scaleIn 0.7s ease both',
        'slide-right':'slideRight 0.6s ease both',
      },
    },
  },
  plugins: [],
}

export default config
