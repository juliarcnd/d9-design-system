/**
 * Tela "Novo Pedido" — D9 Pro
 * Fluxo em passos estilo e-commerce (Mercado Livre / iFood checkout pattern)
 * Brand travado em Pro + Dark.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Label }     from "../../src/components/Label"
import { Input }     from "../../src/components/Input"
import { Select }    from "../../src/components/Select"
import { Button }    from "../../src/components/Button"
import { Badge }     from "../../src/components/Badge"
import { Spinner }   from "../../src/components/Spinner"
import { Alert }     from "../../src/components/Alert"
import { InputGroup, InputGroupText } from "../../src/components/InputGroup"

// ─── Ícones SVG (fiéis ao original) ──────────────────────────────────────────

const IC = {
  NovoPedido: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  ),
  TodosPedidos: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  Visao: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Producao: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  Rastrear: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Pagamento: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  NovoCliente: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  ),
  Clientes: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Pacientes: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 11v4"/><path d="M10 13h4"/>
    </svg>
  ),
  Aprovar: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>
    </svg>
  ),
  Chat: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Copy: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  Truck: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  File: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Trash: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Package: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 10, padding: "20px 24px", ...style }}>
      {children}
    </div>
  )
}
function Divider({ style }: { style?: React.CSSProperties }) {
  return <div style={{ borderTop: "1px solid var(--color-border-subtle)", margin: "16px 0", ...style }} />
}
function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", ...style }}>{children}</h3>
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ collapsed }: { collapsed: boolean }) {

  const groups = [
    { label: "PEDIDOS", items: [
      { icon: <IC.NovoPedido />,    label: "Novo pedido",          active: true },
      { icon: <IC.TodosPedidos />,  label: "Todos pedidos" },
      { icon: <IC.Visao />,         label: "Visão geral" },
      { icon: <IC.Producao />,      label: "Produção / Separação" },
      { icon: <IC.Rastrear />,      label: "Rastrear" },
      { icon: <IC.Pagamento />,     label: "Pagamento rápido" },
    ]},
    { label: "CADASTROS", items: [
      { icon: <IC.NovoCliente />,   label: "Novo cliente" },
      { icon: <IC.Clientes />,      label: "Clientes" },
      { icon: <IC.Pacientes />,     label: "Pacientes" },
      { icon: <IC.Aprovar />,       label: "Aprovar Cadas.", badge: "3" },
    ]},
    { label: "ATENDIMENTO", items: [
      { icon: <IC.Chat />,          label: "Chats" },
    ]},
  ]

  const w = collapsed ? 52 : 188

  return (
    <nav style={{
      width: w, flexShrink: 0,
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
      display: "flex", flexDirection: "column",
      minHeight: "100vh", padding: "14px 0",
      transition: "width 220ms ease", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 14px 18px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--color-brand-fg)", flexShrink: 0 }}>D</div>
        {!collapsed && <span style={{ fontSize: 15, fontWeight: 800, color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>pro.</span>}
      </div>

      {/* Itens */}
      {groups.map(({ label, items }) => (
        <div key={label} style={{ marginBottom: 4 }}>
          {!collapsed && (
            <p style={{ margin: "10px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--color-text-disabled)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
              {label}
            </p>
          )}
          {collapsed && <div style={{ height: 10 }} />}

          {items.map(({ icon, label: lbl, active, badge }) => (
            <div
              key={lbl}
              title={collapsed ? lbl : undefined}
              style={{
                display: "flex", alignItems: "center",
                gap: collapsed ? 0 : 9,
                padding: collapsed ? "9px 0" : "7px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                cursor: "pointer",
                background: active ? "var(--color-brand-subtle)" : "transparent",
                borderRight: `2px solid ${active ? "var(--color-brand)" : "transparent"}`,
                fontSize: 12.5, fontWeight: active ? 600 : 400,
                color: active ? "var(--color-brand)" : "var(--color-text-secondary)",
                transition: "background 100ms",
                position: "relative",
              }}
            >
              <span style={{ flexShrink: 0, opacity: active ? 1 : 0.65 }}>{icon}</span>
              {!collapsed && <span style={{ flex: 1, whiteSpace: "nowrap" }}>{lbl}</span>}
              {!collapsed && badge && (
                <span style={{ background: "var(--color-brand)", color: "var(--color-brand-fg)", fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 6px" }}>
                  {badge}
                </span>
              )}
              {collapsed && badge && (
                <span style={{
                  position: "absolute", top: 4, right: 6,
                  background: "var(--color-brand)", color: "var(--color-brand-fg)",
                  fontSize: 9, fontWeight: 700, borderRadius: 9999, padding: "1px 4px", lineHeight: 1.4,
                }}>
                  {badge}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  )
}

// ─── Stepper de progresso ─────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Destinatário" },
  { id: 2, label: "Endereço" },
  { id: 3, label: "Produtos" },
  { id: 4, label: "Entrega" },
  { id: 5, label: "Confirmação" },
]

function StepBar({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {STEPS.map((step, i) => {
        const done    = step.id < current
        const active  = step.id === current
        const pending = step.id > current
        return (
          <React.Fragment key={step.id}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "IBM Plex Mono, monospace", fontSize: 12, fontWeight: 700,
                background: done ? "var(--color-brand)" : active ? "var(--color-brand-subtle)" : "var(--color-surface-raised)",
                border: `2px solid ${done || active ? "var(--color-brand)" : "var(--color-border)"}`,
                color: done ? "var(--color-brand-fg)" : active ? "var(--color-brand)" : "var(--color-text-disabled)",
                transition: "all 200ms",
              }}>
                {done ? <IC.Check /> : step.id}
              </div>
              <span style={{ fontSize: 11, fontWeight: active ? 700 : 400, color: active ? "var(--color-brand)" : done ? "var(--color-text-secondary)" : "var(--color-text-disabled)", whiteSpace: "nowrap" }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: step.id < current ? "var(--color-brand)" : "var(--color-border)", margin: "0 6px", marginBottom: 22, transition: "background 300ms" }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

function Tabs({ options, value, onChange }: { options: { value: string; label: string; count?: number }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", marginBottom: 16 }}>
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 16px", background: "none", border: "none", cursor: "pointer",
          fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13,
          fontWeight: value === o.value ? 700 : 400,
          color: value === o.value ? "var(--color-brand)" : "var(--color-text-secondary)",
          borderBottom: `2px solid ${value === o.value ? "var(--color-brand)" : "transparent"}`,
          marginBottom: -1, transition: "color 120ms",
        }}>
          {o.label}
          {o.count !== undefined && <Badge variant={value === o.value ? "subtle-brand" : "subtle-secondary"} size="sm" pill>{o.count}</Badge>}
        </button>
      ))}
    </div>
  )
}

// ─── Stepper numérico ────────────────────────────────────────────────────────

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "stretch", borderRadius: 6, overflow: "hidden", border: "1.5px solid var(--color-border)" }}>
      {["−", String(value), "+"].map((v, i) => (
        <button key={i} onClick={() => i === 0 ? onChange(Math.max(1, value - 1)) : i === 2 ? onChange(value + 1) : undefined}
          style={{
            width: i === 1 ? 38 : 28, border: "none", background: i === 1 ? "var(--color-surface)" : "var(--color-surface-raised)",
            borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
            cursor: i === 1 ? "default" : "pointer",
            fontFamily: i === 1 ? "IBM Plex Mono, monospace" : undefined,
            fontSize: i === 1 ? 13 : 16, fontWeight: 600,
            color: "var(--color-text-primary)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
          {v}
        </button>
      ))}
    </div>
  )
}

// ─── Frete card ──────────────────────────────────────────────────────────────

type FreteOpt = { id: string; carrier: string; price: string; days: string; date: string; cost: string }

function FreteCard({ opt, selected, onSelect }: { opt: FreteOpt; selected: boolean; onSelect: () => void }) {
  return (
    <label style={{
      display: "block", cursor: "pointer",
      background: selected ? "var(--color-brand-subtle)" : "var(--color-surface-raised)",
      border: `1.5px solid ${selected ? "var(--color-brand)" : "var(--color-border)"}`,
      borderRadius: 8, padding: "12px 14px", transition: "border-color 120ms, background 120ms",
    }}>
      <input type="radio" name="frete" value={opt.id} checked={selected} onChange={onSelect} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: selected ? "var(--color-brand)" : "var(--color-text-primary)" }}>{opt.carrier}</span>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 14, fontWeight: 800, color: selected ? "var(--color-brand)" : "var(--color-text-primary)" }}>{opt.price}</span>
      </div>
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
        Prazo: <b style={{ color: "var(--color-text-primary)" }}>{opt.days}</b> · Estimativa: <b style={{ color: "var(--color-text-primary)", fontFamily: "IBM Plex Mono, monospace" }}>{opt.date}</b>
        <br /><span style={{ color: "var(--color-text-disabled)" }}>Custo real: {opt.cost}</span>
      </div>
    </label>
  )
}

// ─── Linha de resumo readonly ─────────────────────────────────────────────────

function ResumoLine({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <span style={{ fontSize: 13, color: highlight ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: highlight ? 700 : 400 }}>{label}</span>
      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: highlight ? 16 : 13, fontWeight: highlight ? 800 : 600, color: highlight ? "var(--color-brand)" : "var(--color-text-primary)" }}>{value}</span>
    </div>
  )
}

