import React from "react"
import "../styles/components.css"

export type SpinnerColor = "brand" | "success" | "warning" | "danger" | "info" | "muted" | "inverse"
export type SpinnerSize  = "sm" | "md" | "lg" | "xl"
export type SpinnerType  = "border" | "grow"

export interface SpinnerProps {
  color?: SpinnerColor
  size?: SpinnerSize
  type?: SpinnerType
  label?: string
  className?: string
}

const GROW_SIZES: Record<SpinnerSize, React.CSSProperties> = {
  sm: { width: "0.75rem",  height: "0.75rem" },
  md: { width: "1.25rem",  height: "1.25rem" },
  lg: { width: "2rem",     height: "2rem" },
  xl: { width: "3rem",     height: "3rem" },
}

export function Spinner({
  color = "brand",
  size = "md",
  type = "border",
  label = "Carregando...",
  className = "",
}: SpinnerProps) {
  if (type === "grow") {
    return (
      <span
        className={["d9-spinner-grow", `d9-spinner-${color}`, className].filter(Boolean).join(" ")}
        style={GROW_SIZES[size]}
        role="status"
        aria-label={label}
      />
    )
  }

  return (
    <span
      className={["d9-spinner", `d9-spinner-${size}`, `d9-spinner-${color}`, className].filter(Boolean).join(" ")}
      role="status"
      aria-label={label}
    />
  )
}
