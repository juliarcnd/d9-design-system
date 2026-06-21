import type { Meta, StoryObj } from "@storybook/react"
import { Dropdown } from "../../src/components/Dropdown"
import { Button } from "../../src/components/Button"

const meta: Meta = {
  title: "Componentes/Dropdown",
  parameters: { layout: "centered" },
}
export default meta

export const Padrao: StoryObj = {
  render: () => (
    <Dropdown
      trigger={<Button variant="outline-secondary">Ações ▾</Button>}
      items={[
        { type: "label", label: "Pedido #1042" },
        { label: "Ver detalhes" },
        { label: "Editar pedido" },
        { label: "Imprimir etiqueta" },
        { type: "divider" },
        { label: "Cancelar pedido", danger: true },
      ]}
    />
  ),
}

export const IconButton: StoryObj = {
  render: () => (
    <Dropdown
      align="right"
      trigger={<Button variant="ghost" size="sm" iconOnly aria-label="Mais opções">⋯</Button>}
      items={[
        { label: "Duplicar" },
        { label: "Exportar CSV" },
        { type: "divider" },
        { label: "Excluir", danger: true },
      ]}
    />
  ),
}

export const ComDesativados: StoryObj = {
  render: () => (
    <Dropdown
      trigger={<Button variant="brand">Exportar ▾</Button>}
      items={[
        { label: "Exportar como PDF" },
        { label: "Exportar como CSV" },
        { label: "Exportar como Excel", disabled: true },
        { type: "divider" },
        { label: "Configurar exportação" },
      ]}
    />
  ),
}
