import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Modal } from "../../src/components/Modal"
import { Button } from "../../src/components/Button"
import { Input } from "../../src/components/Input"
import { Label } from "../../src/components/Label"
import { Select } from "../../src/components/Select"

const meta: Meta = {
  title: "Componentes/Modal",
  parameters: { layout: "centered" },
}
export default meta

function Demo({ size, title, children, footer }: { size?: "sm"|"md"|"lg"|"xl"; title: string; children: React.ReactNode; footer: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="brand" onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size} title={title} footer={footer}>
        {children}
      </Modal>
    </>
  )
}

export const Confirmacao: StoryObj = {
  render: () => (
    <Demo
      size="sm"
      title="Cancelar pedido #1042?"
      footer={
        <>
          <Button variant="outline-secondary">Voltar</Button>
          <Button variant="danger">Sim, cancelar</Button>
        </>
      }
    >
      Essa ação não pode ser desfeita. O cliente será notificado e o estoque será restaurado automaticamente.
    </Demo>
  ),
}

export const Formulario: StoryObj = {
  render: () => (
    <Demo
      size="md"
      title="Novo cliente"
      footer={
        <>
          <Button variant="outline-secondary">Cancelar</Button>
          <Button variant="brand">Salvar cliente</Button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <Label htmlFor="m-nome" required>Nome completo</Label>
          <Input id="m-nome" placeholder="Ex: Maria da Silva" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <Label htmlFor="m-cpf">CPF</Label>
            <Input id="m-cpf" placeholder="000.000.000-00" />
          </div>
          <div>
            <Label htmlFor="m-tel">Telefone</Label>
            <Input id="m-tel" placeholder="(11) 90000-0000" />
          </div>
        </div>
        <div>
          <Label htmlFor="m-tipo">Tipo</Label>
          <Select id="m-tipo" options={[
            { value: "humano",   label: "Pessoa física" },
            { value: "b2b",     label: "Empresa (B2B)" },
            { value: "paciente",label: "Paciente" },
          ]} />
        </div>
      </div>
    </Demo>
  ),
}

export const Grande: StoryObj = {
  render: () => (
    <Demo
      size="lg"
      title="Detalhes do pedido #1042"
      footer={
        <>
          <Button variant="outline-secondary">Fechar</Button>
          <Button variant="brand">Editar pedido</Button>
        </>
      }
    >
      <p>Aqui entraria um conteúdo mais completo — timeline do pedido, itens, endereço de entrega, histórico de status, etc.</p>
      <p style={{ marginTop: 8 }}>Este modal <strong>lg</strong> tem até 760px de largura e rola verticalmente se o conteúdo exceder a viewport.</p>
    </Demo>
  ),
}
