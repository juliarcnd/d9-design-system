import type { Meta, StoryObj } from "@storybook/react"
import { ToastProvider, ToastDemo } from "../../src/components/Toast"

const meta: Meta = {
  title: "Componentes/Toast",
  parameters: { layout: "centered" },
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
}
export default meta

export const Interativo: StoryObj = {
  render: () => (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: 16, fontSize: 13 }}>
        Clique nos botões para disparar toasts. Eles somem após 4 segundos.
      </p>
      <ToastDemo />
    </div>
  ),
}
