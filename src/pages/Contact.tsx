import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react'


const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'

const labelCls = 'block text-xs font-medium text-slate-600'

const coordonnees = [
  { icon: Phone, label: 'Téléphone', value: '+241 66201700 / 66079888' },
  { icon: Mail, label: 'E-mail', value: 'contact@promis.com' },
  { icon: MapPin, label: 'Adresse', value: 'Cuvette Centrale, Port- Gentil 2789' },
]

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: 'Maintenance', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* ── Bandeau ── */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <Phone className="h-3.5 w-3.5" />
            Réponse sous 24 h
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Contactez-nous
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Un projet de maintenance, une urgence, une formation sur mesure ?
            Notre équipe vous répond rapidement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {sent ? (
          <div>
            <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900">Message envoyé</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Merci {form.nom} ! Votre message a bien été reçu. Un membre de notre équipe
                vous recontactera sous 24 h à l'adresse{' '}
                <span className="font-medium text-slate-900">{form.email}</span>.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
              >
                Retour à l'accueil <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-5">
            {/* ── Coordonnées ── */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">Nos coordonnées</h2>
              <ul className="mt-6 space-y-5">
                {coordonnees.map((c) => (
                  <li key={c.label} className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{c.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-800">{c.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-teal-100 bg-teal-50 p-5">
                <p className="text-sm font-semibold text-teal-800">Urgence maintenance ?</p>
                <p className="mt-1 text-xs leading-relaxed text-teal-700">
                  Pour les clients sous contrat d'astreinte, notre ligne prioritaire
                  est disponible 24 h / 7 j.
                </p>
              </div>
            </div>

            {/* ── Formulaire ── */}
            <div className="lg:col-span-3">
              <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-slate-900">Envoyez-nous un message</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Nom complet *</label>
                    <input required value={form.nom} onChange={set('nom')} className={`${inputCls} mt-1.5`} placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className={labelCls}>Adresse e-mail *</label>
                    <input required type="email" value={form.email} onChange={set('email')} className={`${inputCls} mt-1.5`} placeholder="vous@entreprise.com" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={labelCls}>Sujet *</label>
                  <select required value={form.sujet} onChange={set('sujet')} className={`${inputCls} mt-1.5`}>
                    <option>Maintenance</option>
                    <option>Dépannage / urgence</option>
                    <option>Contrat d'astreinte</option>
                    <option>Formation</option>
                    <option>Pièces de rechange</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className={labelCls}>Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputCls} mt-1.5 resize-none`}
                    placeholder="Décrivez votre besoin…"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
                >
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
