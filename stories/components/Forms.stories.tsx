import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Label }      from "../../src/components/Label"
import { Input }      from "../../src/components/Input"
import { Textarea }   from "../../src/components/Textarea"
import { Select }     from "../../src/components/Select"
import { Checkbox }   from "../../src/components/Checkbox"
import { Radio, RadioGroup } from "../../src/components/Radio"
import { InputGroup, InputGroupText } from "../../src/components/InputGroup"
import { Button }     from "../../src/components/Button"

// ─── helpers ─────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border)", paddingBottom: 10 }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>{children}</div>
    </section>
  )
}
function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
      {label && (
        <span style={{ width: 130, flexShrink: 0, paddingTop: 6, fontSize: 11, color: "var(--color-text-disabled)", fontFamily: "IBM Plex Mono, monospace" }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 200, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  )
}
function Col({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ flex: 1, minWidth: 200, ...style }}>{children}</div>
}

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: "Components/Forms",
  parameters: { layout: "fullscreen" },
}
export default meta

// ══════════════════════════════════════════════════════════════════════════════
// Label
// ══════════════════════════════════════════════════════════════════════════════
export const Labels: StoryObj = {
  name: "Label",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Label">
        <Row label="Default"><Label>Nome completo</Label></Row>
        <Row label="Required"><Label required>E-mail</Label></Row>
        <Row label="Optional"><Label optional>Apelido</Label></Row>
        <Row label="Sizes">
          <Label size="sm">Small label</Label>
          <Label size="md">Medium label</Label>
          <Label size="lg">Large label</Label>
        </Row>
      </Section>
    </div>
  ),
}

// ══════════════════════════════════════════════════════════════════════════════
// Input
// ══════════════════════════════════════════════════════════════════════════════
export const Inputs: StoryObj = {
  name: "Input",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Input — Tamanhos">
        <Row label="sm">
          <Col><Label size="sm" htmlFor="i-sm">Nome</Label><Input id="i-sm" size="sm" placeholder="Tamanho sm" /></Col>
        </Row>
        <Row label="md">
          <Col><Label htmlFor="i-md">Nome</Label><Input id="i-md" size="md" placeholder="Tamanho md (padrão)" /></Col>
        </Row>
        <Row label="lg">
          <Col><Label size="lg" htmlFor="i-lg">Nome</Label><Input id="i-lg" size="lg" placeholder="Tamanho lg" /></Col>
        </Row>
      </Section>

      <Section title="Input — Estados">
        <Row label="Default">
          <Col><Label htmlFor="i-def">CPF</Label><Input id="i-def" placeholder="000.000.000-00" /></Col>
        </Row>
        <Row label="Valid">
          <Col>
            <Label htmlFor="i-val">E-mail</Label>
            <Input id="i-val" state="valid" defaultValue="julia@d9.com" feedbackMsg="E-mail disponível" />
          </Col>
        </Row>
        <Row label="Invalid">
          <Col>
            <Label htmlFor="i-inv" required>Senha</Label>
            <Input id="i-inv" type="password" state="invalid" defaultValue="123" feedbackMsg="Mínimo 8 caracteres" />
          </Col>
        </Row>
        <Row label="Disabled">
          <Col><Label htmlFor="i-dis">Código</Label><Input id="i-dis" disabled defaultValue="D9-PRO-2026" /></Col>
        </Row>
        <Row label="Readonly">
          <Col><Label htmlFor="i-ro">ID da conta</Label><Input id="i-ro" readOnly defaultValue="ACC-00491827" /></Col>
        </Row>
        <Row label="With hint">
          <Col>
            <Label htmlFor="i-hint">Webhook URL</Label>
            <Input id="i-hint" placeholder="https://meusite.com/webhook" hint="Receberá os eventos POST do D9 Pag" />
          </Col>
        </Row>
      </Section>

      <Section title="Input — Tipos">
        {([
          { type: "text",     label: "Text",     placeholder: "Texto livre" },
          { type: "email",    label: "Email",    placeholder: "user@empresa.com" },
          { type: "password", label: "Password", placeholder: "••••••••" },
          { type: "number",   label: "Number",   placeholder: "0" },
          { type: "search",   label: "Search",   placeholder: "Buscar transação..." },
          { type: "tel",      label: "Tel",      placeholder: "(11) 99999-9999" },
          { type: "url",      label: "URL",      placeholder: "https://" },
          { type: "date",     label: "Date",     placeholder: "" },
        ] as const).map(({ type, label, placeholder }) => (
          <Row key={type} label={type}>
            <Col><Label htmlFor={`i-${type}`}>{label}</Label><Input id={`i-${type}`} type={type} placeholder={placeholder} /></Col>
          </Row>
        ))}
      </Section>
    </div>
  ),
}

