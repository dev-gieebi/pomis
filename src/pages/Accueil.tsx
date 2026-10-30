import { Link } from 'react-router-dom'
import {
  Zap, Wrench, CalendarClock, ShieldCheck, GraduationCap,
  Package, ArrowRight, CheckCircle2, CalendarDays, Users,
} from 'lucide-react'
import { trainings } from '../data/mock'
import { fmtDateShort } from '../lib/format'
import { sessionsOuvertes } from './Formations'

const services = [
  { icon: Wrench, title: 'Maintenance préventive' },
  { icon: CalendarClock, title: 'Dépannage & interventions' },
  { icon: ShieldCheck, title: "Contrats d'astreinte" },
  { icon: GraduationCap, title: 'Formations professionnelles' },
  { icon: Package, title: 'Pièces de rechange' },
]

const stats = [
  { value: 120, suffix: '+', label: 'Interventions par an' },
  { value: 98, suffix: ' %', label: 'Taux de disponibilité' },
  { value: 15, suffix: '+', label: 'Techniciens certifiés' },
  { value: 24, suffix: '/7', label: 'Service d\u2019astreinte' },
]

const points = [
  'Rapport d\u2019intervention remis après chaque visite',
  'Devis et facturation transparents',
  'Équipements et historique suivis par client',
  'Attestations délivrées pour chaque formation',
]

const statutColors: Record<string, string> = {
  'En cours': 'border-indigo-200 bg-indigo-50 text-indigo-700',
  Confirmée: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Planifiée: 'border-sky-200 bg-sky-50 text-sky-700',
}

export default function Accueil() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <Zap className="h-3 w-3" />
              Expertise industrielle depuis plus de 10 ans
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              La maintenance industrielle,
              <span className="text-teal-700"> sans interruption.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
              PROMI&S accompagne vos sites industriels : maintenance préventive et curative,
              contrats d'astreinte, formation de vos équipes et gestion des pièces de rechange.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/connexion"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
              >
                Accéder à l'espace client
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>

          {/* ── Statistiques animées ── */}
          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-bold text-teal-700">
                  {s.value}{s.suffix}
                </p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services (aperçu) ── */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Nos services</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Une offre complète pour la disponibilité de vos installations et la
                  montée en compétence de vos équipes.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                Tous nos services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <Link
                key={s.title}
                to="/services"
                className="flex h-full flex-col items-start rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sessions de formation en cours / à venir ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Formations : sessions en cours et à venir</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Les prochaines sessions programmées par notre centre de formation. Places limitées.
              </p>
            </div>
            <Link
              to="/formations"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Voir tout le catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessionsOuvertes.slice(0, 6).map((s, i) => {
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
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                      {fmtDateShort(s.debut)} → {fmtDateShort(s.fin)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      {restantes > 0 ? `${restantes} place${restantes > 1 ? 's' : ''}` : 'Complet'}
                    </span>
                  </div>
                </Link>
            )
          })}
        </div>
      </section>

      {/* ── Engagement ── */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Un engagement de qualité</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Chaque intervention est tracée, chaque formation certifiée. Vos équipements sont
                référencés dans notre système pour un suivi complet de leur historique.
              </p>
              <ul className="mt-6 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-8">
                <GraduationCap className="h-8 w-8 text-teal-700" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Centre de formation agréé</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Sessions intra et inter-entreprises en électromécanique, hydraulique, pneumatique
                  et automatisme. Consultez le catalogue en ligne et inscrivez-vous directement,
                  attestations délivrées en fin de parcours.
                </p>
                <Link
                  to="/formations"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  Consulter le catalogue & s'inscrire
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="border-t border-slate-200 bg-teal-950">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Parlons de votre projet</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
              Besoin d'un contrat de maintenance, d'une intervention urgente ou d'une
              formation sur mesure ? Notre équipe vous répond sous 24 h.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
