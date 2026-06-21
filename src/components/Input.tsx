import React from "react"
import "../styles/components.css"

export type InputSize    = "sm" | "md" | "lg"
export type InputState   = "default" | "valid" | "invalid"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize
  state?: InputState
  hint?: string
  feedbackMsg?: string
}

export function Input({
  size = "md",
  state = "default",
  hint,
  feedbackMsg,
  className = "",
  id,
  ...props
}: InputProps) {
  const classes = [
    "d9-input",
    `d9-input-${size}`,
    state === "valid"   ? "d9-input-valid"   : "",
    state === "invalid" ? "d9-input-invalid"  : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div className="d9-field">
      <input id={id} className={classes} {...props} />
      {feedbackMsg && state === "valid"   && <span className="d9-form-valid">{feedbackMsg}</span>}
      {feedbackMsg && state === "invalid" && <span className="d9-form-invalid">{feedbackMsg}</span>}
      {hint && !feedbackMsg && <span className="d9-form-hint">{hint}</span>}
    </div>
  )
}
