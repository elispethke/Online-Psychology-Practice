import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:  'var(--forest)',
        sage:    'var(--sage)',
        teal:    'var(--teal)',
        gold:    'var(--gold)',
        sand:    'var(--sand)',
        surface: 'var(--surface)',
        paper:   'var(--paper)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft:    'var(--ink-soft)',
          faint:   'var(--ink-faint)',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'xs':  ['0.72rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        sm: '2px',
        md: '3px',
        lg: '4px',
        xl: '6px',
      },
      boxShadow: {
        sm:  '0 1px 3px color-mix(in srgb, var(--forest) 8%, transparent)',
        md:  '0 6px 24px color-mix(in srgb, var(--forest) 10%, transparent)',
        lg:  '0 16px 48px color-mix(in srgb, var(--forest) 14%, transparent)',
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
