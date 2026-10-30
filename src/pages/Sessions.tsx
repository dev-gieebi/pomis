import { useState } from 'react'
import { Plus } from 'lucide-react'
import { clientName, sessions, trainingLabel, userName } from '../data/mock'
import { fmtDate } from '../lib/format'
import { Avatar, Badge, Button, DataTable, FilterTabs, PageHeader, ProgressBar } from '../components/ui'

export default function Sessions() {
  const [filter, setFilter] = useState('Toutes')
  const rows = sessions.filter((s) => filter === 'Toutes' || s.statut === filter)

  return (
    <div>
      <PageHeader
        title="Sessions de formation"
        subtitle="Inter-entreprises et intra-entreprise — convocations, présences, évaluations"
        actions={<Button><Plus className="h-4 w-4" /> Nouvelle session</Button>}
      />

      <div className="mb-4">
        <FilterTabs
          options={['Toutes', 'Planifiée', 'Confirmée', 'En cours', 'Terminée', 'Annulée']}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <DataTable
        rows={rows}
        columns={[
          { header: 'N°', cell: (s) => <span className="font-medium text-slate-800">{s.numero}</span> },
          {
            header: 'Formation',
            cell: (s) => (
              <div className="max-w-64">
                <p className="truncate font-medium text-slate-700">{trainingLabel(s.trainingId)}</p>
                {s.clientId && <p className="text-xs text-slate-400">{clientName(s.clientId)}</p>}
              </div>
            ),
          },
          { header: 'Type', cell: (s) => <Badge tone={s.type}>{s.type}</Badge> },
          {
            header: 'Dates',
            cell: (s) => (
              <span className="text-slate-600">
                {fmtDate(s.debut)} → {fmtDate(s.fin)}
              </span>
            ),
          },
          { header: 'Lieu', cell: (s) => <span className="text-slate-500">{s.lieu.split(',')[0]}</span> },
          {
            header: 'Formateur(s)',
            cell: (s) => (
              <div className="flex -space-x-1.5">
                {s.formateurIds.map((f) => (
                  <span key={f} title={userName(f)}>
                    <Avatar name={userName(f)} size="sm" />
                  </span>
                ))}
              </div>
            ),
          },
          {
            header: 'Remplissage',
            cell: (s) => (
              <div className="w-28">
                <ProgressBar
                  value={s.inscrits}
                  max={s.placesMax}
                  tone={s.inscrits >= s.placesMax ? 'bg-rose-500' : s.inscrits < s.placesMin ? 'bg-amber-500' : 'bg-emerald-500'}
                />
                <p className="mt-1 text-xs text-slate-500">
                  {s.inscrits}/{s.placesMax} · min {s.placesMin}
                  {s.listeAttente > 0 && <span className="text-amber-600"> (+{s.listeAttente} attente)</span>}
                </p>
              </div>
            ),
          },
          { header: 'Statut', cell: (s) => <Badge tone={s.statut}>{s.statut}</Badge> },
        ]}
      />
    </div>
  )
}
