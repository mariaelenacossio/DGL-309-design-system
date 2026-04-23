import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette – preserved from original system
        primary: {
          50:  '#e8edff',
          100: '#c5d0ff',
          200: '#9eb2ff',
          300: '#6e8eff',
          400: '#4470ff',
          500: '#072ac8', // original primary
          600: '#0522a8',
          700: '#041b88',
          800: '#031468',
          900: '#020d4a',
        },
        secondary: {
          50:  '#e8f6ff',
          100: '#c5e8ff',
          200: '#9bd8ff',
          300: '#62c3ff',
          400: '#1eaaff',
          500: '#1e96fc', // original secondary
          600: '#0b7dd6',
          700: '#0064b0',
          800: '#004d8a',
          900: '#003664',
        },
        accent: {
          50:  '#f0f9ff',
          100: '#ddf1ff',
          200: '#a2d6f9', // original accent
          300: '#6ec0f5',
          400: '#38a9f0',
          500: '#1492e6',
          600: '#0a76c0',
          700: '#065c99',
          800: '#044373',
          900: '#022e4d',
        },
        cta: {
          50:  '#fffde8',
          100: '#fffac0',
          200: '#fff690',
          300: '#fff060',
          400: '#fcf300', // original CTA yellow
          500: '#e0d800',
          600: '#b8b200',
          700: '#908b00',
          800: '#686400',
          900: '#403d00',
        },
        neutral: {
          50:  '#fafbfc', // original background
          100: '#f1f3f5',
          200: '#e5e8ec',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#2b2b2b', // original text
          900: '#111827',
        },
        // Semantic surface tokens
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          overlay: 'rgb(var(--surface-overlay) / <alpha-value>)',
          sunken: 'rgb(var(--surface-sunken) / <alpha-value>)',
        },
        on: {
          surface:  'rgb(var(--on-surface) / <alpha-value>)',
          primary:  'rgb(var(--on-primary) / <alpha-value>)',
          secondary:'rgb(var(--on-secondary) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          strong:  'rgb(var(--border-strong) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)',   { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)',     { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-xl': ['1.75rem',  { lineHeight: '1.25', fontWeight: '600' }],
        'heading-lg': ['1.5rem',   { lineHeight: '1.3',  fontWeight: '600' }],
        'heading-md': ['1.25rem',  { lineHeight: '1.35', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.4',  fontWeight: '600' }],
        'heading-xs': ['1rem',     { lineHeight: '1.5',  fontWeight: '600' }],
        'body-lg':    ['1.125rem', { lineHeight: '1.75' }],
        'body-md':    ['1rem',     { lineHeight: '1.75' }],
        'body-sm':    ['0.875rem', { lineHeight: '1.6'  }],
        'body-xs':    ['0.75rem',  { lineHeight: '1.5'  }],
        'label-lg':   ['0.875rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '0.025em' }],
        'label-md':   ['0.75rem',  { lineHeight: '1.25', fontWeight: '600', letterSpacing: '0.05em'  }],
        'label-sm':   ['0.6875rem',{ lineHeight: '1.25', fontWeight: '600', letterSpacing: '0.075em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'elevation-2': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
        'elevation-3': '0 10px 15px -3px rgb(0 0 0 / 0.1),  0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'elevation-4': '0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.12)',
        'focus-ring':  '0 0 0 3px rgb(var(--focus-ring))',
        'focus-ring-inset': 'inset 0 0 0 2px rgb(var(--focus-ring))',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      animation: {
        'fade-in':     'fadeIn 200ms ease-out',
        'slide-up':    'slideUp 250ms ease-out',
        'slide-down':  'slideDown 250ms ease-out',
        'scale-in':    'scaleIn 200ms ease-out',
        'spin-slow':   'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                     to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(8px)' },  to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.95)' },      to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}

export default config
