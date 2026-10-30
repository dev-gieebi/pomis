import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, MapPin, Users, ArrowRight, GraduationCap, Clock,
} from 'lucide-react'
import { sessions, trainings, type Training } from '../data/mock'
import { fmtDateShort, fmtFCFA } from '../lib/format'

const domaineColors: Record<Training['domaine'], string> = {
  'Turbines à gaz': 'border-amber-200 bg-amber-50 text-amber-700',
  Maintenance: 'border-sky-200 bg-sky-50 text-sky-700',
  Électricité: 'border-violet-200 bg-violet-50 text-violet-700',
  Sécurité: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

const statutColors: Record<string, string> = {
  'En cours': 'border-indigo-200 bg-indigo-50 text-indigo-700',
  Confirmée: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Planifiée: 'border-sky-200 bg-sky-50 text-sky-700',
}

const domaines = ['Toutes', 'Turbines à gaz', 'Maintenance', 'Électricité', 'Sécurité']

export const sessionsOuvertes = sessions.filter(
  (s) => s.statut === 'En cours' || s.statut === 'Confirmée' || s.statut === 'Planifiée',
)

export default function Formations() {
  const [domaine, setDomaine] = useState('Toutes')

  const liste = useMemo(
    () => (domaine === 'Toutes' ? trainings : trainings.filter((t) => t.domaine === domaine)),
    [domaine],
  )

  return (
    <div>
      {/* ── Bandeau ── */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <GraduationCap className="h-3.5 w-3.5" />
            Centre de formation agréé
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Catalogue des formations</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Choisissez une formation, consultez les sessions programmées et inscrivez-vous en ligne.
            Attestation délivrée en fin de parcours.
          </p>
        </div>
      </section>

      {/* ── Sessions en cours et à venir ── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-lg font-semibold text-slate-900">Sessions en cours et à venir</h2>
        <p className="mt-1 text-sm text-slate-500">Les prochaines dates programmées par notre équipe.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessionsOuvertes.map((s) => {
            const t = trainings.find((x) => x.id === s.trainingId)
            if (!t) return null
            const restantes = s.placesMax - s.inscrits
            return (
              <Link
                key={s.id}
                to={`/formations/${t.id}`}
                className="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-500">{s.numero}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${statutColors[s.statut]}`}>
                    {s.statut}
                  </span>
                </div>
                <p className="mt-2.5 text-sm font-semibold text-slate-900">
                  {t.code} — {t.intitule}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                    Du {fmtDateShort(s.debut)} au {fmtDateShort(s.fin)}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {s.lieu}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    {restantes > 0
                      ? `${restantes} place${restantes > 1 ? 's' : ''} restante${restantes > 1 ? 's' : ''}`
                      : 'Session complète — liste d\u2019attente'}
                    {s.listeAttente > 0 && ` · ${s.listeAttente} en attente`}
                  </li>
                </ul>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Catalogue ── */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Toutes les formations</h2>
            <div className="flex flex-wrap gap-1.5">
              {domaines.map((d) => (
                <button
                  key={d}
                  onClick={() => setDomaine(d)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    domaine === d
                      ? 'bg-amber-500 text-teal-950'
                      : 'border border-slate-300 text-slate-600 hover:border-teal-500 hover:text-teal-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liste.map((t) => {
              const prochaines = sessionsOuvertes.filter((s) => s.trainingId === t.id)
              return (
                <div
                  key={t.id}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-md bg-teal-800 px-2 py-1 font-mono text-xs font-semibold text-white">
                      {t.code}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${domaineColors[t.domaine]}`}>
                      {t.domaine}
                    </span>
                  </div>

                  <h3 className="mt-3 font-semibold text-slate-900">{t.intitule}</h3>
                  <p className="mt-1 text-xs text-slate-500">Public : {t.public}</p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {t.dureeJours} jour{t.dureeJours > 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                      {prochaines.length > 0
                        ? `${prochaines.length} session${prochaines.length > 1 ? 's' : ''} à venir`
                        : 'Sur demande'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 text-center">
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Inter / stagiaire</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{fmtFCFA(t.prixInter)}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Forfait intra</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{fmtFCFA(t.forfaitIntra)}</p>
                    </div>
                  </div>

                  <Link
                    to={`/formations/${t.id}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
                  >
                    Voir & s'inscrire
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
