import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Lock, Mail, ArrowLeft, LogIn } from 'lucide-react'

export default function Connexion() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/app')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500">
            <Zap className="h-6 w-6 text-teal-950" strokeWidth={2.5} />
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            PROMI<span className="text-amber-500">&</span>S
          </h1>
          <p className="mt-1 text-sm text-slate-500">Connectez-vous à votre espace</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <label className="block text-xs font-medium text-slate-600">Adresse e-mail</label>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@entreprise.com"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <label className="mt-4 block text-xs font-medium text-slate-600">Mot de passe</label>
          <div className="relative mt-1.5">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-teal-950 transition hover:bg-amber-400"
          >
            <LogIn className="h-4 w-4" />
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-teal-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au site
          </Link>
        </p>
      </div>
    </div>
  )
}
