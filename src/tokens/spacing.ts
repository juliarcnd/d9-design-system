// Bootstrap 5: spacer = 1rem. Escala: × 0.25, 0.5, 1, 1.5, 3 + extensões.

export const spacing = {
  px:    "1px",
  "0":   "0",
  "0.5": "0.125rem",  //  2px
  "1":   "0.25rem",   //  4px
  "2":   "0.5rem",    //  8px
  "3":   "1rem",      // 16px  (= 1 spacer Bootstrap)
  "4":   "1.5rem",    // 24px
  "5":   "3rem",      // 48px
  "6":   "4rem",      // 64px
  "7":   "5rem",      // 80px
  "8":   "6rem",      // 96px
  "10":  "8rem",      // 128px
  "12":  "10rem",     // 160px
} as const

export const borderRadius = {
  none:  "0",
  sm:    "0.25rem",   //  4px
  base:  "0.375rem",  //  6px
  md:    "0.5rem",    //  8px
  lg:    "0.75rem",   // 12px
  xl:    "1rem",      // 16px
  "2xl": "1.5rem",    // 24px
  full:  "9999px",
} as const

export const breakpoint = {
  xs:  "0px",
  sm:  "576px",
  md:  "768px",
  lg:  "992px",
  xl:  "1200px",
  xxl: "1400px",
} as const

export const shadow = {
  none: "none",
  sm:   "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
  base: "0 2px 8px 0 rgba(0, 0, 0, 0.5)",
  md:   "0 4px 16px 0 rgba(0, 0, 0, 0.5)",
  lg:   "0 8px 32px 0 rgba(0, 0, 0, 0.55)",
  xl:   "0 16px 48px 0 rgba(0, 0, 0, 0.6)",
} as const

export const spacing_tokens = { spacing, borderRadius, breakpoint, shadow } as const
export type SpacingTokens = typeof spacing_tokens
