import { activityLogs, userName } from '../data/mock'
import { fmtDateTime } from '../lib/format'
import { Avatar, Card, PageHeader } from '../components/ui'

export default function Journal() {
  return (
    <div>
      <PageHeader
        title="Journal d'activité"
        subtitle="Qui a créé, modifié, validé ou supprimé quoi, et quand"
      />

      <Card className="p-5">
        <ul className="relative space-y-0 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-slate-200">
          {activityLogs.map((l) => (
            <li key={l.id} className="relative flex gap-4 py-3 pl-1">
              <span className="relative z-10 mt-0.5">
                <Avatar name={userName(l.userId)} size="sm" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-800">
                  <span className="font-medium">{userName(l.userId)}</span> — {l.action}
                </p>
                <p className="text-sm text-slate-500">{l.cible}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{fmtDateTime(l.date)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
