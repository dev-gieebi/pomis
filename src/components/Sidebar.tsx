import { Link, NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, Briefcase, Receipt,
  Wrench, CalendarDays, Cpu,
  GraduationCap, CalendarRange, UserCheck, Award,
  Package, ArrowLeftRight, Truck, ScrollText, Settings,
} from 'lucide-react'
import logo from '../assets/logo.png'

interface NavItem {
  to: string
  label: string
  icon: typeof LayoutDashboard
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    title: 'Pilotage',
    items: [{ to: '/app', label: 'Tableau de bord', icon: LayoutDashboard }],
  },
  {
    title: 'Commercial',
    items: [
      { to: '/app/clients', label: 'Clients', icon: Users },
      { to: '/app/devis', label: 'Devis', icon: FileText },
      { to: '/app/contrats', label: 'Contrats', icon: Briefcase },
      { to: '/app/factures', label: 'Factures & paiements', icon: Receipt },
    ],
  },
  {
    title: 'Maintenance',
    items: [
      { to: '/app/interventions', label: 'Interventions', icon: Wrench },
      { to: '/app/planning', label: 'Planning', icon: CalendarDays },
      { to: '/app/equipements', label: 'Équipements', icon: Cpu },
    ],
  },
  {
    title: 'Formations',
    items: [
      { to: '/app/formations/catalogue', label: 'Catalogue', icon: GraduationCap },
      { to: '/app/formations/sessions', label: 'Sessions', icon: CalendarRange },
      { to: '/app/formations/stagiaires', label: 'Stagiaires', icon: UserCheck },
      { to: '/app/formations/attestations', label: 'Attestations', icon: Award },
    ],
  },
  {
    title: 'Stock',
    items: [
      { to: '/app/stock/articles', label: 'Articles', icon: Package },
      { to: '/app/stock/mouvements', label: 'Mouvements', icon: ArrowLeftRight },
      { to: '/app/stock/fournisseurs', label: 'Fournisseurs', icon: Truck },
    ],
  },
  {
    title: 'Système',
    items: [
      { to: '/app/journal', label: 'Journal d\'activité', icon: ScrollText },
      { to: '/app/parametres', label: 'Paramètres', icon: Settings },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white text-slate-600">
      <Link to="/" className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
        <img src={logo} alt="PROMI&S" className="h-11 w-auto object-contain" />
        <p className="text-[10px] leading-tight text-slate-500">Maintenance Industrielle<br />& Services</p>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((g) => (
          <div key={g.title} className="mb-4">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {g.title}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/app'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-amber-50 font-medium text-amber-700 ring-1 ring-inset ring-amber-200'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 px-5 py-3">
        <p className="text-[10px] text-slate-500">Version MVP — prototype UI</p>
      </div>
    </aside>
  )
}
