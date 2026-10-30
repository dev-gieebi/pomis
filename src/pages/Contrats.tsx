import { Plus } from 'lucide-react'
import { clientName, contracts } from '../data/mock'
import { daysBetween, fmtDate, fmtFCFA } from '../lib/format'
import { Badge, Button, DataTable, PageHeader, ProgressBar } from '../components/ui'

export default function Contrats() {
  return (
    <div>
      <PageHeader
        title="Contrats"
        subtitle="Maintenance préventive, astreinte et mise à disposition de techniciens"
        actions={<Button><Plus className="h-4 w-4" /> Nouveau contrat</Button>}
      />

      <DataTable
        rows={contracts}
        columns={[
          { header: 'N°', cell: (c) => <span className="font-medium text-slate-800">{c.numero}</span> },
          { header: 'Client', cell: (c) => clientName(c.clientId) },
          { header: 'Type', cell: (c) => <Badge tone={c.type === 'Astreinte' ? 'Inter' : c.type === 'Mise à disposition' ? 'Intra' : 'Planifiée'}>{c.type}</Badge> },
          {
            header: 'Période',
            cell: (c) => {
              const reste = daysBetween('2026-10-30', c.fin)
              return (
                <div className="min-w-40">
                  <p className="text-slate-600">{fmtDate(c.debut)} → {fmtDate(c.fin)}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="w-24">
                      <ProgressBar value={365 - Math.max(reste, 0)} max={365} tone={reste < 60 ? 'bg-rose-500' : 'bg-emerald-500'} />
                    </div>
                    <span className={`text-xs ${reste < 60 ? 'font-medium text-rose-600' : 'text-slate-400'}`}>
                      {reste} j restants
                    </span>
                  </div>
                </div>
              )
            },
          },
          { header: 'Montant', className: 'text-right', cell: (c) => fmtFCFA(c.montant) },
          { header: 'Facturation', cell: (c) => <span className="text-slate-600">{c.periodiciteFacturation}</span> },
          { header: 'Visites incluses', className: 'text-right', cell: (c) => c.visitesIncluses || '—' },
          { header: 'Statut', cell: (c) => <Badge tone={c.statut}>{c.statut}</Badge> },
        ]}
      />
    </div>
  )
}
