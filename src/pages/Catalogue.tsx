import { Plus } from 'lucide-react'
import { trainings } from '../data/mock'
import { fmtFCFA } from '../lib/format'
import { Badge, Button, PageHeader, Card } from '../components/ui'

const domaineColors: Record<string, string> = {
  'Turbines à gaz': 'bg-amber-50 text-amber-700 ring-amber-200',
  Maintenance: 'bg-sky-50 text-sky-700 ring-sky-200',
  Électricité: 'bg-violet-50 text-violet-700 ring-violet-200',
  Sécurité: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function Catalogue() {
  return (
    <div>
      <PageHeader
        title="Catalogue de formations"
        subtitle="Création, modification et tarification libre de chaque formation"
        actions={<Button><Plus className="h-4 w-4" /> Nouvelle formation</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {trainings.map((t) => (
          <Card key={t.id} className="flex flex-col p-5">
            <div className="mb-2 flex items-start justify-between">
              <span className="rounded-md bg-teal-800 px-2 py-1 font-mono text-xs font-semibold text-white">
                {t.code}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${domaineColors[t.domaine]}`}>
                {t.domaine}
              </span>
            </div>
            <h3 className="mb-1 font-semibold text-slate-800">{t.intitule}</h3>
            <p className="mb-3 text-xs text-slate-500">Public : {t.public} · {t.dureeJours} jour{t.dureeJours > 1 ? 's' : ''}</p>
            <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-center">
              <div className="rounded-lg bg-slate-50 p-2">
                <p className="text-[10px] font-semibold uppercase text-slate-400">Inter / stagiaire</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">{fmtFCFA(t.prixInter)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <p className="text-[10px] font-semibold uppercase text-slate-400">Forfait intra</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">{fmtFCFA(t.forfaitIntra)}</p>
              </div>
            </div>
          </Card>
        ))}

        <button className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 transition-colors hover:border-teal-500 hover:text-teal-600">
          <Plus className="h-6 w-6" />
          <span className="text-sm font-medium">Ajouter une formation</span>
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        <Badge tone="info">i</Badge> Les supports de cours (PDF, présentations) sont attachés à chaque fiche et réservés aux formateurs.
      </p>
    </div>
  )
}
