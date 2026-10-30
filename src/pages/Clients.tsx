import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Plus } from 'lucide-react'
import { clients, interventions, invoices, quotes } from '../data/mock'
import { fmtFCFA } from '../lib/format'
import { Badge, Button, DataTable, FilterTabs, PageHeader } from '../components/ui'

export default function Clients() {
  const nav = useNavigate()
  const [filter, setFilter] = useState('Tous')
  const rows = clients.filter((c) => filter === 'Tous' || c.type === filter)

  return (
    <div>
      <PageHeader
        title="Clients"
        subtitle={`${clients.filter((c) => c.type === 'Client').length} clients · ${clients.filter((c) => c.type === 'Prospect').length} prospect`}
        actions={<Button><Plus className="h-4 w-4" /> Nouveau client</Button>}
      />

      <div className="mb-4">
        <FilterTabs options={['Tous', 'Client', 'Prospect']} value={filter} onChange={setFilter} />
      </div>

      <DataTable
        rows={rows}
        onRowClick={(c) => nav(`/app/clients/${c.id}`)}
        columns={[
          {
            header: 'Client',
            cell: (c) => (
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium text-slate-800">{c.raisonSociale}</p>
                  <p className="text-xs text-slate-400">{c.secteur}</p>
                </div>
              </div>
            ),
          },
          { header: 'Statut', cell: (c) => <Badge tone={c.type}>{c.type}</Badge> },
          {
            header: 'Sites / contacts',
            cell: (c) => (
              <span className="text-slate-600">
                {c.sites.length} site{c.sites.length > 1 ? 's' : ''} · {c.contacts.length} contact{c.contacts.length > 1 ? 's' : ''}
              </span>
            ),
          },
          {
            header: 'Activité',
            cell: (c) => {
              const d = quotes.filter((q) => q.clientId === c.id).length
              const i = interventions.filter((x) => x.clientId === c.id).length
              return <span className="text-slate-600">{d} devis · {i} interventions</span>
            },
          },
          {
            header: 'Solde dû',
            className: 'text-right',
            cell: (c) =>
              c.soldeDu > 0 ? (
                <span className="font-semibold text-rose-600">{fmtFCFA(c.soldeDu)}</span>
              ) : (
                <span className="text-slate-400">—</span>
              ),
          },
        ]}
      />
    </div>
  )
}

export function ClientDetail({ id }: { id: number }) {
  const nav = useNavigate()
  const client = clients.find((c) => c.id === id)
  const [tab, setTab] = useState('Aperçu')

  if (!client) {
    return (
      <div>
        <PageHeader title="Client introuvable" />
        <Button variant="secondary" onClick={() => nav('/app/clients')}>← Retour</Button>
      </div>
    )
  }

  const clientQuotes = quotes.filter((q) => q.clientId === id)
  const clientInvoices = invoices.filter((i) => i.clientId === id)
  const clientInterventions = interventions.filter((i) => i.clientId === id)

  return (
    <div>
      <button onClick={() => nav('/app/clients')} className="mb-3 text-sm text-slate-500 hover:text-slate-800">
        ← Retour aux clients
      </button>
      <PageHeader
        title={client.raisonSociale}
        subtitle={`${client.secteur} · ${client.adresse}`}
        actions={
          <>
            <Button variant="secondary">Nouveau devis</Button>
            <Button>Nouvelle demande</Button>
          </>
        }
      />

      <div className="mb-4 flex items-center gap-3">
        <Badge tone={client.type}>{client.type}</Badge>
        <span className="text-xs text-slate-400">NIF {client.nif} · RCCM {client.rccm}</span>
        {client.soldeDu > 0 && (
          <span className="ml-auto text-sm">Solde dû : <strong className="text-rose-600">{fmtFCFA(client.soldeDu)}</strong></span>
        )}
      </div>

      <div className="mb-4">
        <FilterTabs
          options={['Aperçu', 'Devis', 'Factures', 'Interventions', 'Formations']}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === 'Aperçu' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Sites</h3>
            <ul className="space-y-2 text-sm">
              {client.sites.map((s) => (
                <li key={s.id} className="flex justify-between">
                  <span className="font-medium text-slate-700">{s.nom}</span>
                  <span className="text-slate-400">{s.ville}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Contacts</h3>
            <ul className="space-y-3 text-sm">
              {client.contacts.map((c) => (
                <li key={c.id}>
                  <p className="font-medium text-slate-700">{c.nom} <span className="font-normal text-slate-400">— {c.fonction}</span></p>
                  <p className="text-xs text-slate-500">{c.tel} · {c.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === 'Devis' && (
        <DataTable
          rows={clientQuotes}
          empty="Aucun devis pour ce client"
          columns={[
            { header: 'N°', cell: (q) => <span className="font-medium">{q.numero}</span> },
            { header: 'Objet', cell: (q) => <span className="text-slate-600">{q.objet}</span> },
            { header: 'Montant HT', className: 'text-right', cell: (q) => fmtFCFA(q.montantHT) },
            { header: 'Statut', cell: (q) => <Badge tone={q.statut}>{q.statut}</Badge> },
          ]}
        />
      )}

      {tab === 'Factures' && (
        <DataTable
          rows={clientInvoices}
          empty="Aucune facture pour ce client"
          columns={[
            { header: 'N°', cell: (i) => <span className="font-medium">{i.numero}</span> },
            { header: 'Origine', cell: (i) => <span className="text-slate-600">{i.origine}</span> },
            { header: 'TTC', className: 'text-right', cell: (i) => fmtFCFA(i.montantTTC) },
            { header: 'Payé', className: 'text-right', cell: (i) => fmtFCFA(i.montantPaye) },
            { header: 'Statut', cell: (i) => <Badge tone={i.statut}>{i.statut}</Badge> },
          ]}
        />
      )}

      {tab === 'Interventions' && (
        <DataTable
          rows={clientInterventions}
          empty="Aucune intervention pour ce client"
          columns={[
            { header: 'N°', cell: (i) => <span className="font-medium">{i.numero}</span> },
            { header: 'Description', cell: (i) => <span className="text-slate-600">{i.description}</span> },
            { header: 'Type', cell: (i) => i.type },
            { header: 'Statut', cell: (i) => <Badge tone={i.statut}>{i.statut}</Badge> },
          ]}
        />
      )}

      {tab === 'Formations' && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400">
          Historique des stagiaires formés pour ce client (voir module Formations → Stagiaires).
        </div>
      )}
    </div>
  )
}
