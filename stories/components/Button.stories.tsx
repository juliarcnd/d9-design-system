import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Button } from "../../src/components/Button"
import type { ButtonVariant, ButtonSize } from "../../src/components/Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "brand","secondary","ghost","link",
        "success","warning","danger","info",
        "outline-brand","outline-secondary",
        "outline-success","outline-warning","outline-danger","outline-info",
      ],
    },
    size: { control: "select", options: ["sm","md","lg","xl"] },
    loading:  { control: "boolean" },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
  },
  args: { children: "Botão", variant: "brand", size: "md" },
}
export default meta
type Story = StoryObj<typeof Button>

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = { name: "🎮 Playground" }

// ─── Matriz — Solid ───────────────────────────────────────────────────────────
const SOLID_VARIANTS: ButtonVariant[] = ["brand","success","warning","danger","info","secondary","ghost","link"]
const SIZES: ButtonSize[] = ["sm","md","lg","xl"]

export const MatrizSolid: Story = {
  name: "Matriz / Solid",
  render: () => (
    <ShowcaseGrid title="Solid">
      {SOLID_VARIANTS.map((v) => (
        <Row key={v} label={v}>
          {SIZES.map((s) => <Button key={s} variant={v} size={s}>{s}</Button>)}
        </Row>
      ))}
    </ShowcaseGrid>
  ),
}

// ─── Matriz — Outline ─────────────────────────────────────────────────────────
const OUTLINE_VARIANTS: ButtonVariant[] = [
  "outline-brand","outline-success","outline-warning","outline-danger","outline-info","outline-secondary",
]
export const MatrizOutline: Story = {
  name: "Matriz / Outline",
  render: () => (
    <ShowcaseGrid title="Outline">
      {OUTLINE_VARIANTS.map((v) => (
        <Row key={v} label={v}>
          {SIZES.map((s) => <Button key={s} variant={v} size={s}>{s}</Button>)}
        </Row>
      ))}
    </ShowcaseGrid>
  ),
}

// ─── States ───────────────────────────────────────────────────────────────────
export const States: Story = {
  name: "States",
  render: () => (
    <ShowcaseGrid title="Estados">
      <Row label="Normal">
        <Button>Normal</Button>
        <Button variant="outline-brand">Normal</Button>
        <Button variant="secondary">Normal</Button>
      </Row>
      <Row label="Loading">
        <Button loading>Salvando</Button>
        <Button variant="outline-brand" loading>Enviando</Button>
        <Button variant="secondary" loading>Carregando</Button>
      </Row>
      <Row label="Disabled">
        <Button disabled>Desabilitado</Button>
        <Button variant="outline-brand" disabled>Desabilitado</Button>
        <Button variant="secondary" disabled>Desabilitado</Button>
      </Row>
    </ShowcaseGrid>
  ),
}

// ─── Com ícones ───────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: "Com ícones",
  render: () => (
    <ShowcaseGrid title="Ícones">
      <Row label="Leading icon">
        <Button><span>↑</span> Upload</Button>
        <Button variant="outline-brand"><span>+</span> Novo</Button>
        <Button variant="success"><span>✓</span> Confirmar</Button>
      </Row>
      <Row label="Trailing icon">
        <Button>Próximo <span>→</span></Button>
        <Button variant="outline-danger">Excluir <span>✕</span></Button>
      </Row>
      <Row label="Icon only">
        <Button iconOnly size="sm" aria-label="Adicionar"><span>+</span></Button>
        <Button iconOnly size="md" aria-label="Adicionar"><span>+</span></Button>
        <Button iconOnly size="lg" aria-label="Adicionar"><span>+</span></Button>
        <Button iconOnly variant="outline-brand" aria-label="Editar"><span>✎</span></Button>
        <Button iconOnly variant="ghost" aria-label="Mais"><span>⋯</span></Button>
      </Row>
    </ShowcaseGrid>
  ),
}

// ─── CTAs reais ───────────────────────────────────────────────────────────────
export const CTAs: Story = {
  name: "CTAs reais D9",
  render: () => (
    <ShowcaseGrid title="Casos de uso">
      <Row label="D9 Tech">
        <Button size="lg">Acessar plataforma →</Button>
        <Button size="lg" variant="outline-brand">Ver demonstração</Button>
      </Row>
      <Row label="D9 Pro">
        <Button size="lg">Assinar Pro</Button>
        <Button size="lg" variant="ghost">Saber mais</Button>
      </Row>
      <Row label="D9 Pag">
        <Button size="lg">Processar pagamento</Button>
        <Button size="lg" variant="outline-brand">Cancelar</Button>
      </Row>
      <Row label="Ações destrutivas">
        <Button variant="danger">Excluir conta</Button>
        <Button variant="outline-danger">Remover acesso</Button>
      </Row>
    </ShowcaseGrid>
  ),
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ShowcaseGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ margin: "0 0 24px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  )
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <span style={{ width: 160, flexShrink: 0, fontSize: 11, color: "var(--color-text-disabled)", fontFamily: "IBM Plex Mono, monospace" }}>
        {label}
      </span>
      {children}
    </div>
  )
}
