import { useState } from 'react'
import { Plus } from 'lucide-react'
import { agingBucket, fmtDate, fmtFCFA } from '../lib/format'
import { clientName, invoices } from '../data/mock'
import { Badge, Button, DataTable, FilterTabs, PageHeader, ProgressBar, Stat } from '../components/ui'

export default function Factures() {
  const [filter, setFilter] = useState('Toutes')
  const rows = invoices.filter((i) => filter === 'Toutes' || i.statut === filter)

  const totalEmis = invoices.reduce((s, i) => s + i.montantTTC, 0)
  const totalPaye = invoices.reduce((s, i) => s + i.montantPaye, 0)
  const enRetard = invoices.filter((i) => i.statut === 'En retard').reduce((s, i) => s + i.montantTTC - i.montantPaye, 0)

  return (
    <div>
      <PageHeader
        title="Factures & paiements"
        subtitle="Numérotation légale FAC-2026-XXXX · avoirs pour correction"
        actions={<Button><Plus className="h-4 w-4" /> Nouvelle facture</Button>}
      />

      <div className="mb-5 grid grid-cols-3 gap-4">
        <Stat label="Facturé (année)" value={fmtFCFA(totalEmis)} />
        <Stat label="Encaissé" value={fmtFCFA(totalPaye)} accent="text-emerald-600" />
        <Stat label="En retard" value={fmtFCFA(enRetard)} accent="text-rose-600" sub="Relances automatiques" />
      </div>

      <div className="mb-4">
        <FilterTabs
          options={['Toutes', 'Brouillon', 'Émise', 'Partiellement payée', 'Payée', 'En retard']}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <DataTable
        rows={rows}
        columns={[
          { header: 'N°', cell: (i) => <span className="font-medium text-slate-800">{i.numero}</span> },
          { header: 'Client', cell: (i) => clientName(i.clientId) },
          { header: 'Origine', cell: (i) => <span className="text-xs text-slate-500">{i.origine}</span> },
          {
            header: 'Montant TTC',
            className: 'text-right',
            cell: (i) => <span className="font-medium">{fmtFCFA(i.montantTTC)}</span>,
          },
          {
            header: 'Paiement',
            cell: (i) => (
              <div className="w-28">
                <ProgressBar
                  value={i.montantPaye}
                  max={i.montantTTC}
                  tone={i.statut === 'En retard' ? 'bg-rose-500' : 'bg-emerald-500'}
                />
                <p className="mt-1 text-xs text-slate-400">
                  {Math.round((i.montantPaye / i.montantTTC) * 100)} % payé
                </p>
              </div>
            ),
          },
          { header: 'Échéance', cell: (i) => <span className="text-slate-500">{fmtDate(i.dateEcheance)}</span> },
          {
            header: 'Ancienneté',
            cell: (i) =>
              i.statut === 'Payée' || i.statut === 'Brouillon' ? (
                <span className="text-slate-300">—</span>
              ) : (
                <span className="text-xs font-medium text-slate-600">{agingBucket(i.dateEcheance)}</span>
              ),
          },
          { header: 'Statut', cell: (i) => <Badge tone={i.statut}>{i.statut}</Badge> },
        ]}
      />
    </div>
  )
}
