import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "../../src/components/Card"
import { Button } from "../../src/components/Button"
import { Badge } from "../../src/components/Badge"

const meta: Meta = {
  title: "Componentes/Card",
  parameters: { layout: "padded" },
}
export default meta

export const Simples: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 860 }}>
      <Card title="Total de pedidos" subtitle="Últimos 30 dias">
        <p style={{ margin: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 28, fontWeight: 800, color: "var(--color-brand)" }}>
          1.429
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--color-success)" }}>↑ 12% vs mês anterior</p>
      </Card>
      <Card title="Faturamento" subtitle="Últimos 30 dias">
        <p style={{ margin: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 28, fontWeight: 800, color: "var(--color-brand)" }}>
          R$ 84.320
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--color-error)" }}>↓ 3% vs mês anterior</p>
      </Card>
      <Card title="Clientes ativos" subtitle="Cadastros verificados">
        <p style={{ margin: 0, fontFamily: "IBM Plex Mono, monospace", fontSize: 28, fontWeight: 800, color: "var(--color-brand)" }}>
          312
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--color-text-disabled)" }}>Sem variação</p>
      </Card>
    </div>
  ),
}

export const ComFooter: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <Card
        title="Pedido #1042"
        subtitle="Criado em 21/06/2026"
        footer={
          <>
            <Button variant="outline-secondary" size="sm">Ver detalhes</Button>
            <Button variant="brand" size="sm">Aprovar</Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Cliente</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Maria Souza</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Status</span>
            <Badge variant="subtle-warning">Separando</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Total</span>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 700, color: "var(--color-brand)" }}>R$ 349,90</span>
          </div>
        </div>
      </Card>
    </div>
  ),
}

export const Clicavel: StoryObj = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 640 }}>
      {["Entregues", "Em trânsito", "Pendentes"].map(label => (
        <Card key={label} hover onClick={() => alert(`Clicou: ${label}`)}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{label}</p>
          <p style={{ margin: "4px 0 0", fontFamily: "IBM Plex Mono, monospace", fontSize: 22, fontWeight: 800, color: "var(--color-brand)" }}>
            {Math.floor(Math.random() * 100 + 10)}
          </p>
        </Card>
      ))}
    </div>
  ),
}
