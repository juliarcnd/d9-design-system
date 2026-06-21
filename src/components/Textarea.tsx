import { useState, useId } from "react"
import "../styles/components.css"
import "../styles/components-ext.css"

export type TextareaSize  = "sm" | "md" | "lg"
export type TextareaState = "default" | "valid" | "invalid"

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string
  size?: TextareaSize
  state?: TextareaState
  helperText?: string
  /** @deprecated use helperText */
  hint?: string
  /** @deprecated use helperText + state */
  feedbackMsg?: string
  noResize?: boolean
}

export function Textarea({
  label,
  size = "md",
  state = "default",
  helperText,
  hint,
  feedbackMsg,
  noResize,
  id: idProp,
  className = "",
  disabled,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  placeholder,
  ...props
}: TextareaProps) {
  const autoId = useId()
  const id = idProp ?? autoId

  const [focused, setFocused]      = useState(false)
  const [internalVal, setInternal] = useState(defaultValue ?? "")

  const currentVal = value !== undefined ? value : internalVal
  const isFloating = focused || !!currentVal

  const wrapCls = [
    "d9-field-outline",
    "d9-field-outline-textarea",
    isFloating ? "is-floating"  : "",
    focused    ? "is-focused"   : "",
    state === "valid"   ? "is-valid"   : "",
    state === "invalid" ? "is-invalid" : "",
    disabled   ? "is-disabled"  : "",
  ].filter(Boolean).join(" ")

  const helper = helperText ?? feedbackMsg ?? hint ?? placeholder

  const helperCls = [
    "d9-field-helper",
    state === "invalid" ? "d9-field-helper-error"  : "",
    state === "valid"   ? "d9-field-helper-success" : "",
  ].filter(Boolean).join(" ")

  return (
    <div className="d9-field-wrap">
      <div className={wrapCls}>
        <fieldset className="d9-outline-fieldset" aria-hidden="true">
          <legend className="d9-outline-legend">
            {label && <span>{label}</span>}
          </legend>
        </fieldset>

        <textarea
          id={id}
          className={["d9-textarea-outline", className].filter(Boolean).join(" ")}
          disabled={disabled}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          style={{ resize: noResize ? "none" : "vertical" }}
          onFocus={e => { setFocused(true);  onFocus?.(e) }}
          onBlur={e =>  { setFocused(false); onBlur?.(e) }}
          onChange={e => {
            if (value === undefined) setInternal(e.target.value)
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
