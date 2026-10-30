import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  clientName, equipmentLabel, interventions, userName,
} from '../data/mock'
import { fmtDate } from '../lib/format'
import { Avatar, Badge, Button, DataTable, FilterTabs, PageHeader } from '../components/ui'

const steps = ['Demandée', 'Planifiée', 'En cours', 'Rapport saisi', 'Validée', 'Facturée']

export default function Interventions() {
  const [filter, setFilter] = useState('Toutes')
  const rows = interventions.filter((i) => filter === 'Toutes' || i.statut === filter)

  return (
    <div>
      <PageHeader
        title="Interventions"
        subtitle="Cycle complet : demande → planification → réalisation → rapport → validation → facturation"
        actions={<Button><Plus className="h-4 w-4" /> Nouvelle demande</Button>}
      />

      {/* Pipeline du cycle */}
      <div className="mb-5 flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-3">
        {steps.map((s, idx) => {
          const count = interventions.filter((i) => i.statut === s).length
          return (
            <div key={s} className="flex items-center">
              <div className="flex min-w-24 flex-col items-center rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-lg font-bold text-slate-800">{count}</span>
                <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-slate-500">{s}</span>
              </div>
              {idx < steps.length - 1 && <span className="mx-1 text-slate-300">→</span>}
            </div>
          )
        })}
      </div>

      <div className="mb-4">
        <FilterTabs options={['Toutes', ...steps]} value={filter} onChange={setFilter} />
      </div>

      <DataTable
        rows={rows}
        columns={[
          { header: 'N°', cell: (i) => <span className="font-medium text-slate-800">{i.numero}</span> },
          { header: 'Client', cell: (i) => clientName(i.clientId) },
          {
            header: 'Équipement / objet',
            cell: (i) => (
              <div className="max-w-72">
                <p className="truncate text-slate-700">{i.equipementId > 0 ? equipmentLabel(i.equipementId) : 'Site client'}</p>
                <p className="truncate text-xs text-slate-400">{i.description}</p>
              </div>
            ),
          },
          { header: 'Type', cell: (i) => i.type },
          { header: 'Urgence', cell: (i) => <Badge tone={i.urgence}>{i.urgence}</Badge> },
          { header: 'Date prévue', cell: (i) => <span className="text-slate-500">{fmtDate(i.datePrevue)}</span> },
          {
            header: 'Techniciens',
            cell: (i) =>
              i.techniciens.length === 0 ? (
                <span className="text-xs font-medium text-rose-500">Non affectée</span>
              ) : (
                <div className="flex -space-x-1.5">
                  {i.techniciens.map((t) => (
                    <span key={t} title={userName(t)}>
                      <Avatar name={userName(t)} size="sm" />
                    </span>
                  ))}
                </div>
              ),
          },
          {
            header: 'Statut',
            cell: (i) => (
              <div className="flex flex-col items-start gap-1">
                <Badge tone={i.statut}>{i.statut}</Badge>
                {i.contratId && <span className="text-[10px] text-slate-400">Sous contrat</span>}
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
