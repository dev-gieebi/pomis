import { Link, NavLink, Outlet } from 'react-router-dom'
import { Zap, ArrowRight } from 'lucide-react'
import ScrollFab from './ScrollFab'

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/services', label: 'Services', end: false },
  { to: '/formations', label: 'Formations', end: false },
  { to: '/a-propos', label: 'À propos', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

const navBase =
  'relative py-1 text-sm transition after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-amber-500 after:transition-all after:duration-300'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <ScrollFab />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
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

          <nav className="ml-auto hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `${navBase} ${
                    isActive
                      ? 'font-medium text-teal-800 after:w-full'
                      : 'text-slate-600 after:w-0 hover:text-teal-800 hover:after:w-full'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
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
          <nav className="flex flex-wrap gap-5 text-xs text-slate-500">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="transition hover:text-teal-700">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} PROMI&S. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
