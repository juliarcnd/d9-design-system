import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { primitives } from "../../src/tokens"

// ─── Utilitários WCAG ────────────────────────────────────────────────────────

function toLinear(c: number) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}
function luminance(hex: string) {
  const c = hex.replace("#", "")
  return 0.2126 * toLinear(parseInt(c.slice(0, 2), 16))
       + 0.7152 * toLinear(parseInt(c.slice(2, 4), 16))
       + 0.0722 * toLinear(parseInt(c.slice(4, 6), 16))
}
function contrast(a: string, b: string) {
  const [l, d] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l + 0.05) / (d + 0.05)
}
function wcag(hex: string) {
  const vs = contrast(hex, "#10131A")
  const vl = contrast(hex, "#F8F9FC")
  const best = Math.max(vs, vl)
  return {
    label: best >= 7 ? "AAA" : best >= 4.5 ? "AA" : best >= 3 ? "AA Large" : "Fail",
    ratio: best.toFixed(1),
    color: best >= 4.5 ? "#4ADE80" : best >= 3 ? "#FCD34D" : "#F87171",
  }
}

// ─── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({ name, value, cssVar }: { name: string; value: string; cssVar?: string }) {
  const { label, ratio, color } = wcag(value)
  const textOnSwatch = luminance(value) < 0.25 ? "#F8F9FC" : "#10131A"
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
      <div
        style={{
          height: 72,
          borderRadius: 10,
          background: value,
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "flex-end",
          padding: "6px 8px",
        }}
      >
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: textOnSwatch, opacity: 0.7 }}>
          {value}
        </span>
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "var(--color-text-primary)" }}>{name}</p>
        {cssVar && (
          <p style={{ margin: 0, fontSize: 10, fontFamily: "IBM Plex Mono, monospace", color: "var(--color-text-secondary)" }}>
            {cssVar}
          </p>
        )}
        <span style={{
          display: "inline-block", marginTop: 3,
          fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4,
          background: color + "22", color,
        }}>
          {label} {ratio}:1
        </span>
      </div>
    </div>
  )
}

// ─── Paleta Row ───────────────────────────────────────────────────────────────

