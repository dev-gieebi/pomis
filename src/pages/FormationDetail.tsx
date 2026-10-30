import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CalendarDays, MapPin, Users, Clock,
  CheckCircle2, GraduationCap, Send,
} from 'lucide-react'
import { trainings } from '../data/mock'
import { fmtDateShort, fmtFCFA } from '../lib/format'
import { sessionsOuvertes } from './Formations'

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'

const labelCls = 'block text-xs font-medium text-slate-600'

export default function FormationDetail() {
  const { id } = useParams()
  const training = trainings.find((t) => t.id === Number(id))

  const [sessionId, setSessionId] = useState<number | 'demande'>(0)
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', tel: '', entreprise: '', fonction: '', message: '',
  })
  const [sent, setSent] = useState(false)

  if (!training) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Formation introuvable</h1>
        <Link to="/formations" className="mt-4 inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-800">
          <ArrowLeft className="h-4 w-4" /> Retour au catalogue
        </Link>
      </div>
    )
  }

  const sessionsDeLaFormation = sessionsOuvertes.filter((s) => s.trainingId === training.id)

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/formations" className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-teal-700">
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      {sent ? (
        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Demande d'inscription envoyée</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Merci {form.prenom} ! Votre demande pour la formation{' '}
            <span className="font-medium text-slate-900">{training.code} — {training.intitule}</span> a
            bien été enregistrée. Notre responsable formation vous contactera sous 24 h à
            l'adresse <span className="font-medium text-slate-900">{form.email}</span>.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/formations"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 transition hover:border-teal-500 hover:text-teal-700"
            >
              Autres formations
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
            >
              Retour à l'accueil <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-10 lg:grid-cols-5">
          {/* ── Présentation ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-teal-800 px-2.5 py-1 font-mono text-sm font-semibold text-white">
                {training.code}
              </span>
              <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                {training.domaine}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">{training.intitule}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Formation animée par nos formateurs certifiés, alternant apports théoriques et
              travaux pratiques sur nos plateaux techniques. Attestation de fin de formation délivrée.
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <Users className="h-4 w-4 text-amber-500" />
                <span><span className="text-slate-500">Public :</span> {training.public}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Clock className="h-4 w-4 text-amber-500" />
                <span><span className="text-slate-500">Durée :</span> {training.dureeJours} jour{training.dureeJours > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <GraduationCap className="h-4 w-4 text-amber-500" />
                <span><span className="text-slate-500">Attestation :</span> délivrée en fin de parcours</span>
              </div>
            </dl>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Inter / stagiaire</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{fmtFCFA(training.prixInter)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Forfait intra</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{fmtFCFA(training.forfaitIntra)}</p>
              </div>
            </div>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Sessions programmées
            </h2>
            <ul className="mt-3 space-y-3">
              {sessionsDeLaFormation.length === 0 && (
                <li className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                  Aucune session programmée pour le moment — inscrivez-vous à une demande de session
                  et nous vous recontacterons.
                </li>
              )}
              {sessionsDeLaFormation.map((s) => {
                const restantes = s.placesMax - s.inscrits
                return (
                  <li key={s.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-500">{s.numero} · {s.type}</span>
                      <span className={`text-xs font-medium ${restantes > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {restantes > 0 ? `${restantes} place${restantes > 1 ? 's' : ''} restante${restantes > 1 ? 's' : ''}` : 'Complet'}
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      Du {fmtDateShort(s.debut)} au {fmtDateShort(s.fin)}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {s.lieu}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ── Formulaire d'inscription ── */}
          <div className="lg:col-span-3">
            <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">S'inscrire à cette formation</h2>
              <p className="mt-1 text-xs text-slate-500">
                Remplissez le formulaire — notre équipe confirme votre inscription sous 24 h.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Prénom *</label>
                  <input required value={form.prenom} onChange={set('prenom')} className={`${inputCls} mt-1.5`} placeholder="Amadou" />
                </div>
                <div>
                  <label className={labelCls}>Nom *</label>
                  <input required value={form.nom} onChange={set('nom')} className={`${inputCls} mt-1.5`} placeholder="Diop" />
                </div>
                <div>
                  <label className={labelCls}>Adresse e-mail *</label>
                  <input required type="email" value={form.email} onChange={set('email')} className={`${inputCls} mt-1.5`} placeholder="vous@entreprise.com" />
                </div>
                <div>
                  <label className={labelCls}>Téléphone *</label>
                  <input required type="tel" value={form.tel} onChange={set('tel')} className={`${inputCls} mt-1.5`} placeholder="+221 77 000 00 00" />
                </div>
                <div>
                  <label className={labelCls}>Entreprise</label>
                  <input value={form.entreprise} onChange={set('entreprise')} className={`${inputCls} mt-1.5`} placeholder="Nom de votre société" />
                </div>
                <div>
                  <label className={labelCls}>Fonction</label>
                  <input value={form.fonction} onChange={set('fonction')} className={`${inputCls} mt-1.5`} placeholder="Technicien maintenance" />
                </div>
              </div>

              <div className="mt-5">
                <label className={labelCls}>Session souhaitée *</label>
                <div className="mt-2 space-y-2">
                  {sessionsDeLaFormation.map((s) => {
                    const complet = s.inscrits >= s.placesMax
                    return (
                      <label
                        key={s.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition ${
                          sessionId === s.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-slate-300 bg-white hover:border-teal-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="session"
                          required
                          value={s.id}
                          checked={sessionId === s.id}
                          onChange={() => setSessionId(s.id)}
                          className="mt-1 accent-amber-500"
                        />
                        <span className="text-sm">
                          <span className="font-medium text-slate-800">
                            Du {fmtDateShort(s.debut)} au {fmtDateShort(s.fin)}
                          </span>
                          <span className="block text-xs text-slate-500">
                            {s.lieu} · {s.type}
                            {complet ? ' · complet (liste d\u2019attente)' : ''}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition ${
                      sessionId === 'demande'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-slate-300 bg-white hover:border-teal-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="session"
                      required
                      checked={sessionId === 'demande'}
                      onChange={() => setSessionId('demande')}
                      className="mt-1 accent-amber-500"
                    />
                    <span className="text-sm">
                      <span className="font-medium text-slate-800">Demande de session</span>
                      <span className="block text-xs text-slate-500">
                        Date flexible — nous vous proposerons la prochaine session ou une session intra pour votre équipe.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelCls}>Message (optionnel)</label>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={3}
                  className={`${inputCls} mt-1.5 resize-none`}
                  placeholder="Nombre de participants, contraintes de dates, demande intra-entreprise…"
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
              >
                <Send className="h-4 w-4" />
                Envoyer ma demande d'inscription
              </button>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                Sans engagement — la session est confirmée après validation de notre équipe.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
