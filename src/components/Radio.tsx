import React from "react"
import "../styles/components.css"

export type RadioSize = "sm" | "md" | "lg"

export interface RadioProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  size?: RadioSize
  label?: React.ReactNode
  hint?: string
  id?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export interface RadioGroupProps {
  name: string
  value?: string
  onChange?: (value: string) => void
  options: { value: string; label: React.ReactNode; hint?: string; disabled?: boolean }[]
  size?: RadioSize
  orientation?: "vertical" | "horizontal"
  className?: string
}

export function Radio({
  checked,
  defaultChecked,
  disabled = false,
  size = "md",
  label,
  hint,
  id,
  className = "",
  ...props
}: RadioProps) {
  const wrapClass = [
    "d9-check",
    size !== "md" ? `d9-check-${size}` : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
      <label className={wrapClass} htmlFor={id}>
        <input
          type="radio"
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          {...props}
        />
        <span className="d9-check-dot" aria-hidden="true" />
        {label && <span>{label}</span>}
      </label>
      {hint && <span className="d9-form-hint" style={{ marginLeft: "1.625rem" }}>{hint}</span>}
    </div>
  )
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  size = "md",
  orientation = "vertical",
  className = "",
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={className}
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        gap: orientation === "horizontal" ? "1.5rem" : "0.625rem",
        flexWrap: "wrap",
      }}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          hint={opt.hint}
          disabled={opt.disabled}
          size={size}
          checked={value !== undefined ? value === opt.value : undefined}
          onChange={() => onChange?.(opt.value)}
          id={`${name}-${opt.value}`}
        />
      ))}
    </div>
  )
}
