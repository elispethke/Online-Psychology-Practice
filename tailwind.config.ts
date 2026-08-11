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
          DEFAULT: '#2A2724',
          soft:    '#5C5650',
          faint:   '#9C948C',
        },
        surface: '#FDFBF9',
        linen: '#F4EEE8',
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
        sm: '2px',
        md: '3px',
        lg: '4px',
        xl: '6px',
      },
      boxShadow: {
        sm:  '0 1px 3px rgba(35,25,22,0.05)',
        md:  '0 6px 24px rgba(35,25,22,0.07)',
        lg:  '0 16px 48px rgba(35,25,22,0.10)',
        rose:'0 4px 16px rgba(159,74,90,0.22)',
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
