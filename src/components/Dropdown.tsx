import React, { useEffect, useRef, useState } from "react"
import "../styles/components-ext.css"

export interface DropdownItem {
  type?: "item" | "divider" | "label"
  label?: React.ReactNode
  icon?: React.ReactNode
  danger?: boolean
  disabled?: boolean
  onClick?: () => void
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: "left" | "right"
  className?: string
}

export function Dropdown({ trigger, items, align = "left", className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={ref} className={["d9-dropdown", className].filter(Boolean).join(" ")}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "inline-flex" }}>
        {trigger}
      </div>
      {open && (
        <div className={["d9-dropdown-menu", align === "right" ? "d9-dropdown-menu-right" : ""].filter(Boolean).join(" ")}>
          {items.map((item, i) => {
            if (item.type === "divider") return <div key={i} className="d9-dropdown-divider" />
            if (item.type === "label")   return <div key={i} className="d9-dropdown-label">{item.label}</div>
            return (
              <button
                key={i}
                className={["d9-dropdown-item", item.danger ? "d9-dropdown-item-danger" : ""].filter(Boolean).join(" ")}
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setOpen(false) }}
              >
                {item.icon && <span style={{ opacity: 0.7 }}>{item.icon}</span>}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