// ─── Passos ───────────────────────────────────────────────────────────────────

function Step1({ tab, setTab, selectedClient, setSelectedClient }: {
  tab: string; setTab: (v: string) => void
  selectedClient: string; setSelectedClient: (v: string) => void
}) {
  const CLIENTES = ["Maria Souza · (11) 98877-6655", "João Faria · (21) 91234-5678", "Ana Beatriz · (31) 97654-3210"]
  return (
    <Card>
      <SectionTitle>Quem vai receber?</SectionTitle>
      <Tabs value={tab} onChange={setTab} options={[{ value: "cliente", label: "Cliente", count: 142 }, { value: "paciente", label: "Paciente" }]} />
      <div style={{ position: "relative" }}>
        <Input placeholder="Buscar por nome, ID, telefone ou e-mail" hint="Digite pelo menos 3 caracteres" />
        <span style={{ position: "absolute", right: 10, top: 10, color: "var(--color-text-disabled)", pointerEvents: "none" }}><IC.Search /></span>
      </div>
      {/* Sugestões */}
      {selectedClient === "" && (
        <div style={{ marginTop: 10, background: "var(--color-surface-raised)", border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
          {CLIENTES.map((c) => (
            <div key={c} onClick={() => setSelectedClient(c)} style={{
              padding: "10px 14px", cursor: "pointer", fontSize: 13,
              color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border-subtle)",
              display: "flex", alignItems: "center", gap: 8, transition: "background 100ms",
            }}>
              <IC.Clientes />
              {c}
              <IC.ChevronRight />
            </div>
          ))}
        </div>
      )}
      {/* Cliente selecionado */}
      {selectedClient && (
        <div style={{ marginTop: 12, background: "var(--color-brand-subtle)", border: "1.5px solid var(--color-brand-border)", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-brand-fg)", fontSize: 13, fontWeight: 700 }}>
            {selectedClient[0]}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>{selectedClient.split(" · ")[0]}</p>
            <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-secondary)", fontFamily: "IBM Plex Mono, monospace" }}>{selectedClient.split(" · ")[1]}</p>
          </div>
          <Button variant="ghost" size="sm" iconOnly onClick={() => setSelectedClient("")} aria-label="Remover"><IC.Trash /></Button>
        </div>
      )}
    </Card>
  )
}

function Step2({ cepLoading, setCepLoading }: { cepLoading: boolean; setCepLoading: (v: boolean) => void }) {
  return (
    <Card>
      <SectionTitle>Para onde vai?</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <Select placeholder="Usar endereço salvo do cliente" options={[{ value: "1", label: "Rua das Flores, 123 — São Paulo/SP" }, { value: "2", label: "Av. Brasil, 456 — Rio de Janeiro/RJ" }]} hint="Preenche o formulário automaticamente" />
        </div>
        <Button variant="outline-secondary" iconOnly aria-label="Copiar"><IC.Copy /></Button>
      </div>
      <Divider />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <Label htmlFor="cep" required size="sm">CEP</Label>
          <InputGroup hint={cepLoading ? "Buscando endereço..." : "Auto-preenche os campos abaixo"}>
            <Input id="cep" size="sm" placeholder="00000-000" style={{ fontFamily: "IBM Plex Mono, monospace" }} onBlur={() => { setCepLoading(true); setTimeout(() => setCepLoading(false), 1200) }} />
            {cepLoading && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 10px", background: "var(--color-surface-raised)", border: "1.5px solid var(--color-border)", borderLeft: "none", borderRadius: "0 0.25rem 0.25rem 0" }}>
                <Spinner size="sm" color="brand" />
              </div>
            )}
          </InputGroup>
        </div>
        <div>
          <Label htmlFor="estado" required size="sm">Estado</Label>
          <Select id="estado" size="sm" placeholder="UF" options={["SP","RJ","MG","RS","PR","SC","BA"].map((v) => ({ value: v, label: v }))} />
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
          <Input id="logradouro" size="sm" placeholder="Rua, Av., Travessa..." />
        </div>
        <div>
          <Label htmlFor="numero" required size="sm">Número</Label>
          <Input id="numero" size="sm" placeholder="Nº" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Label htmlFor="complemento" size="sm" optional>Complemento</Label>
          <Input id="complemento" size="sm" placeholder="Apto, bloco, sala..." />
        </div>
      </div>
    </Card>
  )
}

