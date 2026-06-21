import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Badge } from "../../src/components/Badge"
import type { BadgeVariant } from "../../src/components/Badge"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "brand","success","warning","danger","info","secondary",
        "subtle-brand","subtle-success","subtle-warning","subtle-danger","subtle-info","subtle-secondary",
      ],
    },
    size: { control: "select", options: ["sm","md"] },
    pill: { control: "boolean" },
  },
  args: { children: "Badge", variant: "brand", size: "md" },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Playground: Story = { name: "🎮 Playground" }

const SOLID: BadgeVariant[]  = ["brand","success","warning","danger","info","secondary"]
const SUBTLE: BadgeVariant[] = ["subtle-brand","subtle-success","subtle-warning","subtle-danger","subtle-info","subtle-secondary"]
const LABELS = ["Brand","Sucesso","Atenção","Erro","Info","Neutro"]

export const MatrizSolid: Story = {
  name: "Matriz / Solid",
  render: () => (
    <Showcase title="Solid">
      <Row label="Normal">
        {SOLID.map((v, i) => <Badge key={v} variant={v}>{LABELS[i]}</Badge>)}
      </Row>
      <Row label="Pill">
        {SOLID.map((v, i) => <Badge key={v} variant={v} pill>{LABELS[i]}</Badge>)}
      </Row>
      <Row label="Small">
        {SOLID.map((v, i) => <Badge key={v} variant={v} size="sm">{LABELS[i]}</Badge>)}
      </Row>
      <Row label="Small Pill">
        {SOLID.map((v, i) => <Badge key={v} variant={v} size="sm" pill>{LABELS[i]}</Badge>)}
      </Row>
    </Showcase>
  ),
}

export const MatrizSubtle: Story = {
  name: "Matriz / Subtle",
  render: () => (
    <Showcase title="Subtle">
      <Row label="Normal">
        {SUBTLE.map((v, i) => <Badge key={v} variant={v}>{LABELS[i]}</Badge>)}
      </Row>
      <Row label="Pill">
        {SUBTLE.map((v, i) => <Badge key={v} variant={v} pill>{LABELS[i]}</Badge>)}
      </Row>
    </Showcase>
  ),
}

export const WithIcons: Story = {
  name: "Com ícones",
  render: () => (
    <Showcase title="Ícones">
      <Row label="Leading">
        <Badge variant="subtle-success" icon={<span>✓</span>}>Ativo</Badge>
        <Badge variant="subtle-warning" icon={<span>⚠</span>}>Atenção</Badge>
        <Badge variant="subtle-danger"  icon={<span>✕</span>}>Erro</Badge>
        <Badge variant="subtle-info"    icon={<span>ℹ</span>}>Informação</Badge>
      </Row>
      <Row label="Casos de uso">
        <Badge variant="brand" pill>PRO</Badge>
        <Badge variant="subtle-success" pill>Online</Badge>
        <Badge variant="subtle-warning" pill>Pendente</Badge>
        <Badge variant="subtle-danger"  pill>Expirado</Badge>
        <Badge variant="secondary" pill>Beta</Badge>
        <Badge variant="subtle-info" pill>Novo</Badge>
      </Row>
    </Showcase>
  ),
}

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 24px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  )
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <span style={{ width: 120, flexShrink: 0, fontSize: 11, color: "var(--color-text-disabled)", fontFamily: "IBM Plex Mono, monospace" }}>
        {label}
      </span>
      {children}
    </div>
  )
}
