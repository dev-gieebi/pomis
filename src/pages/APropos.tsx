import { Link } from 'react-router-dom'
import { Zap, Target, Eye, HeartHandshake, ArrowRight } from 'lucide-react'


const valeurs = [
  {
    icon: Zap,
    title: 'Réactivité',
    text: 'Des délais d\u2019intervention courts et des équipes mobilisables à tout moment.',
  },
  {
    icon: Target,
    title: 'Rigueur',
    text: 'Chaque intervention est documentée, chaque rapport est tracé et vérifiable.',
  },
  {
    icon: HeartHandshake,
    title: 'Partenariat',
    text: 'Nous construisons des relations durables avec nos clients, pas des prestations ponctuelles.',
  },
]

const chiffres = [
  { value: 10, suffix: '+', label: 'Années d\u2019expérience' },
  { value: 120, suffix: '+', label: 'Interventions par an' },
  { value: 40, suffix: '+', label: 'Clients accompagnés' },
  { value: 300, suffix: '+', label: 'Stagiaires formés' },
]

export default function APropos() {
  return (
    <div>
      {/* ── Bandeau ── */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <Eye className="h-3.5 w-3.5" />
            Qui sommes-nous
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            À propos de PROMI<span className="text-amber-500">&</span>S
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Maintenance Industrielle & Services — le partenaire de confiance des sites
            industriels d'Afrique de l'Ouest.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Notre mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              PROMI&S est née d'un constat simple : les sites industriels ont besoin d'un
              partenaire unique capable d'assurer la maintenance de leurs équipements,
              la formation de leurs équipes et l'approvisionnement en pièces de rechange —
              avec un seul interlocuteur et un seul niveau d'exigence.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Nos techniciens et formateurs certifiés interviennent sur les centrales,
              cimenteries, mines et installations pétrolières de la sous-région, avec la
              même promesse : la disponibilité de vos installations, sans interruption.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {chiffres.map((c) => (
                <div key={c.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <p className="text-3xl font-bold text-teal-700">
                    {c.value}{c.suffix}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Nos valeurs</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Trois principes guident chacune de nos interventions.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {valeurs.map((v, i) => (
              <div key={v.title}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-400">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-200 bg-teal-950">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Envie de travailler avec nous ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
              Parlons de vos équipements, de vos contrats ou de vos besoins en formation.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
            >
              Prendre contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