function Step3({ items, setItems }: { items: { name: string; qty: number; price: number }[]; setItems: (v: { name: string; qty: number; price: number }[]) => void }) {
  const [qty, setQty] = useState(1)
  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0)
  return (
    <Card>
      <SectionTitle>Quais produtos?</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 88, flexShrink: 0 }}>
          <Label size="sm">Código</Label>
          <Input size="sm" placeholder="6.101" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
        </div>
        <div style={{ flex: 1 }}>
          <Label size="sm">Produto</Label>
          <Select size="sm" placeholder="Selecione..." options={[{ value: "anuidade", label: "Anuidade" }, { value: "mensalidade", label: "Mensalidade" }, { value: "avulso", label: "Consulta avulsa" }]} />
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Label size="sm">Marca / Variante</Label>
        <Select size="sm" options={[{ value: "30ml", label: "30ml" }, { value: "60ml", label: "60ml" }, { value: "120ml", label: "120ml" }]} defaultValue="30ml" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 16, fontWeight: 800, color: "var(--color-text-primary)", flex: 1 }}>R$ 50,00</span>
        <Stepper value={qty} onChange={setQty} />
        <Button variant="brand" size="sm" onClick={() => setItems([...items, { name: "Anuidade 30ml", qty, price: 50 }])}>+ Inserir</Button>
      </div>

      {items.length > 0 && (
        <>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--color-surface-raised)", borderRadius: 7, border: "1px solid var(--color-border-subtle)" }}>
                <IC.Package />
                <span style={{ flex: 1, fontSize: 12, color: "var(--color-text-primary)" }}>{it.name}</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "var(--color-text-secondary)" }}>×{it.qty}</span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)" }}>R$ {(it.qty * it.price).toFixed(2).replace(".", ",")}</span>
                <button onClick={() => setItems(items.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-error)", display: "flex", padding: 2 }}><IC.Trash /></button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Subtotal: </span>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginLeft: 8 }}>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
          </div>
        </>
      )}
    </Card>
  )
}

