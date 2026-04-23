export const typography = {
  fontFamily: {
    sans: '"Open Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold:800,
  },
  scale: {
    'display-lg': { size: 'clamp(2.5rem, 5vw, 4rem)',    lineHeight: 1.1,  letterSpacing: '-0.02em', weight: 700 },
    'display-md': { size: 'clamp(2rem, 4vw, 3rem)',      lineHeight: 1.15, letterSpacing: '-0.02em', weight: 700 },
    'display-sm': { size: 'clamp(1.75rem, 3vw, 2.25rem)',lineHeight: 1.2,  letterSpacing: '-0.01em', weight: 600 },
    'heading-xl': { size: '1.75rem',  lineHeight: 1.25, weight: 600 },
    'heading-lg': { size: '1.5rem',   lineHeight: 1.3,  weight: 600 },
    'heading-md': { size: '1.25rem',  lineHeight: 1.35, weight: 600 },
    'heading-sm': { size: '1.125rem', lineHeight: 1.4,  weight: 600 },
    'heading-xs': { size: '1rem',     lineHeight: 1.5,  weight: 600 },
    'body-lg':    { size: '1.125rem', lineHeight: 1.75, weight: 400 },
    'body-md':    { size: '1rem',     lineHeight: 1.75, weight: 400 },
    'body-sm':    { size: '0.875rem', lineHeight: 1.6,  weight: 400 },
    'body-xs':    { size: '0.75rem',  lineHeight: 1.5,  weight: 400 },
    'label-lg':   { size: '0.875rem', lineHeight: 1.25, letterSpacing: '0.025em',  weight: 600 },
    'label-md':   { size: '0.75rem',  lineHeight: 1.25, letterSpacing: '0.05em',   weight: 600 },
    'label-sm':   { size: '0.6875rem',lineHeight: 1.25, letterSpacing: '0.075em',  weight: 600 },
  },
} as const

export type TypographyToken = typeof typography
