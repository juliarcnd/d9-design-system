import React, { useEffect } from "react"
import "../styles/components-ext.css"

export type ModalSize = "sm" | "md" | "lg" | "xl"

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: ModalSize
  title?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  closeOnBackdrop?: boolean
}

export function Modal({
  open,
  onClose,
  size = "md",
  title,
  children,
  footer,
  closeOnBackdrop = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="d9-modal-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={["d9-modal", `d9-modal-${size}`].join(" ")}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <>
            <div className="d9-modal-header">
              <h2 className="d9-modal-title">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Fechar"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--color-text-secondary)", fontSize: 18, lineHeight: 1,
                  padding: "2px 4px", borderRadius: 4,
                }}
              >
                ✕
              </button>
            </div>
            <hr className="d9-modal-divider" style={{ margin: "0.875rem 0 0" }} />
          </>
        )}
        <div className="d9-modal-body">{children}</div>
        {footer && (
          <>
            <hr className="d9-modal-divider" />
            <div className="d9-modal-footer">{footer}</div>
          </>
        )}
      </div>
    </div>
  )
}
