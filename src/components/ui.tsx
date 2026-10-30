import type { ReactNode } from 'react'

// ── Badge de statut ─────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  // générique
  Brouillon: 'bg-slate-100 text-slate-600 ring-slate-200',
  Envoyé: 'bg-sky-50 text-sky-700 ring-sky-200',
  Accepté: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Refusé: 'bg-rose-50 text-rose-700 ring-rose-200',
  Expiré: 'bg-slate-100 text-slate-500 ring-slate-200',
  // interventions
  Demandée: 'bg-amber-50 text-amber-700 ring-amber-200',
  Planifiée: 'bg-sky-50 text-sky-700 ring-sky-200',
  'En cours': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  'Rapport saisi': 'bg-violet-50 text-violet-700 ring-violet-200',
  Validée: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Facturée: 'bg-teal-50 text-teal-700 ring-teal-200',
  // sessions
  Confirmée: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Terminée: 'bg-slate-100 text-slate-600 ring-slate-200',
  Annulée: 'bg-rose-50 text-rose-700 ring-rose-200',
  // factures
  Émise: 'bg-sky-50 text-sky-700 ring-sky-200',
  'Partiellement payée': 'bg-amber-50 text-amber-700 ring-amber-200',
  Payée: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'En retard': 'bg-rose-50 text-rose-700 ring-rose-200',
  // contrats
  Actif: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Expire bientôt': 'bg-amber-50 text-amber-700 ring-amber-200',
  Terminé: 'bg-slate-100 text-slate-600 ring-slate-200',
  // urgence
  Normale: 'bg-slate-100 text-slate-600 ring-slate-200',
  Urgente: 'bg-amber-50 text-amber-700 ring-amber-200',
  Critique: 'bg-rose-50 text-rose-700 ring-rose-200',
  // autres
  Client: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Prospect: 'bg-violet-50 text-violet-700 ring-violet-200',
  Inter: 'bg-sky-50 text-sky-700 ring-sky-200',
  Intra: 'bg-violet-50 text-violet-700 ring-violet-200',
}

export function Badge({ children, tone }: { children: ReactNode; tone?: string }) {
  const cls = statusColors[tone ?? String(children)] ?? 'bg-slate-100 text-slate-600 ring-slate-200'
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}>
      {children}
    </span>
  )
}

// ── Cartes ──────────────────────────────────────────────────────────────────

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}

export function Stat({
  label,
  value,
  sub,
  icon,
  accent = 'text-slate-900',
}: {
  label: string
  value: string
  sub?: string
  icon?: ReactNode
  accent?: string
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className={`mt-1.5 text-2xl font-semibold ${accent}`}>{value}</p>
          {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
        </div>
        {icon && <div className="rounded-lg bg-slate-100 p-2 text-slate-500">{icon}</div>}
      </div>
    </Card>
  )
}

// ── Tableau générique ───────────────────────────────────────────────────────

export interface Column<T> {
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

export function DataTable<T extends { id: number | string }>({
  columns,
  rows,
  onRowClick,
  empty = 'Aucune donnée',
}: {
  columns: Column<T>[]
  rows: T[]
  onRowClick?: (row: T) => void
  empty?: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              {columns.map((c) => (
                <th key={c.header} className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${c.className ?? ''}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                  {empty}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50'}
              >
                {columns.map((c) => (
                  <td key={c.header} className={`px-4 py-3 align-middle ${c.className ?? ''}`}>
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// ── Boutons & filtres ───────────────────────────────────────────────────────

export function Button({
  children,
  variant = 'primary',
  onClick,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  onClick?: () => void
}) {
  const cls = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
  }[variant]
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${cls}`}>
      {children}
    </button>
  )
}

export function FilterTabs({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === o ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const ini = name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const s = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs'
  return (
    <span className={`inline-flex ${s} shrink-0 items-center justify-center rounded-full bg-slate-700 font-semibold text-white`}>
      {ini}
    </span>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{children}</h2>
}

export function ProgressBar({ value, max, tone = 'bg-teal-500' }: { value: number; max: number; tone?: string }) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100))
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
