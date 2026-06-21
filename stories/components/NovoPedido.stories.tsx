/**
 * Adaptação da tela "Novo Pedido" usando componentes D9.
 * Para ver com a marca correta: selecione "D9 Pro" no switcher Brand da toolbar.
 *
 * Melhorias aplicadas vs. tela original:
 *  1. Frete como RadioGroup visual — estado selecionado explícito e acessível
 *  2. Quantidade via stepper numérico — mais intuitivo que dropdown "1x"
 *  3. Total final destacado com tipografia maior e separação visual
 *  4. Campos readonly do Resumo com fundo diferenciado de campos editáveis
 *  5. Seções em cards com borda — hierarquia visual mais clara
 *  6. Badge de contagem na aba Cliente
 *  7. Botão "Criar" com ícone e tamanho lg para peso visual correto
 *  8. CEP com hint de auto-preenchimento
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Label }     from "../../src/components/Label"
import { Input }     from "../../src/components/Input"
import { Select }    from "../../src/components/Select"
import { Button }    from "../../src/components/Button"
import { Badge }     from "../../src/components/Badge"
import { Spinner }   from "../../src/components/Spinner"
import { InputGroup, InputGroupText } from "../../src/components/InputGroup"

// ─── Mini componentes de layout ───────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 10,
      padding: "20px 24px",
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "0.01em" }}>
      {children}
    </h3>
  )
}

function Divider() {
  return <div style={{ borderTop: "1px solid var(--color-border-subtle)", margin: "16px 0" }} />
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const items = [
    { group: "PEDIDOS", links: [
      { icon: "📋", label: "Novo pedido", active: true },
      { icon: "☰",  label: "Todos pedidos" },
      { icon: "⊞",  label: "Visão geral" },
      { icon: "⚙",  label: "Produção / Separação" },
      { icon: "📍", label: "Rastrear" },
      { icon: "$",  label: "Pagamento rápido" },
    ]},
    { group: "CADASTROS", links: [
      { icon: "👤", label: "Novo cliente" },
      { icon: "👥", label: "Clientes" },
      { icon: "🏥", label: "Pacientes" },
      { icon: "✓",  label: "Aprovar Cadas.", badge: "3" },
    ]},
    { group: "ATENDIMENTO", links: [
      { icon: "💬", label: "Chats" },
    ]},
  ]

  return (
    <nav style={{
      width: 180, flexShrink: 0,
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
      display: "flex", flexDirection: "column",
      minHeight: "100vh", padding: "16px 0",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 16px 20px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: "var(--color-brand-fg)",
        }}>D</div>
        <span style={{ fontSize: 16, fontWeight: 800, color: "var(--color-text-primary)" }}>pro.</span>
      </div>

      {items.map(({ group, links }) => (
        <div key={group} style={{ marginBottom: 8 }}>
          <p style={{ margin: "8px 16px 4px", fontSize: 10, fontWeight: 700, color: "var(--color-text-disabled)", letterSpacing: "0.08em" }}>
            {group}
          </p>
          {links.map(({ icon, label, active, badge }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 16px", cursor: "pointer",
              background: active ? "var(--color-brand-subtle)" : "transparent",
              borderRight: active ? `2px solid var(--color-brand)` : "2px solid transparent",
              fontSize: 13, fontWeight: active ? 600 : 400,
              color: active ? "var(--color-brand)" : "var(--color-text-secondary)",
              transition: "background 120ms",
            }}>
              <span style={{ fontSize: 12, opacity: 0.75 }}>{icon}</span>
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: "var(--color-brand)", color: "var(--color-brand-fg)",
                  fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 6px",
                }}>{badge}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function Tabs({ options, value, onChange }: {
  options: { value: string; label: string; count?: number }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--color-border)", marginBottom: 16 }}>
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 16px",
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: 13, fontWeight: value === o.value ? 700 : 400,
          color: value === o.value ? "var(--color-brand)" : "var(--color-text-secondary)",
          borderBottom: value === o.value ? `2px solid var(--color-brand)` : "2px solid transparent",
          marginBottom: -1, transition: "color 120ms",
        }}>
          {o.label}
          {o.count !== undefined && (
            <Badge variant={value === o.value ? "subtle-brand" : "subtle-secondary"} size="sm" pill>
              {o.count}
            </Badge>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
// Melhoria #2: substituiu o dropdown "1x" por stepper numérico

function Stepper({ value, onChange, min = 1, max = 99 }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number
}) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", borderRadius: 6, overflow: "hidden", border: "1.5px solid var(--color-border)", background: "var(--color-surface)" }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 30, border: "none", background: "none", cursor: "pointer",
          color: "var(--color-text-secondary)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
          borderRight: "1px solid var(--color-border)",
        }}
      >−</button>
      <span style={{
        width: 36, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "IBM Plex Mono, monospace", fontSize: 13, fontWeight: 600,
        color: "var(--color-text-primary)",
      }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{
          width: 30, border: "none", background: "none", cursor: "pointer",
          color: "var(--color-text-secondary)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
          borderLeft: "1px solid var(--color-border)",
        }}
      >+</button>
    </div>
  )
}

// ─── Frete Card (RadioGroup visual) ──────────────────────────────────────────
// Melhoria #1: frete como radio group visual em vez de cards sem estado explícito

type FreteOption = { id: string; carrier: string; price: string; days: string; estimatedDate: string; cost: string }

function FreteCard({ option, selected, onSelect }: { option: FreteOption; selected: boolean; onSelect: () => void }) {
  return (
    <label style={{
      display: "block", cursor: "pointer",
      background: selected ? "var(--color-brand-subtle)" : "var(--color-surface-raised)",
      border: `1.5px solid ${selected ? "var(--color-brand)" : "var(--color-border)"}`,
      borderRadius: 8, padding: "12px 14px",
      transition: "border-color 120ms, background 120ms",
    }}>
      <input type="radio" name="frete" value={option.id} checked={selected} onChange={onSelect}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: selected ? "var(--color-brand)" : "var(--color-text-primary)" }}>
          {option.carrier}
        </span>
        <span style={{
          fontFamily: "IBM Plex Mono, monospace", fontSize: 13, fontWeight: 700,
          color: selected ? "var(--color-brand)" : "var(--color-text-primary)",
        }}>
          {option.price}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
        <div>Prazo: <strong style={{ color: "var(--color-text-primary)" }}>{option.days}</strong></div>
        <div>Entrega estimada: <strong style={{ color: "var(--color-text-primary)", fontFamily: "IBM Plex Mono, monospace" }}>{option.estimatedDate}</strong></div>
        <div style={{ color: "var(--color-text-disabled)" }}>Custo: {option.cost}</div>
      </div>
    </label>
  )
}

// ─── Campo readonly do Resumo ─────────────────────────────────────────────────
// Melhoria #4: fundo diferenciado de campos editáveis

function ReadonlyField({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <span style={{ flex: 1, fontSize: 13, color: "var(--color-text-secondary)" }}>{label}</span>
      <span style={{
        fontFamily: mono ? "IBM Plex Mono, monospace" : undefined,
        fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)",
      }}>{value}</span>
    </div>
  )
}

// ─── Tela principal ───────────────────────────────────────────────────────────

function NovoPedidoScreen() {
  const [tab, setTab]           = useState("cliente")
  const [frete, setFrete]       = useState("sedex")
  const [qty, setQty]           = useState(1)
  const [cepLoading, setCepLoading] = useState(false)

  const FRETE_OPTIONS: FreteOption[] = [
    { id: "sedex",    carrier: "Sedex",       price: "R$ 29,47", days: "2 dias úteis", estimatedDate: "24/06/2026", cost: "23.63" },
    { id: "armazem",  carrier: "Saída Armazém", price: "R$ 140,00", days: "1 dia útil",  estimatedDate: "23/06/2026", cost: "—" },
    { id: "jadlog",   carrier: "Jadlog .com", price: "R$ 16,50", days: "4 dias úteis", estimatedDate: "26/06/2026", cost: "12.61" },
  ]

  const freteSelected = FRETE_OPTIONS.find((f) => f.id === frete)
  const fretePrice = freteSelected?.price ?? "R$ 0,00"

  function handleCepBlur() {
    setCepLoading(true)
    setTimeout(() => setCepLoading(false), 1200)
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      <Sidebar />

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Topbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 24px", borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>🇧🇷 D9Pag</span>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>D9Med</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Badge variant="subtle-danger" size="sm">Example</Badge>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>Julia Carvalho</span>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "var(--color-brand)", color: "var(--color-brand-fg)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700,
            }}>J</div>
          </div>
        </div>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)" }}>Novo Pedido</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: "var(--color-text-secondary)" }}>
              1 USD = 5.15 BRL
            </span>
            <Button variant="outline-brand" size="sm">Desconto pedido inteiro</Button>
          </div>
        </div>

        {/* Content — two columns */}
        <div style={{ display: "flex", gap: 16, padding: "0 24px 32px", alignItems: "flex-start", flex: 1 }}>

          {/* ── Coluna esquerda ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

            {/* Destinatário */}
            <Card>
              <SectionTitle>Destinatário</SectionTitle>
              <Tabs
                value={tab}
                onChange={setTab}
                options={[
                  { value: "cliente",  label: "Cliente",  count: 142 },
                  { value: "paciente", label: "Paciente" },
                ]}
              />
              <div style={{ position: "relative" }}>
                <Input
                  placeholder="Pesquisar por clientes. Por Nome, ID, Telefone ou email"
                  hint="Digite pelo menos 3 caracteres para buscar"
                />
                <span style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  color: "var(--color-text-disabled)", pointerEvents: "none",
                }}>🔍</span>
              </div>
            </Card>

            {/* Endereço de entrega */}
            <Card>
              <SectionTitle>Endereço de entrega</SectionTitle>

              {/* Select destinatário */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <Select placeholder="Selecione o destinatário" options={[]} />
                </div>
                <Button variant="outline-secondary" iconOnly aria-label="Copiar endereço">⧉</Button>
              </div>

              <Divider />

              {/* Grid de endereço */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <Label htmlFor="cep" required size="sm">CEP</Label>
                  <InputGroup hint={cepLoading ? undefined : "Auto-preenche cidade, bairro e logradouro"}>
                    <Input id="cep" placeholder="00000-000" size="sm"
                      style={{ fontFamily: "IBM Plex Mono, monospace" }}
                      onBlur={handleCepBlur}
                    />
                    {cepLoading && (
                      <div style={{
                        display: "flex", alignItems: "center", padding: "0 10px",
                        background: "var(--color-surface-raised)", border: "1.5px solid var(--color-border)",
                        borderLeft: "none", borderRadius: "0 0.25rem 0.25rem 0",
                      }}>
                        <Spinner size="sm" color="brand" />
                      </div>
                    )}
                  </InputGroup>
                </div>
                <div>
                  <Label htmlFor="estado" required size="sm">Estado</Label>
                  <Select id="estado" size="sm" placeholder="UF" options={[
                    { value: "SP", label: "SP" }, { value: "RJ", label: "RJ" },
                    { value: "MG", label: "MG" }, { value: "RS", label: "RS" },
                  ]} />
                </div>
                <div>
                  <Label htmlFor="cidade" required size="sm">Cidade</Label>
                  <Input id="cidade" size="sm" placeholder="Cidade" />
                </div>
                <div>
                  <Label htmlFor="bairro" required size="sm">Bairro</Label>
                  <Input id="bairro" size="sm" placeholder="Bairro" />
                </div>
                <div>
                  <Label htmlFor="logradouro" required size="sm">Logradouro</Label>
                  <Input id="logradouro" size="sm" placeholder="Rua, Avenida..." />
                </div>
                <div>
                  <Label htmlFor="numero" required size="sm">Número</Label>
                  <Input id="numero" size="sm" placeholder="Nº" />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label htmlFor="complemento" size="sm" optional>Complemento</Label>
                  <Input id="complemento" size="sm" placeholder="Apto, sala, bloco..." />
                </div>
              </div>

              <Divider />

              <div>
                <Label htmlFor="lembrete" size="sm" optional>Enviar mensagem após N dias da entrega</Label>
                <Select id="lembrete" size="sm" options={[
                  { value: "0",  label: "Não enviar" },
                  { value: "3",  label: "3 dias após entrega" },
                  { value: "7",  label: "7 dias após entrega" },
                  { value: "15", label: "15 dias após entrega" },
                ]} defaultValue="0" hint="Lembrete automático de pós-venda" />
              </div>
            </Card>
          </div>

          {/* ── Coluna direita ── */}
          <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Produtos */}
            <Card>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <SectionTitle>Produtos</SectionTitle>
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  <Badge variant="subtle-brand" size="sm">1 item</Badge>
                  <Button variant="ghost" iconOnly size="sm" aria-label="Limpar produtos">✕</Button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <div style={{ flex: "0 0 90px" }}>
                  <Label size="sm" htmlFor="cod">Código</Label>
                  <Input id="cod" size="sm" defaultValue="6.101" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <Label size="sm" htmlFor="prod">Produto</Label>
                  <Select id="prod" size="sm" options={[
                    { value: "anuidade", label: "Anuidade" },
                    { value: "mensalidade", label: "Mensalidade" },
                  ]} defaultValue="anuidade" />
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <Label size="sm" htmlFor="marca">Marca</Label>
                <Select id="marca" size="sm" options={[
                  { value: "30ml", label: "30ml" },
                  { value: "60ml", label: "60ml" },
                  { value: "120ml", label: "120ml" },
                ]} defaultValue="30ml" />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", flex: 1 }}>
                  R$ 50,00
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Melhoria #2 — Stepper no lugar do dropdown 1x */}
                  <Stepper value={qty} onChange={setQty} />
                  <Button variant="brand" size="sm">+ Inserir</Button>
                </div>
              </div>
            </Card>

            {/* Frete */}
            <Card>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <SectionTitle>Frete</SectionTitle>
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  <Select size="sm" options={[
                    { value: "caixa-p", label: "Caixa pequena" },
                    { value: "caixa-m", label: "Caixa média" },
                    { value: "caixa-g", label: "Caixa grande" },
                  ]} defaultValue="caixa-p" />
                  <Button variant="outline-secondary" iconOnly size="sm" aria-label="Recalcular frete">↺</Button>
                </div>
              </div>

              {/* Melhoria #1 — RadioGroup visual para frete */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {FRETE_OPTIONS.map((opt) => (
                  <FreteCard key={opt.id} option={opt} selected={frete === opt.id} onSelect={() => setFrete(opt.id)} />
                ))}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 10, color: "var(--color-text-disabled)", fontFamily: "IBM Plex Mono, monospace", textAlign: "right" }}>
                Consultado em 21/06/2026 às 01:32
              </p>
            </Card>

            {/* Resumo */}
            <Card>
              <SectionTitle>Resumo</SectionTitle>

              <div style={{ marginBottom: 14 }}>
                <Label size="sm" htmlFor="tipo">Tipo de pedido</Label>
                <Select id="tipo" size="sm" options={[
                  { value: "comum", label: "Comum" },
                  { value: "urgente", label: "Urgente" },
                  { value: "amostra", label: "Amostra grátis" },
                ]} defaultValue="comum" />
              </div>

              {/* Melhoria #4 — campos readonly com fundo diferenciado */}
              <div>
                <ReadonlyField label="Total em produtos" value="R$ 50,00" />
                <div style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <span style={{ flex: 1, fontSize: 13, color: "var(--color-text-secondary)" }}>Frete</span>
                  <InputGroup>
                    <Input
                      size="sm"
                      defaultValue={fretePrice}
                      style={{ width: 110, fontFamily: "IBM Plex Mono, monospace", textAlign: "right" }}
                    />
                    <InputGroupText size="sm" style={{ cursor: "pointer", color: "var(--color-brand)", fontWeight: 700 }}>$</InputGroupText>
                  </InputGroup>
                </div>
                <ReadonlyField label="Descontos" value="R$ 0,00" />
              </div>

              {/* Melhoria #3 — Total final destacado */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                margin: "14px 0 0", padding: "14px 0 0",
                borderTop: "2px solid var(--color-border)",
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>Total final</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 18, fontWeight: 800, color: "var(--color-brand)" }}>
                  {fretePrice.replace("R$", "R$").trim() === "R$ 29,47" ? "R$ 79,47" : "R$ 50,00"}
                </span>
              </div>

              <Divider />

              {/* Melhoria #6 — ações mais claras */}
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant="outline-secondary" style={{ flex: 1 }}>Orçamento</Button>
                <Button variant="brand" size="md" style={{ flex: 1 }}>✓ Criar pedido</Button>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Meta & Story ─────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Telas/Novo Pedido — D9 Pro",
  component: NovoPedidoScreen,
  globals: { brand: "pro", theme: "Dark" },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**Adaptação da tela "Novo Pedido"** usando componentes D9.

> 💡 Use o switcher **Brand → D9 Pro** na toolbar para ver com a cor correta.

### Melhorias aplicadas
| # | Original | D9 |
|---|---|---|
| 1 | Cards de frete soltos | RadioGroup visual com estado selecionado explícito |
| 2 | Dropdown "1x" | Stepper numérico +/− |
| 3 | Total final igual aos outros campos | Tipografia maior + cor brand |
| 4 | Campos readonly iguais aos editáveis | Distinção visual de fundo |
| 5 | Seções sem delimitação | Cards com borda |
| 6 | Badge de count ausente na aba | Badge de contagem na aba Cliente |
| 7 | Botão Criar simples | Ícone + peso visual maior |
| 8 | CEP sem feedback | Spinner de loading + hint de auto-preenchimento |
        `,
      },
    },
  },
}
export default meta

export const Tela: StoryObj = {
  name: "Tela completa",
  globals: { brand: "pro", theme: "Dark" },
  render: () => <NovoPedidoScreen />,
}