// ══════════════════════════════════════════════════════════════════════════════
// Textarea
// ══════════════════════════════════════════════════════════════════════════════
export const Textareas: StoryObj = {
  name: "Textarea",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Textarea">
        <Row label="Default">
          <Col>
            <Label htmlFor="ta-def">Descrição</Label>
            <Textarea id="ta-def" placeholder="Descreva o serviço contratado..." rows={3} />
          </Col>
        </Row>
        <Row label="Valid">
          <Col>
            <Label htmlFor="ta-val">Observações</Label>
            <Textarea id="ta-val" state="valid" defaultValue="Entrega no endereço comercial." feedbackMsg="Tudo certo!" rows={3} />
          </Col>
        </Row>
        <Row label="Invalid">
          <Col>
            <Label htmlFor="ta-inv" required>Motivo</Label>
            <Textarea id="ta-inv" state="invalid" feedbackMsg="Campo obrigatório" rows={3} />
          </Col>
        </Row>
        <Row label="Disabled">
          <Col>
            <Label htmlFor="ta-dis">Histórico</Label>
            <Textarea id="ta-dis" disabled defaultValue="Aprovado em 20/06/2026 por admin@d9.com" rows={3} />
          </Col>
        </Row>
        <Row label="No resize">
          <Col>
            <Label htmlFor="ta-nrs">Mensagem</Label>
            <Textarea id="ta-nrs" noResize placeholder="Digite sua mensagem..." rows={4} hint="Máximo 500 caracteres" />
          </Col>
        </Row>
      </Section>
    </div>
  ),
}

// ══════════════════════════════════════════════════════════════════════════════
// Select
// ══════════════════════════════════════════════════════════════════════════════
const PLANOS = [
  { value: "free",  label: "Free — R$ 0/mês" },
  { value: "pro",   label: "Pro — R$ 49/mês" },
  { value: "ultra", label: "Ultra — R$ 149/mês" },
  { value: "ent",   label: "Enterprise — sob consulta", disabled: true },
]

export const Selects: StoryObj = {
  name: "Select",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Select — Tamanhos">
        <Row label="sm"><Col><Label size="sm" htmlFor="s-sm">Plano</Label><Select id="s-sm" size="sm" options={PLANOS} placeholder="Selecione..." /></Col></Row>
        <Row label="md"><Col><Label htmlFor="s-md">Plano</Label><Select id="s-md" size="md" options={PLANOS} placeholder="Selecione..." /></Col></Row>
        <Row label="lg"><Col><Label size="lg" htmlFor="s-lg">Plano</Label><Select id="s-lg" size="lg" options={PLANOS} placeholder="Selecione..." /></Col></Row>
      </Section>

      <Section title="Select — Estados">
        <Row label="Default"><Col><Label htmlFor="s-def">País</Label><Select id="s-def" options={[{ value: "br", label: "Brasil" }, { value: "us", label: "EUA" }]} placeholder="Selecione..." /></Col></Row>
        <Row label="Valid"><Col><Label htmlFor="s-val">Moeda</Label><Select id="s-val" state="valid" feedbackMsg="Moeda suportada" defaultValue="brl" options={[{ value: "brl", label: "BRL — Real Brasileiro" }, { value: "usd", label: "USD — Dólar" }]} /></Col></Row>
        <Row label="Invalid"><Col><Label htmlFor="s-inv" required>Categoria</Label><Select id="s-inv" state="invalid" feedbackMsg="Selecione uma categoria" placeholder="Selecione..." options={[{ value: "a", label: "Categoria A" }]} /></Col></Row>
        <Row label="Disabled"><Col><Label htmlFor="s-dis">Região</Label><Select id="s-dis" disabled defaultValue="sp" options={[{ value: "sp", label: "São Paulo" }]} /></Col></Row>
      </Section>
    </div>
  ),
}

