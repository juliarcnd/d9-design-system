import React, { useRef, useEffect } from "react"
import "../styles/components.css"

export type CheckboxSize = "sm" | "md" | "lg"

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: CheckboxSize
  label?: React.ReactNode
  hint?: string
  id?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  size = "md",
  label,
  hint,
  id,
  className = "",
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  const wrapClass = [
    "d9-check",
    size !== "md" ? `d9-check-${size}` : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
      <label className={wrapClass} htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          {...props}
        />
        <span className="d9-check-box" aria-hidden="true" />
        {label && <span>{label}</span>}
      </label>
      {hint && <span className="d9-form-hint" style={{ marginLeft: "1.625rem" }}>{hint}</span>}
    </div>
  )
}