function Step4({ frete, setFrete }: { frete: string; setFrete: (v: string) => void }) {
  const OPTS: FreteOpt[] = [
    { id: "sedex",   carrier: "Sedex",         price: "R$ 29,47", days: "2 dias úteis", date: "24/06/2026", cost: "23.63" },
    { id: "armazem", carrier: "Saída Armazém", price: "R$ 140,00", days: "1 dia útil",  date: "23/06/2026", cost: "—" },
    { id: "jadlog",  carrier: "Jadlog .com",   price: "R$ 16,50", days: "4 dias úteis", date: "26/06/2026", cost: "12.61" },
  ]
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <SectionTitle style={{ marginBottom: 0 }}>Como vai chegar?</SectionTitle>
        <div style={{ display: "flex", gap: 6 }}>
          <Select size="sm" options={[{ value: "p", label: "Caixa pequena" }, { value: "m", label: "Caixa média" }, { value: "g", label: "Caixa grande" }]} defaultValue="p" />
          <Button variant="outline-secondary" iconOnly size="sm" aria-label="Recalcular"><IC.Refresh /></Button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {OPTS.map((o) => <FreteCard key={o.id} opt={o} selected={frete === o.id} onSelect={() => setFrete(o.id)} />)}
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 10, color: "var(--color-text-disabled)", fontFamily: "IBM Plex Mono, monospace", textAlign: "right" }}>
        Consultado em 21/06/2026 às 01:32
      </p>
    </Card>
  )
}

