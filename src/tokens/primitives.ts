// ─── Primitive tokens — escala raw de cores ──────────────────────────────────
// Não usar diretamente na UI. Use os semantic tokens de base.css.

export const neutral = {
  0:   "#FFFFFF",
  50:  "#F8F9FC",
  100: "#F0F2F7",
  200: "#E2E5EE",
  300: "#CBD0DF",
  400: "#9BA5BB",
  500: "#6B7494",
  600: "#4F5670",
  700: "#363C54",
  800: "#232839",
  850: "#1A1F2E",
  900: "#161A27",
  950: "#10131A",
} as const

export const tech = {
  50:  "#E6F3FB",
  100: "#CCE7F7",
  200: "#99CEEF",
  300: "#4FB0E3",
  400: "#0096DF",
  500: "#0082CF",
  600: "#006BAA",
  700: "#005285",
  800: "#003A60",
  900: "#00223A",
} as const

export const pro = {
  50:  "#F0EFFD",
  100: "#E1DFFB",
  200: "#C3BFF7",
  300: "#A49FF3",
  400: "#887FEF",
  500: "#766DE9",
  600: "#5E57C4",
  700: "#47419E",
  800: "#302C79",
  900: "#191653",
} as const

export const pag = {
  50:  "#E8F5E0",
  100: "#D1EBC1",
  200: "#A3D782",
  300: "#75C344",
  400: "#4DAF15",
  500: "#2F9000",
  600: "#267300",
  700: "#1C5600",
  800: "#133900",
  900: "#091D00",
} as const

export const green = {
  50:  "#F0FDF4",
  100: "#DCFCE7",
  400: "#4ADE80",
  500: "#22C55E",
  600: "#16A34A",
  700: "#15803D",
  900: "#14532D",
} as const

export const amber = {
  50:  "#FFFBEB",
  100: "#FEF3C7",
  300: "#FCD34D",
  400: "#FBBF24",
  600: "#D97706",
  700: "#B45309",
  900: "#78350F",
} as const

export const red = {
  50:  "#FFF1F2",
  100: "#FFE4E6",
  400: "#F87171",
  500: "#EF4444",
  600: "#DC2626",
  700: "#B91C1C",
  900: "#7F1D1D",
} as const

export const blue = {
  50:  "#EFF6FF",
  100: "#DBEAFE",
  400: "#60A5FA",
  500: "#3B82F6",
  600: "#2563EB",
  700: "#1D4ED8",
  900: "#1E3A8A",
} as const

export const primitives = { neutral, tech, pro, pag, green, amber, red, blue } as const
export type Primitives = typeof primitives
