import { clientName, equipmentLabel, interventions, userName } from '../data/mock'
import { fmtDateShort } from '../lib/format'
import { Badge, Card, PageHeader } from '../components/ui'

const jours = ['Lun 26', 'Mar 27', 'Mer 28', 'Jeu 29', 'Ven 30', 'Sam 31', 'Dim 1']
const dates = ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31', '2026-11-01']

// Événements planifiés pour la semaine affichée (au-delà des interventions mock)
const semaine: Record<string, { numero: string; titre: string; client: string; type: string; urgence: string }[]> = {
  '2026-10-26': [
    { numero: 'SES-2026-010', titre: 'Formation SEC-01 (jour 1)', client: 'Inter-entreprises', type: 'Formation', urgence: 'Normale' },
  ],
  '2026-10-27': [
    { numero: 'SES-2026-010', titre: 'Formation SEC-01 (jour 2)', client: 'Inter-entreprises', type: 'Formation', urgence: 'Normale' },
  ],
  '2026-10-29': [
    { numero: 'INT-2026-0126', titre: 'GE 3512 — défaut alternateur', client: 'Mines de Kalsaka', type: 'Corrective', urgence: 'Urgente' },
  ],
  '2026-10-30': [
    { numero: 'INT-2026-0128', titre: 'Garniture mécanique pompe P-204', client: 'Onco Hydrocarbures', type: 'Corrective', urgence: 'Critique' },
  ],
  '2026-11-01': [],
}

const typeColors: Record<string, string> = {
  Corrective: 'border-l-rose-400',
  Préventive: 'border-l-emerald-400',
  Expertise: 'border-l-violet-400',
  Formation: 'border-l-sky-400',
}

export default function Planning() {
  return (
    <div>
      <PageHeader
        title="Planning de la semaine"
        subtitle="Semaine du 26 octobre au 1er novembre 2026 — filtrable par technicien, client ou site"
      />

      <div className="grid grid-cols-7 gap-3">
        {jours.map((j, idx) => (
          <div key={j} className="min-h-40">
            <div className={`mb-2 rounded-lg px-2 py-1.5 text-center text-xs font-semibold ${idx === 4 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {j}
            </div>
            <div className="space-y-2">
              {(semaine[dates[idx]] ?? []).map((e) => (
                <div key={e.numero} className={`rounded-lg border border-slate-200 border-l-4 bg-white p-2 text-xs shadow-sm ${typeColors[e.type]}`}>
                  <p className="font-semibold text-slate-800">{e.numero}</p>
                  <p className="mt-0.5 leading-tight text-slate-600">{e.titre}</p>
                  <p className="mt-1 text-slate-400">{e.client}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vue liste : affectations */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Prochaines interventions planifiées
          </h2>
          <ul className="divide-y divide-slate-100">
            {interventions
              .filter((i) => i.statut === 'Planifiée' || i.statut === 'Demandée')
              .map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {i.numero} · {i.equipementId > 0 ? equipmentLabel(i.equipementId) : 'Site client'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {clientName(i.clientId)} — {fmtDateShort(i.datePrevue)} ·{' '}
                      {i.techniciens.length > 0 ? i.techniciens.map(userName).join(', ') : 'non affectée'}
                    </p>
                  </div>
                  <Badge tone={i.statut}>{i.statut}</Badge>
                </li>
              ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Charge par technicien (semaine)
          </h2>
          <ul className="space-y-4">
            {[
              { nom: 'Sekou Diallo', jours: 4, inter: 2 },
              { nom: 'Jean-Marc Baye', jours: 3, inter: 2 },
              { nom: 'Ibrahim Koné (supervision)', jours: 2, inter: 1 },
            ].map((t) => (
              <li key={t.nom}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{t.nom}</span>
                  <span className="text-slate-500">{t.jours} j · {t.inter} interventions</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: `${(t.jours / 5) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-amber-200">
            <strong>Conflit détecté :</strong> J.-M. Baye est formateur sur SES-2026-014 (ELE-01, 1-3 déc.)
            et technicien affecté sur INT-2026-0124 (20 nov.) — pas de chevauchement, mais charge
            cumulée à surveiller.
          </div>
        </Card>
      </div>
    </div>
  )
}
