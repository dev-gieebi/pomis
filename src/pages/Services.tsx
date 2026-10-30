import { Link } from 'react-router-dom'
import {
  Wrench, CalendarClock, ShieldCheck, GraduationCap, Package,
  ArrowRight, CheckCircle2,
} from 'lucide-react'


const services = [
  {
    icon: Wrench,
    title: 'Maintenance préventive',
    text: 'Un programme de visites planifiées adapté à vos équipements pour éviter les arrêts de production et prolonger leur durée de vie.',
    points: ['Plan de maintenance sur mesure', 'Rapport détaillé après chaque visite', 'Historique complet par équipement'],
  },
  {
    icon: CalendarClock,
    title: 'Dépannage & interventions',
    text: 'Des équipes techniques réactives pour vos pannes, urgences et interventions curatives, sur site ou en atelier.',
    points: ['Priorité aux urgences critiques', 'Techniciens certifiés multi-marques', 'Pièces de rechange disponibles en stock'],
  },
  {
    icon: ShieldCheck,
    title: "Contrats d'astreinte",
    text: 'Une couverture continue avec technicien de garde et engagement contractuel de délai d\u2019intervention.',
    points: ['Disponibilité 24 h / 7 j', 'Délais d\u2019intervention garantis', 'Visites de contrôle incluses'],
  },
  {
    icon: GraduationCap,
    title: 'Formations professionnelles',
    text: 'Sessions intra et inter-entreprises animées par des formateurs certifiés, avec attestation en fin de parcours.',
    points: ['Catalogue en ligne et inscription directe', 'Formations intra sur vos sites', 'Attestations vérifiables'],
    link: '/formations',
  },
  {
    icon: Package,
    title: 'Pièces de rechange',
    text: 'Un stock de pièces d\u2019origine géré en interne pour des remplacements rapides, garantis et tracés.',
    points: ['Pièces d\u2019origine constructeur', 'Gestion des seuils et réappro', 'Traçabilité par intervention'],
  },
]

export default function Services() {
  return (
    <div>
      {/* ── Bandeau ── */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <Wrench className="h-3.5 w-3.5" />
            Nos savoir-faire
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Nos services
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            De la maintenance préventive à l'astreinte 24/7, une offre complète pour garantir
            la disponibilité de vos installations.
          </p>
        </div>
      </section>

      {/* ── Services détaillés ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-6">
          {services.map((s) => (
            <div key={s.title}>
              <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <s.icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">{s.text}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={s.link ?? '/contact'}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
                >
                  {s.link ? 'Voir le catalogue' : 'Demander un devis'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-200 bg-teal-950">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Un besoin spécifique ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
              Décrivez-nous votre installation et vos contraintes — nous construisons
              la solution de maintenance adaptée.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
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
