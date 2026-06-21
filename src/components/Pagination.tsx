import "../styles/components-ext.css"

export interface PaginationProps {
  page: number
  total: number
  pageSize?: number
  onChange: (page: number) => void
  siblingCount?: number
  className?: string
}

export function Pagination({ page, total, pageSize = 10, onChange, siblingCount = 1, className = "" }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const pages = (): (number | "…")[] => {
    const left  = Math.max(2, page - siblingCount)
    const right = Math.min(totalPages - 1, page + siblingCount)
    const showLeftDot  = left > 2
    const showRightDot = right < totalPages - 1

    return [
      1,
      ...(showLeftDot ? ["…" as const] : []),
      ...range(left, right),
      ...(showRightDot ? ["…" as const] : []),
      ...(totalPages > 1 ? [totalPages] : []),
    ]
  }

  if (totalPages <= 1) return null

  return (
    <nav className={["d9-pagination", className].filter(Boolean).join(" ")} aria-label="Paginação">
      <button
        className="d9-page-btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Anterior"
      >
        ←
      </button>

      {pages().map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="d9-page-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className="d9-page-btn"
            data-active={p === page ? "true" : undefined}
            onClick={() => onChange(p as number)}
            aria-label={`Página ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="d9-page-btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Próximo"
      >
        →
      </button>
    </nav>
  )
}
