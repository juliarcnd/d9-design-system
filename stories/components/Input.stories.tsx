import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "../../src/components/Input"

const meta: Meta<typeof Input> = {
  title: "Componentes/Input",
  component: Input,
  parameters: { layout: "padded" },
}
export default meta

// ── Playground ────────────────────────────────────────────────────────────────
export const Padrao: StoryObj<typeof Input> = {
  args: {
    label: "E-mail",
    helperText: "Use seu e-mail corporativo.",
    placeholder: "voce@empresa.com",
    size: "md",
    state: "default",
  },
}

// ── Estados ───────────────────────────────────────────────────────────────────
export const Estados: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 380 }}>
      <Input label="Padrão"   placeholder="placeholder" helperText="Texto de apoio abaixo do campo." />
      <Input label="Focado"   placeholder="já vem com valor" defaultValue="texto preenchido" />
      <Input label="Válido"   defaultValue="maria@empresa.com" state="valid"   helperText="E-mail verificado com sucesso." />
      <Input label="Inválido" defaultValue="email-errado"      state="invalid" helperText="Formato de e-mail inválido." />
      <Input label="Desativado" defaultValue="valor fixo" disabled helperText="Campo não editável." />
    </div>
  ),
}

// ── Tamanhos ──────────────────────────────────────────────────────────────────
export const Tamanhos: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 380 }}>
      <Input label="Small"  size="sm" placeholder="sm" helperText="Tamanho sm — 44px de altura." />
      <Input label="Medium" size="md" placeholder="md" helperText="Tamanho md — 56px de altura (padrão)." />
      <Input label="Large"  size="lg" placeholder="lg" helperText="Tamanho lg — 64px de altura." />
    </div>
  ),
}

// ── Sem label (simples) ───────────────────────────────────────────────────────
export const SemLabel: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 380 }}>
      <Input placeholder="Buscar..." size="sm" />
      <Input placeholder="Digite algo" />
    </div>
  ),
}

// ── Com ícones ────────────────────────────────────────────────────────────────
export const ComIcones: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 380 }}>
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        leadingIcon={<span style={{ fontSize: 14 }}>🪪</span>}
      />
      <Input
        label="Valor"
        placeholder="0,00"
        leadingIcon={<span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-secondary)" }}>R$</span>}
        size="md"
      />
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        trailingIcon={<span style={{ fontSize: 14, cursor: "pointer" }}>👁</span>}
      />
    </div>
  ),
}

// ── Formulário completo ────────────────────────────────────────────────────────
export const FormularioCompleto: StoryObj = {
  render: () => {
    const [form, setForm] = useState({ nome: "", email: "", cpf: "", telefone: "" })
    const emailOk = form.email.includes("@") && form.email.includes(".")
    const emailState = form.email.length > 0 ? (emailOk ? "valid" : "invalid") : "default"

    return (
      <div style={{ maxWidth: 460, display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)" }}>Novo cliente</h2>
        <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--color-text-secondary)" }}>Preencha os dados abaixo para cadastrar.</p>

        <Input
          label="Nome completo"
          placeholder="Ex: Maria da Silva"
          value={form.nome}
          onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
          helperText={form.nome.length > 0 && form.nome.length < 3 ? "Mínimo de 3 caracteres." : undefined}
          state={form.nome.length > 0 && form.nome.length < 3 ? "invalid" : "default"}
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="voce@empresa.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          state={emailState}
          helperText={
            emailState === "valid"   ? "E-mail válido." :
            emailState === "invalid" ? "Insira um e-mail válido." :
            "Usado para notificações e acesso."
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={e => setForm(f => ({ ...f, cpf: e.target.value }))}
          />
          <Input
            label="Telefone"
            placeholder="(11) 90000-0000"
            value={form.telefone}
            onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))}
          />
        </div>
      </div>
    )
  },
}
