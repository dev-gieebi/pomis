import { useState } from 'react'
import { Plus } from 'lucide-react'
import { clientName, equipments } from '../data/mock'
import { fmtDate, fmtNum } from '../lib/format'
import { Button, Card, DataTable, FilterTabs, PageHeader } from '../components/ui'

const types = ['Tous', 'Turbine à gaz', 'Pompe centrifuge', 'Compresseur', 'Groupe électrogène']

export default function Equipements() {
  const [filter, setFilter] = useState('Tous')
  const rows = equipments.filter((e) => filter === 'Tous' || e.type === filter)

  return (
    <div>
      <PageHeader
        title="Parc d'équipements clients"
        subtitle={`${equipments.length} équipements suivis — historique complet par équipement`}
        actions={<Button><Plus className="h-4 w-4" /> Nouvel équipement</Button>}
      />

      <div className="mb-4">
        <FilterTabs options={types} value={filter} onChange={setFilter} />
      </div>

      <DataTable
        rows={rows}
        columns={[
          {
            header: 'Équipement',
            cell: (e) => (
              <div>
                <p className="font-medium text-slate-800">{e.type}</p>
                <p className="text-xs text-slate-400">{e.marque} {e.modele} · S/N {e.numeroSerie}</p>
              </div>
            ),
          },
          { header: 'Client', cell: (e) => clientName(e.clientId) },
          { header: 'Site', cell: (e) => <span className="text-slate-600">{e.site}</span> },
          { header: 'Mise en service', cell: (e) => <span className="text-slate-500">{fmtDate(e.miseEnService)}</span> },
          {
            header: 'Compteur',
            className: 'text-right',
            cell: (e) => <span className="font-medium">{fmtNum(e.compteurHeures)} h</span>,
          },
          {
            header: 'Prochaine visite',
            cell: (e) => {
              const soon = e.prochaineVisite <= '2026-11-30'
              return (
                <span className={`text-sm font-medium ${soon ? 'text-amber-600' : 'text-slate-500'}`}>
                  {fmtDate(e.prochaineVisite)}
                </span>
              )
            },
          },
          {
            header: 'Historique',
            cell: () => (
              <Card className="border-slate-200 px-3 py-1 text-xs text-slate-500 shadow-none">
                Rapports · pièces · mesures
              </Card>
            ),
          },
        ]}
      />
    </div>
  )
}
