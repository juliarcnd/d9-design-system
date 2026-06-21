import React from "react"
import "../styles/components-ext.css"

export interface TableColumn<T> {
  key: string
  header: React.ReactNode
  render?: (row: T, i: number) => React.ReactNode
  sortable?: boolean
  width?: number | string
  align?: "left" | "center" | "right"
  className?: string
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey?: (row: T) => string
  selectable?: boolean
  selectedKeys?: string[]
  onSelectChange?: (keys: string[]) => void
  onSort?: (key: string, dir: "asc" | "desc") => void
  sortKey?: string
  sortDir?: "asc" | "desc"
  size?: "sm" | "md"
  className?: string
  emptyMessage?: React.ReactNode
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable,
  selectedKeys = [],
  onSelectChange,
  onSort,
  sortKey,
  sortDir,
  size = "md",
  className = "",
  emptyMessage = "Nenhum resultado encontrado.",
}: TableProps<T>) {
  const getKey = (row: T, i: number) => rowKey ? rowKey(row) : String(i)

  const toggleAll = () => {
    if (!onSelectChange) return
    const all = data.map((r, i) => getKey(r, i))
    onSelectChange(selectedKeys.length === data.length ? [] : all)
  }

  const toggleRow = (key: string) => {
    if (!onSelectChange) return
    onSelectChange(
      selectedKeys.includes(key)
        ? selectedKeys.filter(k => k !== key)
        : [...selectedKeys, key]
    )
  }

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSort) return
    const next = sortKey === col.key && sortDir === "asc" ? "desc" : "asc"
    onSort(col.key, next)
  }

  return (
    <div className={["d9-table-wrap", className].filter(Boolean).join(" ")}>
      <table className={["d9-table", size === "sm" ? "d9-table-sm" : ""].filter(Boolean).join(" ")}>
        <thead>
          <tr>
            {selectable && (
              <th className="d9-table-check">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedKeys.length === data.length}
                  onChange={toggleAll}
                  aria-label="Selecionar todos"
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                className={[col.sortable ? "d9-table-sortable" : "", col.className ?? ""].filter(Boolean).join(" ")}
                style={{ width: col.width, textAlign: col.align ?? "left" }}
                onClick={() => handleSort(col)}
              >
                {col.header}
                {col.sortable && sortKey === col.key && (
                  <span style={{ marginLeft: 4 }}>{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-disabled)" }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : data.map((row, i) => {
            const key = getKey(row, i)
            const selected = selectedKeys.includes(key)
            return (
              <tr
                key={key}
                className={selected ? "d9-table-row-selected" : ""}
                onClick={selectable ? () => toggleRow(key) : undefined}
                style={selectable ? { cursor: "pointer" } : undefined}
              >
                {selectable && (
                  <td className="d9-table-check" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleRow(key)}
                      aria-label="Selecionar linha"
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} style={{ textAlign: col.align ?? "left" }}>
                    {col.render ? col.render(row, i) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