function Step5({ items, frete, selectedClient }: { items: { name: string; qty: number; price: number }[]; frete: string; selectedClient: string }) {
  const FRETE_PRICES: Record<string, number> = { sedex: 29.47, armazem: 140, jadlog: 16.5 }
  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0)
  const freteVal = FRETE_PRICES[frete] ?? 0
  const total = subtotal + freteVal

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Resumo dos passos anteriores */}
      {selectedClient && (
        <Alert variant="success" title="Destinatário confirmado">{selectedClient.split(" · ")[0]}</Alert>
      )}

      <Card>
        <SectionTitle>Revisão do pedido</SectionTitle>

        {items.length === 0 && (
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Nenhum produto adicionado. Volte ao passo Produtos.</p>
        )}
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--color-border-subtle)", fontSize: 13 }}>
            <span style={{ color: "var(--color-text-primary)" }}>{it.name} <span style={{ color: "var(--color-text-disabled)" }}>×{it.qty}</span></span>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 600 }}>R$ {(it.qty * it.price).toFixed(2).replace(".", ",")}</span>
          </div>
        ))}

        <Divider />

        <div style={{ marginBottom: 14 }}>
          <Label size="sm" htmlFor="tipo">Tipo de pedido</Label>
          <Select id="tipo" size="sm" options={[{ value: "comum", label: "Comum" }, { value: "urgente", label: "Urgente" }, { value: "amostra", label: "Amostra grátis" }]} defaultValue="comum" />
        </div>

        <div style={{ marginBottom: 14 }}>
          <Label size="sm" htmlFor="lembrete" optional>Lembrete pós-entrega</Label>
          <Select id="lembrete" size="sm" options={[{ value: "0", label: "Não enviar" }, { value: "3", label: "3 dias após entrega" }, { value: "7", label: "7 dias após entrega" }]} defaultValue="0" />
        </div>

        <Divider />

        <ResumoLine label="Subtotal produtos" value={`R$ ${subtotal.toFixed(2).replace(".", ",")}`} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Frete ({frete})</span>
          <InputGroup>
            <Input size="sm" defaultValue={`R$ ${freteVal.toFixed(2).replace(".", ",")}`} style={{ width: 110, fontFamily: "IBM Plex Mono, monospace", textAlign: "right" }} />
            <InputGroupText size="sm" style={{ fontWeight: 700, color: "var(--color-brand)", cursor: "pointer" }}>$</InputGroupText>
          </InputGroup>
        </div>
        <ResumoLine label="Descontos" value="R$ 0,00" />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 0", marginTop: 4, borderTop: "2px solid var(--color-border)" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)" }}>Total final</span>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 20, fontWeight: 800, color: "var(--color-brand)" }}>
            R$ {total.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </Card>
    </div>
  )
}

