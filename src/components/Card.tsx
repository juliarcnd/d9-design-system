import React from "react"
import "../styles/components-ext.css"

export interface CardProps {
  children: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  footer?: React.ReactNode
  hover?: boolean
  flat?: boolean
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function Card({ children, title, subtitle, footer, hover, flat, className = "", style, onClick }: CardProps) {
  const cls = [
    "d9-card",
    hover ? "d9-card-hover" : "",
    flat  ? "d9-card-flat"  : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div className={cls} style={style} onClick={onClick}>
      {(title || subtitle) && (
        <>
          <div className="d9-card-header">
            {title    && <h3 className="d9-card-title">{title}</h3>}
            {subtitle && <p  className="d9-card-subtitle">{subtitle}</p>}
          </div>
          <hr className="d9-card-divider" style={{ margin: "0.875rem 0 0" }} />
        </>
      )}
      <div className="d9-card-body">{children}</div>
      {footer && (
        <>
          <hr className="d9-card-divider" />
          <div className="d9-card-footer">{footer}</div>
        </>
      )}
    </div>
  )
}
