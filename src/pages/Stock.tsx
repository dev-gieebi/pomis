import { useState } from 'react'
import { AlertTriangle, Plus } from 'lucide-react'
import { items } from '../data/mock'
import { fmtFCFA } from '../lib/format'
import { Badge, Button, DataTable, FilterTabs, PageHeader, Stat } from '../components/ui'

const cats = ['Tous', 'Filtres', 'Joints', 'Roulements', 'Étanchéité', 'Consommables', 'Électricité', 'Instrumentation']

export default function Stock() {
  const [filter, setFilter] = useState('Tous')
  const [magasin, setMagasin] = useState('Tous')
  const magasins = ['Tous', ...new Set(items.map((i) => i.magasin))]
  const rows = items.filter(
    (i) => (filter === 'Tous' || i.categorie === filter) && (magasin === 'Tous' || i.magasin === magasin),
  )

  const valeurStock = items.reduce((s, i) => s + i.stock * i.prixAchat, 0)
  const sousSeuil = items.filter((i) => i.stock <= i.seuilAlerte)

  return (
    <div>
      <PageHeader
        title="Stock pièces détachées"
        subtitle="Quantité, valeur (coût moyen pondéré) et traçabilité par intervention"
        actions={<Button><Plus className="h-4 w-4" /> Nouvel article</Button>}
      />

      <div className="mb-5 grid grid-cols-3 gap-4">
        <Stat label="Valeur du stock" value={fmtFCFA(valeurStock)} sub={`${items.length} références · ${magasins.length - 1} magasins`} />
        <Stat
          label="Sous seuil d'alerte"
          value={String(sousSeuil.length)}
          accent="text-rose-600"
          sub="Suggestion de commande automatique"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <Stat label="Sans mouvement > 6 mois" value="1" sub="CAP-VIB-01 — capteur proximiteur" />
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs options={cats} value={filter} onChange={setFilter} />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Magasin :</span>
          <FilterTabs options={magasins} value={magasin} onChange={setMagasin} />
        </div>
      </div>

      <DataTable
        rows={rows}
        columns={[
          {
            header: 'Article',
            cell: (i) => (
              <div className="max-w-72">
                <p className="font-medium text-slate-800">{i.designation}</p>
                <p className="text-xs text-slate-400">
                  {i.refInterne} · fabricant {i.refFabricant}
                </p>
              </div>
            ),
          },
          { header: 'Catégorie', cell: (i) => <Badge>{i.categorie}</Badge> },
          { header: 'Magasin', cell: (i) => <span className="text-slate-600">{i.magasin}</span> },
          {
            header: 'Stock',
            className: 'text-right',
            cell: (i) => (
              <div className={i.stock <= i.seuilAlerte ? 'font-bold text-rose-600' : 'font-medium text-slate-800'}>
                {i.stock} {i.unite}{i.stock > 1 ? 's' : ''}
                {i.stock <= i.seuilAlerte && (
                  <p className="text-[10px] font-semibold uppercase">seuil {i.seuilAlerte}</p>
                )}
              </div>
            ),
          },
          { header: 'Prix achat', className: 'text-right', cell: (i) => fmtFCFA(i.prixAchat) },
          { header: 'Prix vente', className: 'text-right', cell: (i) => fmtFCFA(i.prixVente) },
          {
            header: 'Valeur',
            className: 'text-right',
            cell: (i) => <span className="font-medium">{fmtFCFA(i.stock * i.prixAchat)}</span>,
          },
        ]}
      />
    </div>
  )
}
