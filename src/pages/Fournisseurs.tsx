import { Plus } from 'lucide-react'
import { suppliers } from '../data/mock'
import { Badge, Button, Card, PageHeader } from '../components/ui'

export default function Fournisseurs() {
  return (
    <div>
      <PageHeader
        title="Fournisseurs"
        subtitle="Bons de commande, réceptions et rapprochement factures fournisseurs"
        actions={<Button><Plus className="h-4 w-4" /> Nouveau fournisseur</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {suppliers.map((s) => (
          <Card key={s.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">{s.nom}</h3>
                <p className="mt-0.5 text-sm text-slate-500">{s.contact}</p>
              </div>
              <Badge tone={s.delaiJours <= 7 ? 'Payée' : s.delaiJours <= 14 ? 'Envoyé' : 'Partiellement payée'}>
                {s.delaiJours} j de délai
              </Badge>
            </div>
            <dl className="mt-4 space-y-1.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <dt className="text-slate-400">Téléphone</dt>
                <dd>{s.tel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">E-mail</dt>
                <dd className="text-teal-600">{s.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Articles fournis</dt>
                <dd>{s.articlesFournis} références</dd>
              </div>
            </dl>
            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
              <Button variant="secondary">Bon de commande</Button>
              <Button variant="ghost">Historique →</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
