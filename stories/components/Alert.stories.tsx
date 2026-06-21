import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Alert } from "../../src/components/Alert"
import type { AlertVariant } from "../../src/components/Alert"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["brand","success","warning","danger","info","neutral"] },
    title: { control: "text" },
    dismissible: { control: "boolean" },
  },
  args: {
    variant: "info",
    title: "Atenção",
    children: "Sua sessão expira em 5 minutos. Salve seu trabalho antes de continuar.",
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Playground: Story = { name: "🎮 Playground" }

const VARIANTS: AlertVariant[] = ["brand","success","warning","danger","info","neutral"]
const MESSAGES: Record<AlertVariant, { title: string; msg: string }> = {
  brand:   { title: "Novidade",     msg: "A versão 2.0 do D9 Pro está disponível. Confira as novidades." },
  success: { title: "Sucesso",      msg: "Pagamento processado com sucesso. O comprovante foi enviado por e-mail." },
  warning: { title: "Atenção",      msg: "Seu plano expira em 3 dias. Renove para não perder o acesso." },
  danger:  { title: "Erro crítico", msg: "Falha ao processar a transação. Tente novamente ou contate o suporte." },
  info:    { title: "Informação",   msg: "Manutenção programada para hoje às 22h. O serviço ficará indisponível por 30min." },
  neutral: { title: "Aviso",        msg: "Alguns campos foram preenchidos automaticamente. Verifique antes de continuar." },
}

export const MatrizVariants: Story = {
  name: "Matriz / Todas as variantes",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} variant={v} title={MESSAGES[v].title}>
          {MESSAGES[v].msg}
        </Alert>
      ))}
    </div>
  ),
}

export const Dismissible: Story = {
  name: "Dismissível",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} variant={v} title={MESSAGES[v].title} dismissible onDismiss={() => {}}>
          {MESSAGES[v].msg}
        </Alert>
      ))}
    </div>
  ),
}

export const SemTitulo: Story = {
  name: "Sem título",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} variant={v}>{MESSAGES[v].msg}</Alert>
      ))}
    </div>
  ),
}

export const ComIconeCustom: Story = {
  name: "Com ícone customizado",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
      <Alert variant="success" title="Transação aprovada" icon={<span style={{ fontSize: "1.1rem" }}>✅</span>}>
        R$ 1.349,00 debitado com sucesso. ID: TXN-20260621-A4F8C2
      </Alert>
      <Alert variant="warning" title="Limite próximo" icon={<span style={{ fontSize: "1.1rem" }}>📊</span>}>
        Você usou 87% do limite mensal da API. Considere fazer upgrade do plano.
      </Alert>
      <Alert variant="info" title="Novo recurso disponível" icon={<span style={{ fontSize: "1.1rem" }}>🚀</span>}>
        O D9 Pag agora suporta Pix parcelado. Ative nas configurações da conta.
      </Alert>
    </div>
  ),
}
