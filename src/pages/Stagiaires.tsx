import { Plus } from 'lucide-react'
import { clientName, trainees } from '../data/mock'
import { Avatar, Button, DataTable, PageHeader } from '../components/ui'

export default function Stagiaires() {
  return (
    <div>
      <PageHeader
        title="Stagiaires"
        subtitle="Fiches stagiaires et historique des formations suivies"
        actions={<Button><Plus className="h-4 w-4" /> Inscrire un stagiaire</Button>}
      />

      <DataTable
        rows={trainees}
        columns={[
          {
            header: 'Stagiaire',
            cell: (t) => (
              <div className="flex items-center gap-3">
                <Avatar name={`${t.prenom} ${t.nom}`} />
                <div>
                  <p className="font-medium text-slate-800">{t.prenom} {t.nom}</p>
                  <p className="text-xs text-slate-400">{t.fonction}</p>
                </div>
              </div>
            ),
          },
          { header: 'Entreprise', cell: (t) => clientName(t.clientId) },
          {
            header: 'Contact',
            cell: (t) => (
              <div className="text-xs">
                <p className="text-slate-600">{t.tel}</p>
                <p className="text-slate-400">{t.email}</p>
              </div>
            ),
          },
          {
            header: 'Formations suivies',
            className: 'text-center',
            cell: (t) => (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-700">
                {t.formationsSuivies}
              </span>
            ),
          },
          {
            header: 'Convocation',
            cell: () => <span className="text-xs font-medium text-teal-600">PDF ↓</span>,
          },
        ]}
      />
    </div>
  )
}
