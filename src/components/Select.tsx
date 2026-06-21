import React from "react"
import "../styles/components.css"

export type SelectSize  = "sm" | "md" | "lg"
export type SelectState = "default" | "valid" | "invalid"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  size?: SelectSize
  state?: SelectState
  options?: SelectOption[]
  placeholder?: string
  hint?: string
  feedbackMsg?: string
}

export function Select({
  size = "md",
  state = "default",
  options = [],
  placeholder,
  hint,
  feedbackMsg,
  className = "",
  children,
  ...props
}: SelectProps) {
  const classes = [
    "d9-select",
    `d9-select-${size}`,
    state === "valid"   ? "d9-select-valid"   : "",
    state === "invalid" ? "d9-select-invalid"  : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div className="d9-field">
      <select className={classes} {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {children ?? options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
        ))}
      </select>
      {feedbackMsg && state === "valid"   && <span className="d9-form-valid">{feedbackMsg}</span>}
      {feedbackMsg && state === "invalid" && <span className="d9-form-invalid">{feedbackMsg}</span>}
      {hint && !feedbackMsg && <span className="d9-form-hint">{hint}</span>}
    </div>
  )
}
