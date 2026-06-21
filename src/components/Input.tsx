import { useState, useId } from "react"
import "../styles/components.css"
import "../styles/components-ext.css"

export type InputSize  = "sm" | "md" | "lg"
export type InputState = "default" | "valid" | "invalid"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  size?: InputSize
  state?: InputState
  helperText?: string
  /** @deprecated use helperText */
  hint?: string
  /** @deprecated use helperText + state */
  feedbackMsg?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  /** Modo bare: renderiza <input> simples sem wrapper — para uso dentro de InputGroup */
  bare?: boolean
}

export function Input({
  label,
  size = "md",
  state = "default",
  helperText,
  hint,
  feedbackMsg,
  leadingIcon,
  trailingIcon,
  bare,
  id: idProp,
  className = "",
  disabled,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  placeholder,
  style,
  ...props
}: InputProps) {
  const autoId = useId()
  const id = idProp ?? autoId

  // ── Modo bare (InputGroup) ────────────────────────────────────────────────
  if (bare) {
    const bareCls = [
      "d9-input",
      size !== "md" ? `d9-input-${size}` : "",
      state === "valid"   ? "d9-input-valid"   : "",
      state === "invalid" ? "d9-input-invalid"  : "",
      className,
    ].filter(Boolean).join(" ")
    return (
      <input
        id={id}
        className={bareCls}
        disabled={disabled}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        placeholder={placeholder}
        style={style}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    )
  }

  // ── Modo outlined (Material Design) ──────────────────────────────────────
  const [focused, setFocused]         = useState(false)
  const [internalVal, setInternalVal] = useState(defaultValue ?? "")

  const currentVal = value !== undefined ? value : internalVal
  // date/time inputs sempre mostram texto nativo — label deve sempre flutuar
  const alwaysFloat = ["date", "time", "datetime-local", "month", "week", "color"].includes(props.type ?? "")
  const isFloating = alwaysFloat || focused || !!currentVal

  const wrapCls = [
    "d9-field-outline",
    isFloating ? "is-floating"  : "",
    focused    ? "is-focused"   : "",
    state === "valid"   ? "is-valid"   : "",
    state === "invalid" ? "is-invalid" : "",
    disabled   ? "is-disabled"  : "",
  ].filter(Boolean).join(" ")

  const inputCls = [
    "d9-input-outline",
    size !== "md" ? `d9-input-outline-${size}` : "",
    leadingIcon  ? "has-leading"  : "",
    trailingIcon ? "has-trailing" : "",
    className,
  ].filter(Boolean).join(" ")

  const helper = helperText ?? feedbackMsg ?? hint ?? placeholder

  const helperCls = [
    "d9-field-helper",
    state === "invalid" ? "d9-field-helper-error"  : "",
    state === "valid"   ? "d9-field-helper-success" : "",
  ].filter(Boolean).join(" ")

  return (
    <div className="d9-field-wrap" style={style}>
      <div className={wrapCls}>
        {/* fieldset+legend cria o gap físico na borda — sem depender de cor de fundo */}
        <fieldset className="d9-outline-fieldset" aria-hidden="true">
          <legend className="d9-outline-legend">
            {label && <span>{label}</span>}
          </legend>
        </fieldset>

        {leadingIcon  && <span className="d9-field-icon-lead">{leadingIcon}</span>}
        {trailingIcon && <span className="d9-field-icon-trail">{trailingIcon}</span>}

        <input
          id={id}
          className={inputCls}
          disabled={disabled}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onFocus={e => { setFocused(true);  onFocus?.(e) }}
          onBlur={e =>  { setFocused(false); onBlur?.(e) }}
          onChange={e => {
            if (value === undefined) setInternalVal(e.target.value)
            onChange?.(e)
          }}
          {...props}
        />

        {label && <label className="d9-float-label" htmlFor={id}>{label}</label>}
      </div>
      {helper && <span className={helperCls}>{helper}</span>}
    </div>
  )
}
