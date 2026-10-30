import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, LogOut, Search } from 'lucide-react'
import { currentUser, notifications, userName } from '../data/mock'
import { fmtDateTime } from '../lib/format'
import { Avatar } from './ui'

export default function Topbar() {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter((n) => !n.lue).length

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Recherche globale — client, équipement, stagiaire, facture…"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-96 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  <span className="text-xs text-slate-400">{unread} non lues</span>
                </div>
                <ul className="max-h-96 divide-y divide-slate-100 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className={`flex gap-3 px-4 py-3 ${n.lue ? '' : 'bg-teal-50/40'}`}>
                      <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.lue ? 'bg-slate-200' : 'bg-teal-500'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">{n.titre}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">{n.detail}</p>
                        <p className="mt-1 text-[10px] text-slate-400">{fmtDateTime(n.date)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
          <Avatar name={currentUser.name} />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">{userName(currentUser.id)}</p>
            <p className="text-[11px] text-slate-500">{currentUser.roles.join(' · ')}</p>
          </div>
        </div>

        <Link
          to="/connexion"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-rose-600"
          aria-label="Déconnexion"
          title="Déconnexion"
        >
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  )
}
