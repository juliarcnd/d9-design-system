import React from "react"
import "../styles/components.css"

export type TextareaSize  = "sm" | "md" | "lg"
export type TextareaState = "default" | "valid" | "invalid"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize
  state?: TextareaState
  hint?: string
  feedbackMsg?: string
  noResize?: boolean
}

export function Textarea({
  size = "md",
  state = "default",
  hint,
  feedbackMsg,
  noResize = false,
  className = "",
  ...props
}: TextareaProps) {
  const classes = [
    "d9-textarea",
    `d9-textarea-${size}`,
    state === "valid"   ? "d9-textarea-valid"   : "",
    state === "invalid" ? "d9-textarea-invalid"  : "",
    noResize ? "d9-textarea-no-resize" : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div className="d9-field">
      <textarea className={classes} {...props} />
      {feedbackMsg && state === "valid"   && <span className="d9-form-valid">{feedbackMsg}</span>}
      {feedbackMsg && state === "invalid" && <span className="d9-form-invalid">{feedbackMsg}</span>}
      {hint && !feedbackMsg && <span className="d9-form-hint">{hint}</span>}
    </div>
  )
}
