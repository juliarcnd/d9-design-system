import React from "react"
import "../styles/components.css"

export type ButtonVariant =
  | "brand" | "secondary" | "ghost" | "link"
  | "success" | "warning" | "danger" | "info"
  | "outline-brand" | "outline-secondary"
  | "outline-success" | "outline-warning" | "outline-danger" | "outline-info"

export type ButtonSize = "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  loading?: boolean
  as?: "button" | "a"
  href?: string
}

export function Button({
  variant = "brand",
  size = "md",
  iconOnly = false,
  loading = false,
  disabled,
  children,
  className = "",
  as: Tag = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "d9-btn",
    `d9-btn-${variant}`,
    iconOnly ? `d9-btn-icon-${size}` : `d9-btn-${size}`,
    className,
  ].filter(Boolean).join(" ")

  return (
    <Tag
      className={classes}
      disabled={loading || disabled}
      aria-disabled={loading || disabled}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && (
        <span
          className="d9-spinner d9-spinner-sm"
          style={{ color: "currentColor" }}
          role="status"
          aria-label="Carregando"
        />
      )}
      {children}
    </Tag>
  )
}