function PaletteRow({ title, palette, prefix, cssVarFn }: {
  title: string
  palette: Record<string | number, string>
  prefix: string
  cssVarFn?: (key: string) => string
}) {
  const entries = Object.entries(palette)
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12, marginTop: 12 }}>
        {entries.map(([key, value]) => (
          <Swatch
            key={key}
            name={`${prefix}-${key}`}
            value={value}
            cssVar={cssVarFn ? cssVarFn(key) : undefined}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Semantic section ─────────────────────────────────────────────────────────

type SemanticEntry = { name: string; cssVar: string; description?: string }

function SemanticGroup({ title, entries }: { title: string; entries: SemanticEntry[] }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
        {entries.map((e) => {
          const el = typeof document !== "undefined"
            ? getComputedStyle(document.documentElement).getPropertyValue(e.cssVar).trim()
            : ""
          return (
            <div key={e.cssVar} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  height: 56,
                  borderRadius: 8,
                  background: `var(${e.cssVar})`,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <div>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "var(--color-text-primary)" }}>{e.name}</p>
                <p style={{ margin: 0, fontSize: 10, fontFamily: "IBM Plex Mono, monospace", color: "var(--color-text-secondary)" }}>
                  {e.cssVar}
                </p>
                {e.description && (
                  <p style={{ margin: "2px 0 0", fontSize: 10, color: "var(--color-text-secondary)" }}>{e.description}</p>
                )}
                {el && (
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, color: "var(--color-text-disabled)" }}>{el}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── Feedback showcase ────────────────────────────────────────────────────────

const FEEDBACK_ITEMS = [
  { label: "Sucesso", color: "--color-success", muted: "--color-success-muted", btn: "--color-success-btn", border: "--color-success-border" },
  { label: "Atenção",  color: "--color-warning", muted: "--color-warning-muted", btn: "--color-warning-btn", border: "--color-warning-border" },
  { label: "Erro",    color: "--color-error",   muted: "--color-error-muted",   btn: "--color-error-btn",   border: "--color-error-border" },
  { label: "Info",    color: "--color-info",    muted: "--color-info-muted",    btn: "--color-info-btn",    border: "--color-info-border" },
]

function FeedbackShowcase() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Feedback</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {FEEDBACK_ITEMS.map((item) => (
          <div key={item.label} style={{
            background: `var(${item.muted})`,
            border: `1px solid var(${item.border})`,
            borderRadius: 10,
            padding: "14px 16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: `var(${item.color})`, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: `var(${item.color})` }}>{item.label}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[item.color, item.btn, item.muted, item.border].map((v) => (
                <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: `var(${v})`, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <span style={{ fontSize: 8, fontFamily: "IBM Plex Mono, monospace", color: "var(--color-text-disabled)", textAlign: "center" }}>
                    {v.replace("--color-", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ColorsPage() {
  return (
    <div style={{ padding: 32, maxWidth: 1100 }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 800, color: "var(--color-text-primary)" }}>Color System</h1>
      <p style={{ margin: "0 0 40px", fontSize: 13, color: "var(--color-text-secondary)" }}>
        Use o switcher <strong>Brand</strong> e <strong>Theme</strong> na toolbar para ver as variações.
        Os tokens semânticos (<code style={{ fontFamily: "IBM Plex Mono, monospace" }}>var(--color-*)</code>) refletem automaticamente o brand e o tema ativos.
      </p>

      {/* Brand primitives */}
      <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: "var(--color-brand)" }}>
        Brand — Primitivos
      </h2>
      <PaletteRow title="D9 Tech" palette={primitives.tech} prefix="tech" cssVarFn={(k) => `--brand-${k} (tech)`} />
      <PaletteRow title="D9 Pro"  palette={primitives.pro}  prefix="pro"  cssVarFn={(k) => `--brand-${k} (pro)`} />
      <PaletteRow title="D9 Pag"  palette={primitives.pag}  prefix="pag"  cssVarFn={(k) => `--brand-${k} (pag)`} />

      {/* Semantic brand */}
      <SemanticGroup
        title="Brand — Semântico (muda com o switcher)"
        entries={[
          { name: "Brand",        cssVar: "--color-brand",        description: "CTA principal" },
          { name: "Brand Hover",  cssVar: "--color-brand-hover",  description: "Estado hover" },
          { name: "Brand Active", cssVar: "--color-brand-active", description: "Estado pressed" },
          { name: "Brand Subtle", cssVar: "--color-brand-subtle", description: "Fundo de badge/chip" },
          { name: "Brand Border", cssVar: "--color-brand-border", description: "Borda de destaque" },
        ]}
      />

      {/* Neutral */}
      <PaletteRow
        title="Neutral"
        palette={primitives.neutral}
        prefix="neutral"
      />

      {/* Surfaces */}
      <SemanticGroup
        title="Superfícies (muda com o tema)"
        entries={[
          { name: "BG",             cssVar: "--color-bg",              description: "Fundo da página" },
          { name: "Surface",        cssVar: "--color-surface",         description: "Cards, painéis" },
          { name: "Surface Raised", cssVar: "--color-surface-raised",  description: "Dropdowns, tooltips" },
          { name: "Surface Overlay",cssVar: "--color-surface-overlay", description: "Modais, overlays" },
        ]}
      />

      {/* Text */}
      <SemanticGroup
        title="Texto"
        entries={[
          { name: "Text Primary",   cssVar: "--color-text-primary",   description: "Corpo e headings" },
          { name: "Text Secondary", cssVar: "--color-text-secondary", description: "Legendas, subtítulos" },
          { name: "Text Disabled",  cssVar: "--color-text-disabled",  description: "Campos e ações desabilitadas" },
          { name: "Text Inverse",   cssVar: "--color-text-inverse",   description: "Texto em fundo colorido" },
        ]}
      />

      {/* Borders */}
      <SemanticGroup
        title="Bordas"
        entries={[
          { name: "Border",        cssVar: "--color-border",        description: "Padrão" },
          { name: "Border Subtle", cssVar: "--color-border-subtle", description: "Divisores sutis" },
          { name: "Border Strong", cssVar: "--color-border-strong", description: "Foco, destaque" },
        ]}
      />

      {/* Feedback */}
      <FeedbackShowcase />

      {/* Feedback raw palette */}
      <PaletteRow title="Success — primitivos" palette={primitives.green}  prefix="green" />
      <PaletteRow title="Warning — primitivos" palette={primitives.amber}  prefix="amber" />
      <PaletteRow title="Error — primitivos"   palette={primitives.red}    prefix="red" />
      <PaletteRow title="Info — primitivos"    palette={primitives.blue}   prefix="blue" />
    </div>
  )
}

// ─── Meta & Stories ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Colors",
  component: ColorsPage,
  parameters: { layout: "fullscreen" },
}
export default meta

export const Sistema: StoryObj = {
  name: "Sistema completo",
  render: () => <ColorsPage />,
}
