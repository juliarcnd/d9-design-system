import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Label }      from "../../src/components/Label"
import { Input }      from "../../src/components/Input"
import { Textarea }   from "../../src/components/Textarea"
import { Select }     from "../../src/components/Select"
import { Checkbox }   from "../../src/components/Checkbox"
import { Radio, RadioGroup } from "../../src/components/Radio"
import { InputGroup, InputGroupText } from "../../src/components/InputGroup"
import { Button }     from "../../src/components/Button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border)", paddingBottom: 10 }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
      {label && (
        <span style={{ width: 130, flexShrink: 0, paddingTop: 18, fontSize: 11, color: "var(--color-text-disabled)", fontFamily: "IBM Plex Mono, monospace" }}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 200, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  )
}

function Col({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ flex: 1, minWidth: 220, ...style }}>{children}</div>
}

const meta: Meta = {
  title: "Components/Forms",
  parameters: { layout: "fullscreen" },
}
export default meta

// ══════════════════════════════════════════════════════════════════════════════
// Label (componente standalone — para uso com Checkbox, Radio, etc.)
// ══════════════════════════════════════════════════════════════════════════════
export const Labels: StoryObj = {
  name: "Label",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Label — uso standalone (Checkbox, Select, grupos)">
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
// Input — Material Design Outlined
// ══════════════════════════════════════════════════════════════════════════════
export const Inputs: StoryObj = {
  name: "Input",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Input — Tamanhos">
        <Row label="sm">
          <Col><Input size="sm" label="Nome" placeholder="Tamanho sm — 44px" /></Col>
        </Row>
        <Row label="md">
          <Col><Input size="md" label="Nome" placeholder="Tamanho md — 56px (padrão)" /></Col>
        </Row>
        <Row label="lg">
          <Col><Input size="lg" label="Nome" placeholder="Tamanho lg — 64px" /></Col>
        </Row>
      </Section>

      <Section title="Input — Estados">
        <Row label="Default">
          <Col><Input label="CPF" placeholder="000.000.000-00" /></Col>
        </Row>
        <Row label="Valid">
          <Col><Input label="E-mail" state="valid" defaultValue="julia@d9.com" helperText="E-mail disponível." /></Col>
        </Row>
        <Row label="Invalid">
          <Col><Input label="Senha" type="password" state="invalid" defaultValue="123" helperText="Mínimo 8 caracteres." /></Col>
        </Row>
        <Row label="Disabled">
          <Col><Input label="Código" disabled defaultValue="D9-PRO-2026" /></Col>
        </Row>
        <Row label="Readonly">
          <Col><Input label="ID da conta" readOnly defaultValue="ACC-00491827" helperText="Gerado automaticamente." /></Col>
        </Row>
        <Row label="Helper text">
          <Col><Input label="Webhook URL" placeholder="https://meusite.com/webhook" helperText="Receberá eventos POST do D9 Pag." /></Col>
        </Row>
      </Section>

      <Section title="Input — Tipos">
        {([
          { type: "text",     label: "Texto livre",  placeholder: "Digite aqui..." },
          { type: "email",    label: "E-mail",       placeholder: "voce@empresa.com" },
          { type: "password", label: "Senha",        placeholder: "Mínimo 8 caracteres" },
          { type: "number",   label: "Quantidade",   placeholder: "Ex: 10" },
          { type: "search",   label: "Busca",        placeholder: "Nome, ID ou referência..." },
          { type: "tel",      label: "Telefone",     placeholder: "(11) 99999-9999" },
          { type: "url",      label: "Website",      placeholder: "https://suaempresa.com" },
        ] as const).map(({ type, label, placeholder }) => (
          <Row key={type} label={type}>
            <Col><Input type={type} label={label} placeholder={placeholder} /></Col>
          </Row>
        ))}
        <Row label="date">
          <Col>
            <Input
              type="text"
              label="Data"
              helperText="dd/mm/aaaa"
              leadingIcon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              }
            />
          </Col>
        </Row>
      </Section>
    </div>
  ),
}

