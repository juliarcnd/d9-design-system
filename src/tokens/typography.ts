// Segue convenções Bootstrap 5, com escala estendida

export const fontFamily = {
  sans:  "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  mono:  "'IBM Plex Mono', 'Courier New', monospace",
} as const

export const fontSize = {
  xs:   "0.75rem",    // 12px
  sm:   "0.875rem",   // 14px
  base: "1rem",       // 16px
  lg:   "1.125rem",   // 18px
  xl:   "1.25rem",    // 20px
  "2xl": "1.5rem",    // 24px
  "3xl": "1.875rem",  // 30px
  "4xl": "2.25rem",   // 36px
  "5xl": "3rem",      // 48px
  "6xl": "3.75rem",   // 60px
  // Bootstrap heading scale
  h1: "2.5rem",       // 40px
  h2: "2rem",         // 32px
  h3: "1.75rem",      // 28px
  h4: "1.5rem",       // 24px
  h5: "1.25rem",      // 20px
  h6: "1rem",         // 16px
} as const

export const fontWeight = {
  light:     300,
  normal:    400,
  medium:    500,
  semibold:  600,
  bold:      700,
  extrabold: 800,
} as const

export const lineHeight = {
  none:    "100%",
  tight:   "125%",
  snug:    "138%",
  normal:  "150%",
  relaxed: "163%",
  loose:   "200%",
} as const

export const letterSpacing = {
  tighter: "-0.05em",
  tight:   "-0.025em",
  normal:  "0em",
  wide:    "0.025em",
  wider:   "0.05em",
  widest:  "0.1em",
} as const

export const typography = { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } as const
export type Typography = typeof typography
