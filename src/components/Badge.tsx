import React from "react"
import "../styles/components.css"

export type BadgeVariant =
  | "brand" | "success" | "warning" | "danger" | "info" | "secondary"
  | "subtle-brand" | "subtle-success" | "subtle-warning" | "subtle-danger" | "subtle-info" | "subtle-secondary"

export type BadgeSize = "sm" | "md"

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  pill?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Badge({
  variant = "brand",
  size = "md",
  pill = false,
  icon,
  children,
  className = "",
}: BadgeProps) {
  const classes = [
    "d9-badge",
    `d9-badge-${variant}`,
    `d9-badge-${size}`,
    pill ? "d9-badge-pill" : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <span className={classes}>
      {icon && <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>}
      {children}
    </span>
  )
}
