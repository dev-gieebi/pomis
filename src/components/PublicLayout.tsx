import { Link, NavLink, Outlet } from 'react-router-dom'
import { Zap, ArrowRight } from 'lucide-react'
import FallingGears from './FallingGears'

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/formations', label: 'Formations', end: false },
]

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <FallingGears />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
              <Zap className="h-5 w-5 text-teal-950" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide text-teal-950">
                PROMI<span className="text-amber-500">&</span>S
              </p>
              <p className="text-[10px] leading-tight text-slate-500">Maintenance Industrielle & Services</p>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `transition ${isActive ? 'font-medium text-teal-700' : 'text-slate-600 hover:text-teal-700'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a href="/#contact" className="text-slate-600 transition hover:text-teal-700">Contact</a>
          </nav>

          <Link
            to="/connexion"
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-teal-950 transition hover:bg-amber-400 md:ml-4"
          >
            Se connecter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <div className="relative">
        <Outlet />
      </div>

      <footer className="relative border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500">
              <Zap className="h-4 w-4 text-teal-950" strokeWidth={2.5} />
            </div>
            <p className="text-sm font-semibold text-teal-950">
              PROMI<span className="text-amber-500">&</span>S
            </p>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PROMI&S — Maintenance Industrielle & Services. Tous droits réservés.
          </p>
          <Link to="/connexion" className="text-xs font-medium text-teal-700 hover:text-teal-800">
            Espace client →
          </Link>
        </div>
      </footer>
    </div>
  )
}