// ══════════════════════════════════════════════════════════════════════════════
// Checkbox
// ══════════════════════════════════════════════════════════════════════════════
export const Checkboxes: StoryObj = {
  name: "Checkbox",
  render: () => {
    function Demo() {
      const [checked, setChecked] = useState(false)
      return (
        <div style={{ padding: 32, maxWidth: 600 }}>
          <Section title="Checkbox — Estados">
            <Row label="Unchecked"><Checkbox id="cb-un" label="Aceito os termos de uso" /></Row>
            <Row label="Checked"><Checkbox id="cb-ch" defaultChecked label="Receber novidades por e-mail" /></Row>
            <Row label="Indeterminate"><Checkbox id="cb-ind" indeterminate label="Selecionar todos (parcial)" /></Row>
            <Row label="Disabled off"><Checkbox id="cb-doff" disabled label="Opção desabilitada" /></Row>
            <Row label="Disabled on"><Checkbox id="cb-don" disabled defaultChecked label="Opção marcada desabilitada" /></Row>
            <Row label="Com hint"><Checkbox id="cb-hint" label="Ativar autenticação 2FA" hint="Recomendado para contas com acesso financeiro" /></Row>
          </Section>
          <Section title="Checkbox — Tamanhos">
            <Row label="sm"><Checkbox id="cb-sm" size="sm" defaultChecked label="Small" /></Row>
            <Row label="md"><Checkbox id="cb-md" size="md" defaultChecked label="Medium (padrão)" /></Row>
            <Row label="lg"><Checkbox id="cb-lg" size="lg" defaultChecked label="Large" /></Row>
          </Section>
          <Section title="Checkbox — Controlled">
            <Row label="Controlled">
              <Checkbox
                id="cb-ctrl"
                label={`Notificações ${checked ? "ativadas" : "desativadas"}`}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </Row>
          </Section>
        </div>
      )
    }
    return <Demo />
  },
}

// ══════════════════════════════════════════════════════════════════════════════
// Radio
// ══════════════════════════════════════════════════════════════════════════════
export const Radios: StoryObj = {
  name: "Radio",
  render: () => {
    function Demo() {
      const [plan, setPlan] = useState("pro")
      const [freq, setFreq] = useState("monthly")
      return (
        <div style={{ padding: 32, maxWidth: 600 }}>
          <Section title="Radio — Estados">
            <Row label="Unchecked"><Radio id="r-un" name="r-un" label="Não selecionado" /></Row>
            <Row label="Checked"><Radio id="r-ch" name="r-ch" defaultChecked label="Selecionado" /></Row>
            <Row label="Disabled"><Radio id="r-dis" name="r-dis" disabled label="Desabilitado" /></Row>
            <Row label="Dis. checked"><Radio id="r-disc" name="r-disc" disabled defaultChecked label="Marcado desabilitado" /></Row>
          </Section>
          <Section title="Radio Group — Vertical (planos)">
            <RadioGroup
              name="plan"
              value={plan}
              onChange={setPlan}
              options={[
                { value: "free",  label: "Free — R$ 0/mês",        hint: "1 usuário, 100 transações/mês" },
                { value: "pro",   label: "Pro — R$ 49/mês",        hint: "5 usuários, transações ilimitadas" },
                { value: "ultra", label: "Ultra — R$ 149/mês",     hint: "Usuários ilimitados + suporte prioritário" },
                { value: "ent",   label: "Enterprise — sob consulta", disabled: true },
              ]}
            />
          </Section>
          <Section title="Radio Group — Horizontal (frequência)">
            <RadioGroup
              name="freq"
              value={freq}
              onChange={setFreq}
              orientation="horizontal"
              options={[
                { value: "monthly",  label: "Mensal" },
                { value: "yearly",   label: "Anual (−20%)" },
              ]}
            />
          </Section>
          <Section title="Radio — Tamanhos">
            {(["sm", "md", "lg"] as const).map((s) => (
              <Row key={s} label={s}>
                <RadioGroup
                  name={`size-${s}`}
                  orientation="horizontal"
                  options={[
                    { value: "a", label: "Opção A" },
                    { value: "b", label: "Opção B" },
                  ]}
                  size={s}
                  defaultValue="a"
                />
              </Row>
            ))}
          </Section>
        </div>
      )
    }
    return <Demo />
  },
}

