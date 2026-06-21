import { useState, useId } from "react"
import "../styles/components.css"
import "../styles/components-ext.css"

export type SelectSize  = "sm" | "md" | "lg"
export type SelectState = "default" | "valid" | "invalid"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string
  size?: SelectSize
  state?: SelectState
  options?: SelectOption[]
  placeholder?: string
  helperText?: string
  /** @deprecated use helperText */
  hint?: string
  /** @deprecated use helperText + state */
  feedbackMsg?: string
}

export function Select({
  label,
  size = "md",
  state = "default",
  options = [],
  placeholder,
  helperText,
  hint,
  feedbackMsg,
  className = "",
  id: idProp,
  disabled,
  onChange,
  value,
  defaultValue,
  children,
  style,
  ...props
}: SelectProps) {
  const autoId = useId()
  const id = idProp ?? autoId

  const [internalVal, setInternalVal] = useState<string>(
    (defaultValue as string) ?? ""
  )

  const currentVal = value !== undefined ? (value as string) : internalVal
  const isFloating = !!currentVal && currentVal !== ""

  const wrapCls = [
    "d9-field-outline",
    isFloating ? "is-floating"  : "",
    state === "valid"   ? "is-valid"   : "",
    state === "invalid" ? "is-invalid" : "",
    disabled   ? "is-disabled"  : "",
  ].filter(Boolean).join(" ")

  const selectCls = [
    "d9-select-outline",
    size !== "md" ? `d9-select-outline-${size}` : "",
    className,
  ].filter(Boolean).join(" ")

  const helper = helperText ?? feedbackMsg ?? hint

  const helperCls = [
    "d9-field-helper",
    state === "invalid" ? "d9-field-helper-error"  : "",
    state === "valid"   ? "d9-field-helper-success" : "",
  ].filter(Boolean).join(" ")

  return (
    <div className="d9-field-wrap" style={style}>
      <div className={wrapCls}>
        <fieldset className="d9-outline-fieldset" aria-hidden="true">
          <legend className="d9-outline-legend">
            {label && <span>{label}</span>}
          </legend>
        </fieldset>

        <select
          id={id}
          className={selectCls}
          disabled={disabled}
          value={value}
          defaultValue={value === undefined ? (defaultValue ?? "") : undefined}
          onChange={e => {
            if (value === undefined) setInternalVal(e.target.value)
            onChange?.(e)
          }}
          {...props}
        >
          {/* opção vazia — permite label resting quando nada selecionado */}
          <option value="" disabled hidden>{placeholder ?? ""}</option>
          {children ?? options.map(o => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>

        {label && <label className="d9-float-label" htmlFor={id}>{label}</label>}

        {/* seta do select */}
        <span className="d9-select-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </div>
      {helper && <span className={helperCls}>{helper}</span>}
    </div>
  )
}
