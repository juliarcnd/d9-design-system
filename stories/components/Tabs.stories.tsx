import type { Meta, StoryObj } from "@storybook/react"
import { Tabs } from "../../src/components/Tabs"

const meta: Meta = {
  title: "Componentes/Tabs",
  parameters: { layout: "padded" },
}
export default meta

export const Underline: StoryObj = {
  render: () => (
    <Tabs
      items={[
        { value: "todos",      label: "Todos pedidos", count: 142, content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Conteúdo da aba Todos</p> },
        { value: "pendente",   label: "Pendentes",     count: 8,   content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Conteúdo da aba Pendentes</p> },
        { value: "entregue",   label: "Entregues",                 content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Conteúdo da aba Entregues</p> },
        { value: "cancelado",  label: "Cancelados",                content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Conteúdo da aba Cancelados</p>, disabled: true },
      ]}
    />
  ),
}

export const Pill: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Tabs
        variant="pill"
        items={[
          { value: "semana", label: "Esta semana", content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Dados da semana</p> },
          { value: "mes",    label: "Este mês",    content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Dados do mês</p> },
          { value: "ano",    label: "Este ano",    content: <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>Dados do ano</p> },
        ]}
      />
    </div>
  ),
}
