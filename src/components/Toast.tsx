import React, { createContext, useCallback, useContext, useRef, useState } from "react"
import "../styles/components-ext.css"

export type ToastVariant = "success" | "danger" | "warning" | "info"

export interface ToastItem {
  id: string
  variant?: ToastVariant
  title?: string
  message: string
  duration?: number
}

interface ToastCtx {
  add: (t: Omit<ToastItem, "id">) => void
  remove: (id: string) => void
}

const ToastContext = createContext<ToastCtx | null>(null)

const ICONS: Record<ToastVariant, string> = {
  success: "✓", danger: "✕", warning: "⚠", info: "i",
}
const ICON_COLORS: Record<ToastVariant, string> = {
  success: "var(--color-success)",
  danger:  "var(--color-error)",
  warning: "var(--color-warning)",
  info:    "var(--color-info)",
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const remove = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id))
    clearTimeout(timers.current[id])
  }, [])

  const add = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...t, id }])
    timers.current[id] = setTimeout(() => remove(id), t.duration ?? 4000)
  }, [remove])

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <div className="d9-toast-region">
        {toasts.map(t => (
          <div key={t.id} className={["d9-toast", t.variant ? `d9-toast-${t.variant}` : ""].filter(Boolean).join(" ")}>
            {t.variant && (
              <span
                className="d9-toast-icon"
                style={{
                  color: ICON_COLORS[t.variant],
                  fontWeight: 700, fontSize: 13,
                  width: 18, textAlign: "center",
                }}
              >
                {ICONS[t.variant]}
              </span>
            )}
            <div className="d9-toast-body">
              {t.title && <div className="d9-toast-title">{t.title}</div>}
              <div className="d9-toast-msg">{t.message}</div>
            </div>
            <button
              onClick={() => remove(t.id)}
              aria-label="Fechar"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--color-text-disabled)", fontSize: 14,
                padding: "0 2px", flexShrink: 0, lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be inside ToastProvider")
  return ctx
}

export function ToastDemo() {
  const { add } = useToast()
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["success", "danger", "warning", "info"] as ToastVariant[]).map(v => (
        <button
          key={v}
          className="d9-btn d9-btn-outline-secondary d9-btn-sm"
          onClick={() => add({ variant: v, title: v.charAt(0).toUpperCase() + v.slice(1), message: `Mensagem de exemplo — ${v}` })}
        >
          {v}
        </button>
      ))}
    </div>
  )
}
