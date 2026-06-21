import React from "react"
import "../styles/components.css"

export type AlertVariant = "brand" | "success" | "warning" | "danger" | "info" | "neutral"

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  children: React.ReactNode
  className?: string
}

const DEFAULT_ICONS: Record<AlertVariant, string> = {
  brand:   "◆",
  success: "✓",
  warning: "⚠",
  danger:  "✕",
  info:    "ℹ",
  neutral: "•",
}

export function Alert({
  variant = "info",
  title,
  icon,
  dismissible = false,
  onDismiss,
  children,
  className = "",
}: AlertProps) {
  const classes = ["d9-alert", `d9-alert-${variant}`, className].filter(Boolean).join(" ")
  const iconNode = icon ?? <span aria-hidden="true">{DEFAULT_ICONS[variant]}</span>

  return (
    <div className={classes} role="alert">
      <span className="d9-alert-icon">{iconNode}</span>
      <div className="d9-alert-body">
        {title && <p className="d9-alert-title">{title}</p>}
        <p className="d9-alert-message">{children}</p>
      </div>
      {dismissible && (
        <button className="d9-alert-close" onClick={onDismiss} aria-label="Fechar">
          ✕
        </button>
      )}
    </div>
  )
}
