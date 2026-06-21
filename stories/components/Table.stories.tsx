import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Table } from "../../src/components/Table"
import { Badge } from "../../src/components/Badge"
import { Pagination } from "../../src/components/Pagination"
import { Dropdown } from "../../src/components/Dropdown"
import { Button } from "../../src/components/Button"

const meta: Meta = {
  title: "Componentes/Table",
  parameters: { layout: "padded" },
}
export default meta

type Pedido = { id: string; cliente: string; valor: number; status: string; data: string }

const PEDIDOS: Pedido[] = [
  { id: "#1042", cliente: "Maria Souza",          valor: 349.90, status: "entregue",   data: "21/06/2026" },
  { id: "#1041", cliente: "João Faria",            valor: 89.00,  status: "em_transito",data: "20/06/2026" },
  { id: "#1040", cliente: "Carlos Eduardo Sanches",valor: 1200.00,status: "separando",  data: "20/06/2026" },
  { id: "#1039", cliente: "Ana Beatriz Lima",      valor: 59.90,  status: "cancelado",  data: "19/06/2026" },
  { id: "#1038", cliente: "Lucas Mendes",          valor: 780.00, status: "pendente",   data: "19/06/2026" },
]

const STATUS_VARIANT: Record<string, "success" | "warning" | "info" | "danger" | "secondary"> = {
  entregue:    "success",
  em_transito: "info",
  separando:   "warning",
  cancelado:   "danger",
  pendente:    "secondary",
}

const STATUS_LABEL: Record<string, string> = {
  entregue: "Entregue", em_transito: "Em trânsito",
  separando: "Separando", cancelado: "Cancelado", pendente: "Pendente",
}

export const Padrao: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [sortKey, setSortKey]   = useState("id")
    const [sortDir, setSortDir]   = useState<"asc" | "desc">("desc")
    const [page, setPage]         = useState(1)

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {selected.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{selected.length} selecionado(s)</span>
            <Button variant="outline-danger" size="sm">Cancelar selecionados</Button>
          </div>
        )}

        <Table<Pedido>
          columns={[
            { key: "id",      header: "Pedido",   sortable: true, width: 90,
              render: r => <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 700 }}>{r.id}</span> },
            { key: "cliente", header: "Cliente",  sortable: true },
            { key: "status",  header: "Status",
              render: r => <Badge variant={`subtle-${STATUS_VARIANT[r.status]}` as any}>{STATUS_LABEL[r.status]}</Badge> },
            { key: "valor",   header: "Valor",    sortable: true, align: "right",
              render: r => <span style={{ fontFamily: "IBM Plex Mono, monospace" }}>R$ {r.valor.toFixed(2).replace(".", ",")}</span> },
            { key: "data",    header: "Data",     width: 110,
              render: r => <span style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>{r.data}</span> },
            { key: "acoes",   header: "", width: 40,
              render: (_) => (
                <Dropdown
                  align="right"
                  trigger={<Button variant="ghost" size="sm" iconOnly aria-label="Ações">⋯</Button>}
                  items={[
                    { label: "Ver pedido" },
                    { label: "Editar" },
                    { type: "divider" },
                    { label: "Cancelar", danger: true },
                  ]}
                />
              ),
            },
          ]}
          data={PEDIDOS}
          rowKey={r => r.id}
          selectable
          selectedKeys={selected}
          onSelectChange={setSelected}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={(k, d) => { setSortKey(k); setSortDir(d) }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            Exibindo {PEDIDOS.length} de 142 pedidos
          </span>
          <Pagination page={page} total={142} pageSize={5} onChange={setPage} />
        </div>
      </div>
    )
  },
}

export const Vazia: StoryObj = {
  render: () => (
    <Table<Pedido>
      columns={[
        { key: "id",      header: "Pedido"  },
        { key: "cliente", header: "Cliente" },
        { key: "status",  header: "Status"  },
        { key: "valor",   header: "Valor"   },
      ]}
      data={[]}
      rowKey={r => r.id}
      emptyMessage="Nenhum pedido encontrado para o filtro aplicado."
    />
  ),
}
