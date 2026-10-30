import { Link } from 'react-router-dom'
import {
  AlertTriangle, Banknote, CalendarDays, FileText, Package,
  Receipt, TrendingUp, Wrench,
} from 'lucide-react'
import {
  contracts, interventions, invoices, items, notifications, quotes,
  sessions, clientName, equipmentLabel, trainingLabel,
} from '../data/mock'
import { fmtFCFA, fmtDate, fmtNum } from '../lib/format'
import { Badge, Card, PageHeader, ProgressBar, SectionTitle, Stat } from '../components/ui'

const caMois = 38_160_000
const caAnnee = 312_400_000
const encaissementsMois = 21_490_000

export default function Dashboard() {
  const impayes = invoices
    .filter((i) => i.statut === 'En retard' || (i.statut !== 'Payée' && i.statut !== 'Brouillon'))
    .reduce((s, i) => s + (i.montantTTC - i.montantPaye), 0)
  const devisAttente = quotes.filter((q) => q.statut === 'Envoyé').length
  const enCours = interventions.filter((i) => i.statut === 'En cours' || i.statut === 'Demandée')
  const prochaines = sessions.filter((s) => s.statut === 'Confirmée' || s.statut === 'Planifiée')
  const sousSeuil = items.filter((i) => i.stock <= i.seuilAlerte)
  const aValider = quotes.filter((q) => q.validationDirection && q.statut !== 'Accepté' && q.statut !== 'Refusé' && q.statut !== 'Expiré')

  const caParActivite = [
    { label: 'Maintenance', valeur: 192_000_000, pct: 61 },
    { label: 'Formations', valeur: 78_600_000, pct: 25 },
    { label: 'Pièces détachées', valeur: 41_800_000, pct: 14 },
  ]

  return (
    <div>
      <PageHeader
        title="Tableau de bord Direction"
        subtitle="Vue temps réel au vendredi 30 octobre 2026"
      />

      {/* KPI principaux */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          label="CA du mois"
          value={fmtFCFA(caMois)}
          sub="+12 % vs septembre"
          accent="text-emerald-600"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <Stat
          label="CA année 2026"
          value={fmtFCFA(caAnnee)}
          sub="Objectif 400 M — 78 %"
          icon={<Banknote className="h-4 w-4" />}
        />
        <Stat
          label="Encaissements du mois"
          value={fmtFCFA(encaissementsMois)}
          sub="8 paiements reçus"
          icon={<Receipt className="h-4 w-4" />}
        />
        <Stat
          label="Impayés"
          value={fmtFCFA(impayes)}
          sub="3 factures — relances en cours"
          accent="text-rose-600"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      {/* KPI secondaires */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Devis en attente" value={String(devisAttente)} sub={`${aValider.length} à valider par la Direction`} icon={<FileText className="h-4 w-4" />} />
        <Stat label="Interventions actives" value={String(enCours.length)} sub="dont 1 critique" icon={<Wrench className="h-4 w-4" />} />
        <Stat label="Sessions à venir" value={String(prochaines.length)} sub="32 stagiaires inscrits" icon={<CalendarDays className="h-4 w-4" />} />
        <Stat label="Articles sous seuil" value={String(sousSeuil.length)} sub="Réappro à commander" accent="text-amber-600" icon={<Package className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* CA par activité */}
        <Card className="p-5">
          <SectionTitle>CA par activité — 2026</SectionTitle>
          <div className="space-y-4">
            {caParActivite.map((a) => (
              <div key={a.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{a.label}</span>
                  <span className="text-slate-500">{fmtFCFA(a.valeur)}</span>
                </div>
                <ProgressBar value={a.pct} max={100} />
                <p className="mt-1 text-right text-xs text-slate-400">{a.pct} %</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-slate-100 pt-4">
            <SectionTitle>Contrats actifs</SectionTitle>
            <ul className="space-y-2.5">
              {contracts.map((c) => (
                <li key={c.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-slate-700">{c.numero}</p>
                    <p className="text-xs text-slate-400">{clientName(c.clientId)} · fin {fmtDate(c.fin)}</p>
                  </div>
                  <Badge>{c.statut}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Activité en cours */}
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <SectionTitle>Interventions à suivre</SectionTitle>
            <Link to="/app/interventions" className="text-xs font-medium text-teal-600 hover:underline">
              Tout voir →
            </Link>
          </div>
          <ul className="space-y-3">
            {interventions.slice(0, 5).map((i) => (
              <li key={i.id} className="rounded-lg border border-slate-100 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">{i.numero} · {clientName(i.clientId)}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{i.description}</p>
                    {i.equipementId > 0 && (
                      <p className="mt-0.5 text-xs text-slate-400">{equipmentLabel(i.equipementId)}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge tone={i.statut}>{i.statut}</Badge>
                    {i.urgence !== 'Normale' && <Badge tone={i.urgence}>{i.urgence}</Badge>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Alertes */}
        <Card className="p-5">
          <SectionTitle>Alertes</SectionTitle>
          <ul className="space-y-3">
            {notifications.filter((n) => n.type !== 'info').map((n) => (
              <li key={n.id} className="flex gap-3 text-sm">
                <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${n.type === 'alerte' ? 'text-rose-500' : 'text-amber-500'}`} />
                <div>
                  <p className="font-medium text-slate-700">{n.titre}</p>
                  <p className="text-xs text-slate-500">{n.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <SectionTitle>Prochaines sessions</SectionTitle>
              <Link to="/app/formations/sessions" className="text-xs font-medium text-teal-600 hover:underline">
                Planning →
              </Link>
            </div>
            <ul className="space-y-2.5">
              {prochaines.slice(0, 3).map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-700">{trainingLabel(s.trainingId)}</p>
                    <p className="text-xs text-slate-400">
                      {fmtDate(s.debut)} · {s.inscrits}/{s.placesMax} places
                    </p>
                  </div>
                  <Badge tone={s.type}>{s.type}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Ancienneté des créances */}
      <Card className="mt-6 p-5">
        <SectionTitle>Ancienneté des créances</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { label: 'Non échues', montant: 30_928_000, cls: 'text-slate-700' },
            { label: '0 – 30 j', montant: 5_558_000, cls: 'text-amber-600' },
            { label: '31 – 60 j', montant: 9_558_000, cls: 'text-orange-600' },
            { label: '61 – 90 j', montant: 0, cls: 'text-rose-500' },
            { label: '+ 90 j', montant: 2_360_000, cls: 'text-rose-700' },
          ].map((b) => (
            <div key={b.label} className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xs font-medium text-slate-500">{b.label}</p>
              <p className={`mt-1 text-sm font-semibold ${b.cls}`}>{fmtNum(b.montant)} FCFA</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
