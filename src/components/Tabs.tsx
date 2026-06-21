import React, { useState } from "react"
import "../styles/components-ext.css"

export interface TabItem {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  count?: number
  disabled?: boolean
  content?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  onChange?: (v: string) => void
  variant?: "underline" | "pill"
  className?: string
}

export function Tabs({ items, defaultValue, value, onChange, variant = "underline", className = "" }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? "")
  const active = value ?? internal

  const select = (v: string) => {
    setInternal(v)
    onChange?.(v)
  }

  const listClass = [
    "d9-tabs-list",
    variant === "pill" ? "d9-tabs-list-pill" : "",
    className,
  ].filter(Boolean).join(" ")

  const activeItem = items.find(i => i.value === active)

  return (
    <div className="d9-tabs">
      <div className={listClass} role="tablist">
        {items.map(item => (
          <button
            key={item.value}
            role="tab"
            className="d9-tabs-trigger"
            data-state={active === item.value ? "active" : "inactive"}
            disabled={item.disabled}
            onClick={() => !item.disabled && select(item.value)}
            aria-selected={active === item.value}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
            {item.count !== undefined && (
              <span style={{
                background: active === item.value ? "var(--color-brand)" : "var(--color-surface-raised)",
                color: active === item.value ? "var(--color-brand-fg)" : "var(--color-text-secondary)",
                borderRadius: 99, fontSize: 10, fontWeight: 700,
                padding: "1px 6px", fontFamily: "IBM Plex Mono, monospace",
                transition: "background 120ms, color 120ms",
              }}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {activeItem?.content && (
        <div className="d9-tabs-content" role="tabpanel">{activeItem.content}</div>
      )}
    </div>
  )
}