// ─── Tela principal ───────────────────────────────────────────────────────────

function NovoPedidoScreen() {
  const [step, setStep]           = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [tab, setTab]             = useState("cliente")
  const [selectedClient, setSelectedClient] = useState("")
  const [frete, setFrete]         = useState("")
  const [items, setItems]         = useState<{ name: string; qty: number; price: number }[]>([])
  const [cepLoading, setCepLoading] = useState(false)

  function canAdvance() {
    if (step === 1) return selectedClient !== ""
    if (step === 3) return items.length > 0
    return true
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      <Sidebar collapsed={!sidebarOpen} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Toggle sidebar */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 5, borderRadius: 6,
                color: "var(--color-text-secondary)", display: "flex", alignItems: "center",
                transition: "background 120ms",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>🇧🇷 D9Pag</span>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>D9Med</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Badge variant="subtle-danger" size="sm">Example</Badge>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>Julia Carvalho</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--color-brand)", color: "var(--color-brand-fg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>J</div>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ flex: 1, padding: "24px 32px", maxWidth: 760, width: "100%" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)" }}>Novo Pedido</h1>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: "var(--color-text-secondary)", alignSelf: "center" }}>1 USD = 5.15 BRL</span>
              <Button variant="outline-brand" size="sm">Desconto pedido inteiro</Button>
            </div>
          </div>

          {/* Barra de passos */}
          <StepBar current={step} />

          {/* Conteúdo do passo */}
          <div style={{ marginBottom: 24 }}>
            {step === 1 && <Step1 tab={tab} setTab={setTab} selectedClient={selectedClient} setSelectedClient={setSelectedClient} />}
            {step === 2 && <Step2 cepLoading={cepLoading} setCepLoading={setCepLoading} />}
            {step === 3 && <Step3 items={items} setItems={setItems} />}
            {step === 4 && <Step4 frete={frete} setFrete={setFrete} />}
            {step === 5 && <Step5 items={items} frete={frete} selectedClient={selectedClient} />}
          </div>

          {/* Aviso se não pode avançar */}
          {!canAdvance() && step === 1 && (
            <Alert variant="info" style={{ marginBottom: 16 }}>
              Selecione um cliente ou paciente para continuar.
            </Alert>
          )}
          {!canAdvance() && step === 3 && (
            <Alert variant="info" style={{ marginBottom: 16 }}>
              Adicione pelo menos um produto para continuar.
            </Alert>
          )}

          {/* Navegação entre passos */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <Button variant="outline-secondary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
              ← Voltar
            </Button>
            <div style={{ display: "flex", gap: 10 }}>
              {step === 5 ? (
                <>
                  <Button variant="outline-secondary"><IC.File /> Orçamento</Button>
                  <Button variant="brand" size="md"><IC.Check /> Criar pedido</Button>
                </>
              ) : (
                <Button variant="brand" onClick={() => setStep(Math.min(5, step + 1))} disabled={!canAdvance()}>
                  Continuar → <IC.ChevronRight />
                </Button>
              )}
            </div>
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
  parameters: { layout: "fullscreen" },
}
export default meta

export const Tela: StoryObj = {
  name: "Tela completa (fluxo em passos)",
  globals: { brand: "pro", theme: "Dark" },
  render: () => <NovoPedidoScreen />,
}
