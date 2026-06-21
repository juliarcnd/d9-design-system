import React from "react"
import "../styles/components.css"

export type LabelSize = "sm" | "md" | "lg"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize
  required?: boolean
  optional?: boolean
}

export function Label({
  size = "md",
  required = false,
  optional = false,
  children,
  className = "",
  ...props
}: LabelProps) {
  const classes = [
    "d9-label",
    size !== "md" ? `d9-label-${size}` : "",
    required ? "d9-label-required" : "",
    optional ? "d9-label-optional" : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <label className={classes} {...props}>
      {children}
      {optional && <span className="d9-label-opt-tag">opcional</span>}
    </label>
  )
}
