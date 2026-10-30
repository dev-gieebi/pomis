import { useState } from 'react'
import { itemName, stockMovements } from '../data/mock'
import { fmtDate } from '../lib/format'
import { Badge, DataTable, FilterTabs, PageHeader } from '../components/ui'

const typeColors: Record<string, string> = {
  'Entrée': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Sortie': 'bg-rose-50 text-rose-700 ring-rose-200',
  'Retour': 'bg-sky-50 text-sky-700 ring-sky-200',
  'Transfert': 'bg-violet-50 text-violet-700 ring-violet-200',
  'Ajustement': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Réservation': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
}

export default function Mouvements() {
  const [filter, setFilter] = useState('Tous')
  const rows = stockMovements.filter((m) => filter === 'Tous' || m.type === filter)

  return (
    <div>
      <PageHeader
        title="Mouvements de stock"
        subtitle="Entrées, réservations, sorties par intervention, retours, transferts et ajustements"
      />

      <div className="mb-4">
        <FilterTabs
          options={['Tous', 'Entrée', 'Réservation', 'Sortie', 'Retour', 'Transfert', 'Ajustement']}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <DataTable
        rows={rows}
        columns={[
          { header: 'Date', cell: (m) => <span className="text-slate-500">{fmtDate(m.date)}</span> },
          {
            header: 'Type',
            cell: (m) => (
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${typeColors[m.type]}`}>
                {m.type}
              </span>
            ),
          },
          {
            header: 'Article',
            cell: (m) => <span className="max-w-72 truncate text-slate-700">{itemName(m.itemId)}</span>,
          },
          {
            header: 'Qté',
            className: 'text-right',
            cell: (m) => (
              <span className={`font-semibold ${m.quantite > 0 && m.type !== 'Sortie' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {m.quantite > 0 ? '+' : ''}{m.quantite}
              </span>
            ),
          },
          { header: 'Motif', cell: (m) => <span className="text-sm text-slate-500">{m.motif}</span> },
          {
            header: 'Intervention',
            cell: (m) =>
              m.intervention ? (
                <Badge tone="En cours">{m.intervention}</Badge>
              ) : (
                <span className="text-slate-300">—</span>
              ),
          },
        ]}
      />
    </div>
  )
}