// ══════════════════════════════════════════════════════════════════════════════
// Input Group
// ══════════════════════════════════════════════════════════════════════════════
export const InputGroups: StoryObj = {
  name: "InputGroup",
  render: () => (
    <div style={{ padding: 32, maxWidth: 640 }}>
      <Section title="Prefixo / Sufixo — Texto">
        <Row label="Prefixo $">
          <Col>
            <Label htmlFor="ig-val">Valor</Label>
            <InputGroup>
              <InputGroupText>R$</InputGroupText>
              <Input id="ig-val" placeholder="0,00" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
            </InputGroup>
          </Col>
        </Row>
        <Row label="Sufixo %">
          <Col>
            <Label htmlFor="ig-tax">Taxa</Label>
            <InputGroup>
              <Input id="ig-tax" placeholder="0.00" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
          </Col>
        </Row>
        <Row label="Ambos">
          <Col>
            <Label htmlFor="ig-both">Peso</Label>
            <InputGroup>
              <InputGroupText>de</InputGroupText>
              <Input id="ig-both" placeholder="0" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
              <InputGroupText>kg</InputGroupText>
            </InputGroup>
          </Col>
        </Row>
      </Section>

      <Section title="Com botão">
        <Row label="Busca">
          <Col>
            <Label htmlFor="ig-search">Buscar transação</Label>
            <InputGroup>
              <Input id="ig-search" placeholder="ID ou referência..." />
              <Button variant="brand" style={{ borderRadius: "0 0.375rem 0.375rem 0" }}>Buscar</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row label="URL + copiar">
          <Col>
            <Label htmlFor="ig-url">Link de pagamento</Label>
            <InputGroup>
              <InputGroupText>https://</InputGroupText>
              <Input id="ig-url" defaultValue="pag.d9.com/link/abc123" readOnly style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.8125rem" }} />
              <Button variant="secondary" style={{ borderRadius: "0 0.375rem 0.375rem 0" }}>Copiar</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row label="Com feedback">
          <Col>
            <Label htmlFor="ig-fb" required>Subdomínio</Label>
            <InputGroup feedbackMsg="Subdomínio disponível" feedbackType="valid">
              <Input id="ig-fb" defaultValue="empresa" state="valid" />
              <InputGroupText>.d9.com</InputGroupText>
            </InputGroup>
          </Col>
        </Row>
      </Section>

      <Section title="Tamanhos">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Row key={s} label={s}>
            <Col>
              <InputGroup>
                <InputGroupText size={s}>R$</InputGroupText>
                <Input size={s} placeholder="Valor" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
                <InputGroupText size={s}>,00</InputGroupText>
              </InputGroup>
            </Col>
          </Row>
        ))}
      </Section>
    </div>
  ),
}

// ══════════════════════════════════════════════════════════════════════════════
// Formulário real completo
// ══════════════════════════════════════════════════════════════════════════════
export const FormularioCompleto: StoryObj = {
  name: "Formulário real — Cadastro D9 Pag",
  render: () => (
    <div style={{ padding: 32, maxWidth: 520 }}>
      <div style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
        padding: 28,
      }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)" }}>
          Criar conta D9 Pag
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "var(--color-text-secondary)" }}>
          Configure sua conta para começar a processar pagamentos.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <Label htmlFor="f-nome" required>Nome</Label>
              <Input id="f-nome" placeholder="Julia" />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="f-sobrenome">Sobrenome</Label>
              <Input id="f-sobrenome" placeholder="Cândido" />
            </div>
          </div>

          <div>
            <Label htmlFor="f-email" required>E-mail corporativo</Label>
            <Input id="f-email" type="email" state="valid" defaultValue="julia@empresa.com" feedbackMsg="E-mail verificado" />
          </div>

          <div>
            <Label htmlFor="f-cnpj" required>CNPJ</Label>
            <InputGroup>
              <InputGroupText>#</InputGroupText>
              <Input id="f-cnpj" placeholder="00.000.000/0001-00" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
            </InputGroup>
          </div>

          <div>
            <Label htmlFor="f-plano" required>Plano</Label>
            <Select id="f-plano" options={PLANOS} placeholder="Selecione o plano..." />
          </div>

          <div>
            <Label>Frequência de cobrança</Label>
            <RadioGroup
              name="f-freq"
              defaultValue="monthly"
              orientation="horizontal"
              options={[
                { value: "monthly", label: "Mensal" },
                { value: "yearly",  label: "Anual (−20%)" },
              ]}
            />
          </div>

          <div>
            <Label htmlFor="f-obs" optional>Observações</Label>
            <Textarea id="f-obs" placeholder="Necessidades especiais, integrações previstas..." rows={3} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
            <Checkbox id="f-terms" required label="Li e aceito os Termos de Uso e a Política de Privacidade" />
            <Checkbox id="f-news" label="Quero receber novidades e atualizações do D9 Pag" />
          </div>

          <Button size="lg" style={{ marginTop: 8 }}>Criar conta gratuitamente →</Button>
        </div>
      </div>
    </div>
  ),
}
