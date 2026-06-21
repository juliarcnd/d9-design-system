import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { spacing, borderRadius, breakpoint, shadow } from "../../src/tokens"

// ─── Spacing ──────────────────────────────────────────────────────────────────

function SpacingScale() {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Espaçamento</h2>
      <p style={{ margin: "0 0 20px", fontSize: 12, color: "var(--color-text-secondary)" }}>
        Bootstrap 5: spacer base = 1rem (16px). Escala × 0.25, 0.5, 1, 1.5, 3 + extensões.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {Object.entries(spacing).map(([key, value]) => {
          const px = value === "0" ? "0px" : value === "1px" ? "1px"
            : `${Math.round(parseFloat(value) * 16)}px`
          return (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 32, flexShrink: 0, textAlign: "right", fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "var(--color-text-disabled)" }}>
                {key}
              </span>
              <span style={{ width: 56, flexShrink: 0, textAlign: "right", fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "var(--color-text-secondary)" }}>
                {value}
              </span>
              <span style={{ width: 44, flexShrink: 0, textAlign: "right", fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-text-disabled)" }}>
                {px}
              </span>
              <div style={{
                height: 20, width: value === "1px" ? "1px" : value,
                maxWidth: "60%",
                background: "var(--color-brand)",
                borderRadius: 2,
                flexShrink: 0,
              }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── Border Radius ────────────────────────────────────────────────────────────

function RadiusScale() {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Border Radius</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
        {Object.entries(borderRadius).map(([key, value]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <div style={{
              width: 72, height: 72,
              background: "var(--color-brand-subtle)",
              border: "2px solid var(--color-brand-border)",
              borderRadius: value,
            }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "var(--color-text-primary)" }}>{key}</p>
              <p style={{ margin: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-text-secondary)" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Breakpoints ──────────────────────────────────────────────────────────────

function Breakpoints() {
  const max = 1400
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Breakpoints (Bootstrap 5)</h2>
      <div style={{ position: "relative", height: 56, background: "var(--color-surface)", borderRadius: 8, overflow: "hidden" }}>
        {Object.entries(breakpoint).map(([key, value], i) => {
          const px = parseInt(value)
          const left = (px / max) * 100
          const colors = ["#0082CF", "#766DE9", "#2F9000", "#F59E0B", "#EF4444", "#8B5CF6"]
          return (
            <React.Fragment key={key}>
              <div style={{
                position: "absolute", left: `${left}%`, top: 0, bottom: 0,
                width: 1, background: colors[i] + "88",
              }} />
              <div style={{
                position: "absolute", left: `${left}%`, top: 4,
                transform: "translateX(-50%)",
                background: colors[i],
                color: "#fff",
                fontSize: 9, fontWeight: 700, fontFamily: "IBM Plex Mono, monospace",
                padding: "2px 5px", borderRadius: 3, whiteSpace: "nowrap",
              }}>
                {key} {value}
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 16 }}>
        {Object.entries(breakpoint).map(([key, value]) => (
          <div key={key} style={{ display: "flex", gap: 16 }}>
            <span style={{ width: 40, flexShrink: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 11, fontWeight: 600, color: "var(--color-brand)" }}>{key}</span>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "var(--color-text-secondary)" }}>≥ {value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Shadows ──────────────────────────────────────────────────────────────────

function Shadows() {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Sombras</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 24 }}>
        {Object.entries(shadow).map(([key, value]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{
              width: "100%", height: 72,
              background: "var(--color-surface)",
              borderRadius: 10,
              boxShadow: value,
            }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "var(--color-text-primary)" }}>shadow-{key}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SpacingPage() {
  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 800, color: "var(--color-text-primary)" }}>Spacing & Layout</h1>
      <p style={{ margin: "0 0 40px", fontSize: 13, color: "var(--color-text-secondary)" }}>
        Espaçamento, raios, breakpoints e sombras do D9 Design System.
      </p>
      <SpacingScale />
      <RadiusScale />
      <Breakpoints />
      <Shadows />
    </div>
  )
}

// ─── Meta & Stories ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Spacing & Layout",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
}
export default meta

export const Sistema: StoryObj = {
  name: "Sistema completo",
  render: () => <SpacingPage />,
}
