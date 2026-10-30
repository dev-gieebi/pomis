import { useState } from 'react'
import { Plus } from 'lucide-react'
import { clientName, quotes } from '../data/mock'
import { fmtDate, fmtFCFA } from '../lib/format'
import { Badge, Button, Card, DataTable, FilterTabs, PageHeader } from '../components/ui'

export default function Devis() {
  const [filter, setFilter] = useState('Tous')
  const rows = quotes.filter((q) => filter === 'Tous' || q.statut === filter)

  return (
    <div>
      <PageHeader
        title="Devis"
        subtitle="Du brouillon à la transformation en intervention, session ou contrat"
        actions={<Button><Plus className="h-4 w-4" /> Nouveau devis</Button>}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs options={['Tous', 'Brouillon', 'Envoyé', 'Accepté', 'Refusé', 'Expiré']} value={filter} onChange={setFilter} />
        <Card className="px-3 py-1.5 text-xs text-teal-700 bg-teal-50 border-teal-200">
          Validation Direction requise au-delà de 10 M FCFA ou 5 % de remise
        </Card>
      </div>

      <DataTable
        rows={rows}
        columns={[
          { header: 'N°', cell: (q) => <span className="font-medium text-slate-800">{q.numero}</span> },
          { header: 'Client', cell: (q) => clientName(q.clientId) },
          { header: 'Objet', cell: (q) => <span className="text-slate-600">{q.objet}</span> },
          {
            header: 'Montant TTC',
            className: 'text-right',
            cell: (q) => (
              <div>
                <p className="font-medium">{fmtFCFA(q.montantHT * (1 + q.tva / 100))}</p>
                {q.remisePct > 0 && <p className="text-xs text-slate-400">remise {q.remisePct} %</p>}
              </div>
            ),
          },
          { header: 'Émis le', cell: (q) => <span className="text-slate-500">{fmtDate(q.dateEmission)}</span> },
          { header: 'Validité', cell: (q) => <span className="text-slate-500">{fmtDate(q.dateValidite)}</span> },
          {
            header: 'Statut',
            cell: (q) => (
              <div className="flex flex-col items-start gap-1">
                <Badge tone={q.statut}>{q.statut}</Badge>
                {q.validationDirection && (q.statut === 'Brouillon' || q.statut === 'Envoyé') && (
                  <span className="text-[10px] font-medium uppercase text-amber-600">À valider Direction</span>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
