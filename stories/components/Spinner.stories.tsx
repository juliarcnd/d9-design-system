import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Spinner } from "../../src/components/Spinner"

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "select", options: ["brand","success","warning","danger","info","muted","inverse"] },
    size:  { control: "select", options: ["sm","md","lg","xl"] },
    type:  { control: "radio",  options: ["border","grow"] },
  },
  args: { color: "brand", size: "md", type: "border" },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Playground: Story = { name: "🎮 Playground" }

export const MatrizCores: Story = {
  name: "Matriz / Cores",
  render: () => (
    <Showcase title="Border spinner — todas as cores">
      {(["brand","success","warning","danger","info","muted"] as const).map((c) => (
        <Cell key={c} label={c}>
          <Spinner color={c} size="md" />
        </Cell>
      ))}
    </Showcase>
  ),
}

export const MatrizTamanhos: Story = {
  name: "Matriz / Tamanhos",
  render: () => (
    <Showcase title="Tamanhos">
      {(["sm","md","lg","xl"] as const).map((s) => (
        <Cell key={s} label={s}>
          <Spinner color="brand" size={s} />
        </Cell>
      ))}
    </Showcase>
  ),
}

export const GrowVariant: Story = {
  name: "Grow variant",
  render: () => (
    <Showcase title="Grow">
      {(["brand","success","warning","danger","info","muted"] as const).map((c) => (
        <Cell key={c} label={c}>
          <Spinner type="grow" color={c} size="md" />
        </Cell>
      ))}
    </Showcase>
  ),
}

export const EmBotao: Story = {
  name: "Em botão (loading state)",
  render: () => (
    <div style={{ padding: 32, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {(["brand","success","warning","danger","info","secondary"] as const).map((c) => (
        <button
          key={c}
          disabled
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0.5rem 1rem", borderRadius: "0.375rem",
            background: "var(--color-surface-raised)", border: "1.5px solid var(--color-border)",
            color: "var(--color-text-secondary)", fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "0.875rem", fontWeight: 600, cursor: "not-allowed", opacity: 0.8,
          }}
        >
          <Spinner color={c} size="sm" />
          Carregando...
        </button>
      ))}
    </div>
  ),
}

export const SobreFundoMarcado: Story = {
  name: "Sobre fundo da marca",
  render: () => (
    <div style={{
      padding: 32,
      background: "var(--color-brand)",
      borderRadius: 12,
      margin: 32,
      display: "flex", gap: 24, alignItems: "center",
    }}>
      <Spinner color="inverse" size="sm" />
      <Spinner color="inverse" size="md" />
      <Spinner color="inverse" size="lg" />
      <Spinner type="grow" color="inverse" size="md" />
    </div>
  ),
}

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 24px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</h2>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-end" }}>{children}</div>
    </div>
  )
}
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {children}
      <span style={{ fontSize: 10, fontFamily: "IBM Plex Mono, monospace", color: "var(--color-text-disabled)" }}>{label}</span>
    </div>
  )
}
