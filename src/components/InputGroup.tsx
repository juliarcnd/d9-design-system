import React from "react"
import "../styles/components.css"

export type InputGroupSize = "sm" | "md" | "lg"

export interface InputGroupTextProps {
  children: React.ReactNode
  size?: InputGroupSize
  className?: string
}

export function InputGroupText({ children, size = "md", className = "" }: InputGroupTextProps) {
  const classes = [
    "d9-input-group-text",
    size !== "md" ? `d9-input-group-text-${size}` : "",
    className,
  ].filter(Boolean).join(" ")
  return <span className={classes}>{children}</span>
}

export interface InputGroupProps {
  children: React.ReactNode
  hint?: string
  feedbackMsg?: string
  feedbackType?: "valid" | "invalid"
  className?: string
}

export function InputGroup({
  children,
  hint,
  feedbackMsg,
  feedbackType,
  className = "",
}: InputGroupProps) {
  return (
    <div className="d9-field">
      <div className={["d9-input-group", className].filter(Boolean).join(" ")}>
        {children}
      </div>
      {feedbackMsg && feedbackType === "valid"   && <span className="d9-form-valid">{feedbackMsg}</span>}
      {feedbackMsg && feedbackType === "invalid" && <span className="d9-form-invalid">{feedbackMsg}</span>}
      {hint && !feedbackMsg && <span className="d9-form-hint">{hint}</span>}
    </div>
  )
}
