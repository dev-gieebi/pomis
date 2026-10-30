import { users } from '../data/mock'
import { Avatar, Badge, Button, Card, DataTable, PageHeader, SectionTitle } from '../components/ui'

const roleColors: Record<string, string> = {
  'Super administrateur': 'bg-teal-800 text-white ring-teal-700',
  'Direction': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Commercial': 'bg-sky-50 text-sky-700 ring-sky-200',
  'Comptable': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Responsable maintenance': 'bg-rose-50 text-rose-700 ring-rose-200',
  'Technicien': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  'Responsable formation': 'bg-violet-50 text-violet-700 ring-violet-200',
  'Formateur': 'bg-purple-50 text-purple-700 ring-purple-200',
  'Magasinier': 'bg-teal-50 text-teal-700 ring-teal-200',
}

export default function Parametres() {
  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Configuration de la plateforme — réservé au super administrateur" />

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Entreprise */}
        <Card className="p-5">
          <SectionTitle>Informations PROMI&S</SectionTitle>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Raison sociale</dt>
              <dd className="font-medium text-slate-700">PROMI&S SARL</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Activité</dt>
              <dd className="font-medium text-slate-700">Maintenance industrielle & services</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Devise / langue</dt>
              <dd className="font-medium text-slate-700">FCFA · Français</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Taux de TVA</dt>
              <dd className="font-medium text-slate-700">18 %</dd>
            </div>
          </dl>
        </Card>

        {/* Seuils et règles */}
        <Card className="p-5">
          <SectionTitle>Seuils de validation</SectionTitle>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Validation Direction — devis</dt>
              <dd className="font-medium text-slate-700">&gt; 10 000 000 FCFA</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Validation Direction — remise</dt>
              <dd className="font-medium text-slate-700">&gt; 5 %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Alerte fin de contrat</dt>
              <dd className="font-medium text-slate-700">60 et 30 jours</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Présence minimale attestation</dt>
              <dd className="font-medium text-slate-700">80 % des demi-journées</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Verrouillage compte</dt>
              <dd className="font-medium text-slate-700">après 5 échecs de connexion</dd>
            </div>
          </dl>
        </Card>

        {/* Numérotation */}
        <Card className="p-5">
          <SectionTitle>Numérotations</SectionTitle>
          <dl className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <dt className="font-sans text-slate-400">Devis</dt>
              <dd className="font-medium text-slate-700">DEV-2026-XXXX</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-sans text-slate-400">Factures</dt>
              <dd className="font-medium text-slate-700">FAC-2026-XXXX</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-sans text-slate-400">Interventions</dt>
              <dd className="font-medium text-slate-700">INT-2026-XXXX</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-sans text-slate-400">Sessions</dt>
              <dd className="font-medium text-slate-700">SES-2026-XXXX</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-sans text-slate-400">Attestations</dt>
              <dd className="font-medium text-slate-700">ATT-2026-XXXX</dd>
            </div>
          </dl>
        </Card>

        {/* Modèles de documents */}
        <Card className="p-5">
          <SectionTitle>Modèles de documents</SectionTitle>
          <ul className="space-y-2 text-sm text-slate-600">
            {['Devis PDF — en-tête PROMI&S', 'Facture + avoir', 'Rapport d\'intervention (signature client)', 'Convocation stagiaire', 'Feuille de présence par demi-journée', 'Attestation avec QR code'].map((m) => (
              <li key={m} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>{m}</span>
                <span className="text-xs font-medium text-teal-600">Modifier</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Comptes utilisateurs */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>Comptes utilisateurs et rôles</SectionTitle>
          <Button variant="secondary">+ Nouveau compte</Button>
        </div>
        <DataTable
          rows={users}
          columns={[
            {
              header: 'Utilisateur',
              cell: (u) => (
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} />
                  <div>
                    <p className="font-medium text-slate-800">{u.name}</p>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </div>
                </div>
              ),
            },
            {
              header: 'Rôles',
              cell: (u) => (
                <div className="flex flex-wrap gap-1">
                  {u.roles.map((r) => (
                    <span key={r} className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${roleColors[r]}`}>
                      {r}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              header: 'Statut',
              cell: (u) => <Badge tone={u.active ? 'Actif' : 'Annulée'}>{u.active ? 'Actif' : 'Désactivé'}</Badge>,
            },
          ]}
        />
        <p className="mt-3 text-xs text-slate-400">
          Une même personne peut cumuler plusieurs rôles (ex. J.-M. Baye : Technicien + Formateur).
        </p>
      </div>
    </div>
  )
}