// ══════════════════════════════════════════════════════════════════════════════
// Textarea — Material Design Outlined
// ══════════════════════════════════════════════════════════════════════════════
export const Textareas: StoryObj = {
  name: "Textarea",
  render: () => (
    <div style={{ padding: 32, maxWidth: 700 }}>
      <Section title="Textarea">
        <Row label="Default">
          <Col><Textarea label="Descrição" placeholder="Descreva o serviço contratado..." rows={3} /></Col>
        </Row>
        <Row label="Valid">
          <Col><Textarea label="Observações" state="valid" defaultValue="Entrega no endereço comercial." helperText="Tudo certo!" rows={3} /></Col>
        </Row>
        <Row label="Invalid">
          <Col><Textarea label="Motivo" state="invalid" helperText="Campo obrigatório." rows={3} /></Col>
        </Row>
        <Row label="Disabled">
          <Col><Textarea label="Histórico" disabled defaultValue="Aprovado em 20/06/2026 por admin@d9.com" rows={3} /></Col>
        </Row>
        <Row label="No resize">
          <Col><Textarea label="Mensagem" noResize placeholder="Máximo 500 caracteres." rows={4} /></Col>
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
        <Row label="sm"><Col><Select id="s-sm" size="sm" label="Plano" options={PLANOS} /></Col></Row>
        <Row label="md"><Col><Select id="s-md" size="md" label="Plano" options={PLANOS} /></Col></Row>
        <Row label="lg"><Col><Select id="s-lg" size="lg" label="Plano" options={PLANOS} /></Col></Row>
      </Section>

      <Section title="Select — Estados">
        <Row label="Default"><Col><Select label="País" options={[{ value: "br", label: "Brasil" }, { value: "us", label: "EUA" }]} /></Col></Row>
        <Row label="Valid"><Col><Select label="Moeda" state="valid" helperText="Moeda suportada" defaultValue="brl" options={[{ value: "brl", label: "BRL — Real Brasileiro" }, { value: "usd", label: "USD — Dólar" }]} /></Col></Row>
        <Row label="Invalid"><Col><Select label="Categoria" state="invalid" helperText="Selecione uma categoria" options={[{ value: "a", label: "Categoria A" }]} /></Col></Row>
        <Row label="Disabled"><Col><Select label="Região" disabled defaultValue="sp" options={[{ value: "sp", label: "São Paulo" }]} /></Col></Row>
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
                { value: "free",  label: "Free — R$ 0/mês",           hint: "1 usuário, 100 transações/mês" },
                { value: "pro",   label: "Pro — R$ 49/mês",           hint: "5 usuários, transações ilimitadas" },
                { value: "ultra", label: "Ultra — R$ 149/mês",        hint: "Usuários ilimitados + suporte prioritário" },
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
                { value: "monthly", label: "Mensal" },
                { value: "yearly",  label: "Anual (−20%)" },
              ]}
            />
          </Section>
          <Section title="Radio — Tamanhos">
            {(["sm", "md", "lg"] as const).map((s) => (
              <Row key={s} label={s}>
                <RadioGroup
                  name={`size-${s}`}
                  orientation="horizontal"
                  options={[{ value: "a", label: "Opção A" }, { value: "b", label: "Opção B" }]}
                  size={s}
                  value="a"
                  onChange={() => {}}
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
              <Input bare id="ig-val" placeholder="0,00" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
            </InputGroup>
          </Col>
        </Row>
        <Row label="Sufixo %">
          <Col>
            <Label htmlFor="ig-tax">Taxa</Label>
            <InputGroup>
              <Input bare id="ig-tax" placeholder="0.00" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
          </Col>
        </Row>
        <Row label="Ambos">
          <Col>
            <Label htmlFor="ig-both">Peso</Label>
            <InputGroup>
              <InputGroupText>de</InputGroupText>
              <Input bare id="ig-both" placeholder="0" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
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
              <Input bare id="ig-search" placeholder="ID ou referência..." />
              <Button variant="brand" style={{ borderRadius: "0 0.375rem 0.375rem 0" }}>Buscar</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row label="URL + copiar">
          <Col>
            <Label htmlFor="ig-url">Link de pagamento</Label>
            <InputGroup>
              <InputGroupText>https://</InputGroupText>
              <Input bare id="ig-url" defaultValue="pag.d9.com/link/abc123" readOnly style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.8125rem" }} />
              <Button variant="secondary" style={{ borderRadius: "0 0.375rem 0.375rem 0" }}>Copiar</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row label="Com feedback">
          <Col>
            <Label htmlFor="ig-fb" required>Subdomínio</Label>
            <InputGroup feedbackMsg="Subdomínio disponível" feedbackType="valid">
              <Input bare id="ig-fb" defaultValue="empresa" state="valid" />
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
                <Input bare size={s} placeholder="Valor" style={{ fontFamily: "IBM Plex Mono, monospace" }} />
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
// Formulário completo
// ══════════════════════════════════════════════════════════════════════════════
export const FormularioCompleto: StoryObj = {
  name: "Formulário real — Cadastro D9 Pag",
  render: () => (
    <div style={{ padding: 32, maxWidth: 520 }}>
      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 28 }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)" }}>
          Criar conta D9 Pag
        </h2>
        <p style={{ margin: "0 0 28px", fontSize: 13, color: "var(--color-text-secondary)" }}>
          Configure sua conta para começar a processar pagamentos.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <Input label="Nome" placeholder="Ex: Julia" style={{ flex: 1 }} />
            <Input label="Sobrenome" placeholder="Ex: Cândido" style={{ flex: 1 }} />
          </div>

          <Input
            label="E-mail corporativo"
            type="email"
            state="valid"
            defaultValue="julia@empresa.com"
            helperText="E-mail verificado."
          />

          <Input
            label="CNPJ"
            placeholder="00.000.000/0001-00"
            style={{ fontFamily: "IBM Plex Mono, monospace" }}
          />

          <div>
            <Label htmlFor="f-plano" required>Plano</Label>
            <Select id="f-plano" options={PLANOS} placeholder="Selecione o plano..." />
          </div>

          <div>
            <Label>Frequência de cobrança</Label>
            <RadioGroup
              name="f-freq"
              value="monthly"
              onChange={() => {}}
              orientation="horizontal"
              options={[
                { value: "monthly", label: "Mensal" },
                { value: "yearly",  label: "Anual (−20%)" },
              ]}
            />
          </div>

          <Textarea
            label="Observações"
            placeholder="Necessidades especiais, integrações previstas..."
            rows={3}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
            <Checkbox id="f-terms" label="Li e aceito os Termos de Uso e a Política de Privacidade" />
            <Checkbox id="f-news" label="Quero receber novidades e atualizações do D9 Pag" />
          </div>

          <Button size="lg" style={{ marginTop: 4 }}>Criar conta gratuitamente →</Button>
        </div>
      </div>
    </div>
  ),
}
