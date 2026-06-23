import React from "react"
import "../styles/components.css"

export type InputSize  = "sm" | "md" | "lg"
export type InputState = "default" | "valid" | "invalid"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?        : InputSize
  state?       : InputState
  label?       : string
  hint?        : string
  helperText?  : string
  feedbackMsg? : string
  leadingIcon? : React.ReactNode
  trailingIcon?: React.ReactNode
}

export function Input({
  size         = "md",
  state        = "default",
  label,
  hint,
  helperText,
  feedbackMsg,
  leadingIcon,
  trailingIcon,
  className    = "",
  id,
  ...props
}: InputProps) {
  const inputClasses = [
    "d9-input",
    `d9-input-${size}`,
    state === "valid"   ? "d9-input-valid"   : "",
    state === "invalid" ? "d9-input-invalid"  : "",
    leadingIcon         ? "d9-input-has-leading"  : "",
    trailingIcon        ? "d9-input-has-trailing" : "",
    className,
  ].filter(Boolean).join(" ")

  const helper = feedbackMsg || helperText || hint

  return (
    <div className="d9-field">
      {label && (
        <label className="d9-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="d9-input-wrapper">
        {leadingIcon  && <span className="d9-input-icon d9-input-icon-leading">{leadingIcon}</span>}
        <input id={id} className={inputClasses} {...props} />
        {trailingIcon && <span className="d9-input-icon d9-input-icon-trailing">{trailingIcon}</span>}
      </div>
      {helper && (
        <span className={
          state === "valid"   ? "d9-form-valid"   :
          state === "invalid" ? "d9-form-invalid"  :
          "d9-form-hint"
        }>
          {helper}
        </span>
      )}
    </div>
  )
}
