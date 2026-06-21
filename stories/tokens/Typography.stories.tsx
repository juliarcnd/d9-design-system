import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { fontSize, fontWeight, lineHeight, letterSpacing } from "../../src/tokens"

// ─── Specimen de fonte ────────────────────────────────────────────────────────

function FontSpecimen({ family, label, sample }: { family: string; label: string; sample: string }) {
  const isMono = family.includes("Mono")
  return (
    <div style={{
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 10,
      padding: "24px 28px",
      marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-brand)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </span>
        <span style={{ fontSize: 10, fontFamily: "IBM Plex Mono, monospace", color: "var(--color-text-disabled)" }}>{family}</span>
      </div>
      <p style={{ margin: 0, fontFamily: family, fontSize: 36, fontWeight: isMono ? 400 : 700, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
        {sample}
      </p>
      <p style={{ margin: "12px 0 0", fontFamily: family, fontSize: 14, fontWeight: 400, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
        0123456789 !@#$%^&*()_+-=[]
      </p>
    </div>
  )
}

// ─── Escala de tamanhos ───────────────────────────────────────────────────────

const SIZE_ITEMS = Object.entries(fontSize).map(([key, value]) => ({ key, value }))

function SizeScale() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Escala de Tamanhos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SIZE_ITEMS.filter((s) => !s.key.startsWith("h")).map(({ key, value }) => (
          <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{
              width: 64, flexShrink: 0, textAlign: "right",
              fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-text-disabled)",
            }}>
              {key}
            </span>
            <span style={{
              width: 56, flexShrink: 0, textAlign: "right",
              fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-text-secondary)",
            }}>
              {value}
            </span>
            <span style={{ fontSize: value, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
              Design System D9
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Headings ─────────────────────────────────────────────────────────────────

function Headings() {
  const tags: Array<keyof React.JSX.IntrinsicElements> = ["h1", "h2", "h3", "h4", "h5", "h6"]
  const keys = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Headings</h2>
      <div style={{
        background: "var(--color-surface)", border: "1px solid var(--color-border)",
        borderRadius: 10, padding: "24px 28px",
      }}>
        {keys.map((key, i) => {
          const Tag = tags[i]
          return (
            <Tag
              key={key}
              style={{
                margin: "0 0 12px",
                fontSize: fontSize[key],
                fontWeight: i < 2 ? 800 : i < 4 ? 700 : 600,
                color: "var(--color-text-primary)",
                lineHeight: 1.25,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {key.toUpperCase()} — Heading {i + 1} · {fontSize[key]}
            </Tag>
          )
        })}
      </div>
    </section>
  )
}

// ─── Mono showcase ────────────────────────────────────────────────────────────

function MonoShowcase() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>IBM Plex Mono — Casos de uso</h2>
      <div style={{
        background: "var(--color-surface)", border: "1px solid var(--color-border)",
        borderRadius: 10, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16,
      }}>
        {[
          { label: "Valor monetário", text: "R$ 1.349,00", size: "1.5rem", weight: 600 },
          { label: "Código de rastreio", text: "BR 123 456 789 0 AA", size: "1rem", weight: 400 },
          { label: "ID de transação", text: "TXN-20260621-A4F8C2", size: "0.875rem", weight: 500 },
          { label: "Tabela de dados", text: "12.450 unidades · 99,8%", size: "0.875rem", weight: 400 },
          { label: "Snippet de código", text: `const token = process.env.D9_API_KEY`, size: "0.8125rem", weight: 400 },
        ].map(({ label, text, size, weight }) => (
          <div key={label} style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span style={{ width: 160, flexShrink: 0, fontSize: 11, color: "var(--color-text-secondary)" }}>{label}</span>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: size, fontWeight: weight, color: "var(--color-text-primary)" }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Pesos ────────────────────────────────────────────────────────────────────

function WeightScale() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Pesos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {Object.entries(fontWeight).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ width: 72, flexShrink: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-text-disabled)" }}>
              {key}
            </span>
            <span style={{ width: 32, flexShrink: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-text-secondary)" }}>
              {value}
            </span>
            <span style={{ fontSize: "1.25rem", fontWeight: value, color: "var(--color-text-primary)" }}>
              Plus Jakarta Sans {key}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Line height ──────────────────────────────────────────────────────────────

function LineHeightScale() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Line Height</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {Object.entries(lineHeight).map(([key, value]) => (
          <div key={key} style={{
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
            borderRadius: 8, padding: "12px 14px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-primary)" }}>{key}</span>
              <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "var(--color-brand)" }}>{value}</span>
            </div>
            <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: value, color: "var(--color-text-secondary)" }}>
              Texto de exemplo para visualizar o espaçamento entre linhas nesta escala.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 800, color: "var(--color-text-primary)" }}>Typography</h1>
      <p style={{ margin: "0 0 40px", fontSize: 13, color: "var(--color-text-secondary)" }}>
        <strong>Plus Jakarta Sans</strong> — textos, labels, botões, headings. &nbsp;
        <strong>IBM Plex Mono</strong> — números, IDs, rastreios, tabelas de dados.
      </p>

      <FontSpecimen
        family="'Plus Jakarta Sans', sans-serif"
        label="Fonte principal"
        sample="D9 Design System"
      />
      <FontSpecimen
        family="'IBM Plex Mono', monospace"
        label="Fonte mono"
        sample="0123456789 BR-456-TXN"
      />

      <SizeScale />
      <Headings />
      <WeightScale />
      <LineHeightScale />
      <MonoShowcase />
    </div>
  )
}

// ─── Meta & Stories ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
}
export default meta

export const Sistema: StoryObj = {
  name: "Sistema completo",
  render: () => <TypographyPage />,
}
