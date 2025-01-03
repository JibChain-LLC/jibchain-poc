import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '2500px'
      }
    },
    extend: {
      colors: {
        green: {
          '50': '#F3FAF7',
          '100': '#DEF7EC',
          '200': '#BCF0DA',
          '300': '#84E1BC',
          '400': '#31C48D',
          '500': '#0E9F6E',
          '600': '#057A55',
          '700': '#046C4E',
          '800': '#03543F',
          '900': '#014737'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindAnimate]
} satisfies Config;

export default config;
