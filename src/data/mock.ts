// ── Types ──────────────────────────────────────────────────────────────────

export type Role =
  | 'Super administrateur'
  | 'Direction'
  | 'Commercial'
  | 'Comptable'
  | 'Responsable maintenance'
  | 'Technicien'
  | 'Responsable formation'
  | 'Formateur'
  | 'Magasinier'

export interface User {
  id: number
  name: string
  email: string
  roles: Role[]
  active: boolean
}

export interface Client {
  id: number
  raisonSociale: string
  secteur: string
  nif: string
  rccm: string
  adresse: string
  type: 'Client' | 'Prospect'
  sites: { id: number; nom: string; ville: string }[]
  contacts: { id: number; nom: string; fonction: string; tel: string; email: string }[]
  soldeDu: number
}

export type QuoteStatus = 'Brouillon' | 'Envoyé' | 'Accepté' | 'Refusé' | 'Expiré'

export interface Quote {
  id: number
  numero: string
  clientId: number
  objet: string
  montantHT: number
  tva: number
  dateEmission: string
  dateValidite: string
  statut: QuoteStatus
  validationDirection: boolean
  remisePct: number
}

export interface Contract {
  id: number
  numero: string
  clientId: number
  type: 'Maintenance préventive' | 'Astreinte' | 'Mise à disposition'
  debut: string
  fin: string
  montant: number
  periodiciteFacturation: 'Mensuelle' | 'Trimestrielle' | 'Annuelle'
  visitesIncluses: number
  statut: 'Actif' | 'Expire bientôt' | 'Terminé'
}

export type InvoiceStatus = 'Brouillon' | 'Émise' | 'Partiellement payée' | 'Payée' | 'En retard'

export interface Invoice {
  id: number
  numero: string
  clientId: number
  origine: string
  montantTTC: number
  montantPaye: number
  dateEmission: string
  dateEcheance: string
  statut: InvoiceStatus
}

export type InterventionStatus =
  | 'Demandée'
  | 'Planifiée'
  | 'En cours'
  | 'Rapport saisi'
  | 'Validée'
  | 'Facturée'

export interface Intervention {
  id: number
  numero: string
  clientId: number
  equipementId: number
  type: 'Préventive' | 'Corrective' | 'Expertise' | 'Contrat'
  urgence: 'Normale' | 'Urgente' | 'Critique'
  description: string
  datePrevue: string
  techniciens: number[]
  statut: InterventionStatus
  rapportSaisi: boolean
  contratId?: number
}

export interface Equipment {
  id: number
  clientId: number
  site: string
  type: string
  marque: string
  modele: string
  numeroSerie: string
  miseEnService: string
  compteurHeures: number
  prochaineVisite: string
}

export interface Training {
  id: number
  code: string
  intitule: string
  domaine: 'Turbines à gaz' | 'Maintenance' | 'Électricité' | 'Sécurité'
  public: string
  dureeJours: number
  prixInter: number
  forfaitIntra: number
}

export type SessionStatus = 'Planifiée' | 'Confirmée' | 'En cours' | 'Terminée' | 'Annulée'

export interface TrainingSession {
  id: number
  numero: string
  trainingId: number
  type: 'Inter' | 'Intra'
  clientId?: number
  debut: string
  fin: string
  lieu: string
  formateurIds: number[]
  placesMin: number
  placesMax: number
  inscrits: number
  listeAttente: number
  statut: SessionStatus
}

export interface Trainee {
  id: number
  nom: string
  prenom: string
  clientId: number
  fonction: string
  tel: string
  email: string
  formationsSuivies: number
}

export interface Certificate {
  id: number
  numero: string
  traineeId: number
  sessionId: number
  dateDelivrance: string
  verificationCode: string
}

export interface Item {
  id: number
  refInterne: string
  refFabricant: string
  designation: string
  categorie: string
  unite: string
  prixAchat: number
  prixVente: number
  stock: number
  seuilAlerte: number
  magasin: string
}

export interface StockMovement {
  id: number
  itemId: number
  type: 'Entrée' | 'Sortie' | 'Retour' | 'Transfert' | 'Ajustement' | 'Réservation'
  quantite: number
  date: string
  motif: string
  intervention?: string
}

export interface Supplier {
  id: number
  nom: string
  contact: string
  tel: string
  email: string
  delaiJours: number
  articlesFournis: number
}

export interface ActivityLog {
  id: number
  userId: number
  action: string
  cible: string
  date: string
}

export interface AppNotification {
  id: number
  titre: string
  detail: string
  type: 'alerte' | 'info' | 'validation'
  date: string
  lue: boolean
}

// ── Utilisateurs ────────────────────────────────────────────────────────────

export const users: User[] = [
  { id: 1, name: 'Karim Ouedraogo', email: 'k.ouedraogo@promis.sn', roles: ['Super administrateur'], active: true },
  { id: 2, name: 'Awa Ndiaye', email: 'a.ndiaye@promis.sn', roles: ['Direction'], active: true },
  { id: 3, name: 'Moussa Traoré', email: 'm.traore@promis.sn', roles: ['Commercial'], active: true },
  { id: 4, name: 'Fatou Sarr', email: 'f.sarr@promis.sn', roles: ['Comptable'], active: true },
  { id: 5, name: 'Ibrahim Koné', email: 'i.kone@promis.sn', roles: ['Responsable maintenance'], active: true },
  { id: 6, name: 'Sekou Diallo', email: 's.diallo@promis.sn', roles: ['Technicien'], active: true },
  { id: 7, name: 'Jean-Marc Baye', email: 'jm.baye@promis.sn', roles: ['Technicien', 'Formateur'], active: true },
  { id: 8, name: 'Mariam Cissé', email: 'm.cisse@promis.sn', roles: ['Responsable formation'], active: true },
  { id: 9, name: 'Pauline Zongo', email: 'p.zongo@promis.sn', roles: ['Formateur'], active: true },
  { id: 10, name: 'Abdou Fall', email: 'a.fall@promis.sn', roles: ['Magasinier'], active: true },
]

export const currentUser = users[0]

export function userName(id: number): string {
  return users.find((u) => u.id === id)?.name ?? '—'
}

// ── Clients ─────────────────────────────────────────────────────────────────

export const clients: Client[] = [
  {
    id: 1,
    raisonSociale: 'Nexa Énergie SA',
    secteur: 'Énergie',
    nif: 'NIF-0021457-A',
    rccm: 'SN-DKR-2018-B-4521',
    adresse: 'Zone industrielle de Mbao, Dakar',
    type: 'Client',
    sites: [
      { id: 1, nom: 'Centrale de Bel Air', ville: 'Dakar' },
      { id: 2, nom: 'Poste de Tobène', ville: 'Thiès' },
    ],
    contacts: [
      { id: 1, nom: 'Omar Sy', fonction: 'Directeur de production', tel: '+221 77 410 22 18', email: 'o.sy@nexa-energie.sn' },
      { id: 2, nom: 'Aïssatou Ba', fonction: 'Ingénieure maintenance', tel: '+221 76 552 09 41', email: 'a.ba@nexa-energie.sn' },
    ],
    soldeDu: 18_450_000,
  },
  {
    id: 2,
    raisonSociale: 'PetroSahel Distribution',
    secteur: 'Pétrole et gaz',
    nif: 'NIF-0032890-C',
    rccm: 'SN-DKR-2015-B-1187',
    adresse: 'Route des hydrocarbures, Dakar',
    type: 'Client',
    sites: [{ id: 3, nom: 'Dépôt de Bel Air', ville: 'Dakar' }],
    contacts: [
      { id: 3, nom: 'Cheikh Ndiaye', fonction: 'Responsable HSE', tel: '+221 78 300 45 67', email: 'c.ndiaye@petrosahel.sn' },
    ],
    soldeDu: 0,
  },
  {
    id: 3,
    raisonSociale: 'Société des Mines de Kalsaka',
    secteur: 'Mines',
    nif: 'NIF-0018934-F',
    rccm: 'BFA-OUA-2016-B-2210',
    adresse: 'Site minier de Kalsaka, Yatenga',
    type: 'Client',
    sites: [
      { id: 4, nom: 'Usine de traitement', ville: 'Kalsaka' },
      { id: 5, nom: 'Camp de base vie', ville: 'Kalsaka' },
    ],
    contacts: [
      { id: 4, nom: 'Rasmata Sawadogo', fonction: 'Chef de service maintenance', tel: '+226 70 12 88 90', email: 'r.sawadogo@smk.bf' },
      { id: 5, nom: 'Boureima Compaoré', fonction: 'Planificateur', tel: '+226 71 44 20 15', email: 'b.compaore@smk.bf' },
    ],
    soldeDu: 4_120_000,
  },
  {
    id: 4,
    raisonSociale: 'CimBurkina Industrie',
    secteur: 'Industrie',
    nif: 'NIF-0009871-D',
    rccm: 'BFA-OUA-2019-B-3345',
    adresse: 'Zone industrielle de Kossodo, Ouagadougou',
    type: 'Client',
    sites: [{ id: 6, nom: 'Cimenterie de Kossodo', ville: 'Ouagadougou' }],
    contacts: [
      { id: 6, nom: 'Wendpanga Ilboudo', fonction: 'Directeur technique', tel: '+226 76 60 30 12', email: 'w.ilboudo@cimburkina.bf' },
    ],
    soldeDu: 7_800_000,
  },
  {
    id: 5,
    raisonSociale: 'AgroIndustrie du Centre',
    secteur: 'Agro-industrie',
    nif: 'NIF-0041203-G',
    rccm: 'SN-DKR-2021-B-7762',
    adresse: 'Route de Kaolack, km 12',
    type: 'Prospect',
    sites: [{ id: 7, nom: 'Usine de transformation', ville: 'Kaolack' }],
    contacts: [
      { id: 7, nom: 'Ndèye Faye', fonction: 'Responsable achats', tel: '+221 77 900 11 33', email: 'n.faye@agrocentre.sn' },
    ],
    soldeDu: 0,
  },
  {
    id: 6,
    raisonSociale: 'Onco Hydrocarbures',
    secteur: 'Pétrole et gaz',
    nif: 'NIF-0027644-B',
    rccm: 'SN-DKR-2012-B-0914',
    adresse: 'Port autonome, Dakar',
    type: 'Client',
    sites: [
      { id: 8, nom: 'Terminal de stockage', ville: 'Dakar' },
      { id: 9, nom: 'Station de pompage', ville: 'Rufisque' },
    ],
    contacts: [
      { id: 8, nom: 'Modibo Kane', fonction: 'Superintendant maintenance', tel: '+221 78 220 78 55', email: 'm.kane@onco.sn' },
    ],
    soldeDu: 32_700_000,
  },
]

export function clientName(id: number): string {
  return clients.find((c) => c.id === id)?.raisonSociale ?? '—'
}

// ── Devis ───────────────────────────────────────────────────────────────────

export const quotes: Quote[] = [
  { id: 1, numero: 'DEV-2026-0142', clientId: 1, objet: 'Contrat maintenance préventive — 2 turbines à gaz', montantHT: 86_000_000, tva: 18, dateEmission: '2026-10-12', dateValidite: '2026-11-12', statut: 'Envoyé', validationDirection: true, remisePct: 4 },
  { id: 2, numero: 'DEV-2026-0141', clientId: 3, objet: 'Formation TAG-03 intra-entreprise — 8 stagiaires', montantHT: 12_800_000, tva: 18, dateEmission: '2026-10-08', dateValidite: '2026-11-08', statut: 'Accepté', validationDirection: false, remisePct: 0 },
  { id: 3, numero: 'DEV-2026-0138', clientId: 6, objet: 'Inspection boroscopique TAG Frame 6B', montantHT: 21_500_000, tva: 18, dateEmission: '2026-09-30', dateValidite: '2026-10-30', statut: 'Accepté', validationDirection: true, remisePct: 6 },
  { id: 4, numero: 'DEV-2026-0135', clientId: 4, objet: 'Révision compresseur centrifuge + pièces', montantHT: 9_400_000, tva: 18, dateEmission: '2026-09-22', dateValidite: '2026-10-22', statut: 'Expiré', validationDirection: false, remisePct: 0 },
  { id: 5, numero: 'DEV-2026-0134', clientId: 5, objet: 'Audit d\'état du parc pompes et moteurs', montantHT: 4_750_000, tva: 18, dateEmission: '2026-09-18', dateValidite: '2026-10-18', statut: 'Envoyé', validationDirection: false, remisePct: 0 },
  { id: 6, numero: 'DEV-2026-0129', clientId: 2, objet: 'Mise à disposition 2 techniciens — 3 mois', montantHT: 27_000_000, tva: 18, dateEmission: '2026-09-10', dateValidite: '2026-10-10', statut: 'Refusé', validationDirection: true, remisePct: 12 },
  { id: 7, numero: 'DEV-2026-0145', clientId: 6, objet: 'Fourniture filtres et joints — stock annuel', montantHT: 15_200_000, tva: 18, dateEmission: '2026-10-26', dateValidite: '2026-11-26', statut: 'Brouillon', validationDirection: true, remisePct: 8 },
  { id: 8, numero: 'DEV-2026-0144', clientId: 3, objet: 'Maintenance corrective groupe électrogène 1250 kVA', montantHT: 6_300_000, tva: 18, dateEmission: '2026-10-24', dateValidite: '2026-11-24', statut: 'Envoyé', validationDirection: false, remisePct: 0 },
]

// ── Contrats ────────────────────────────────────────────────────────────────

export const contracts: Contract[] = [
  { id: 1, numero: 'CTR-2026-007', clientId: 1, type: 'Maintenance préventive', debut: '2026-01-01', fin: '2026-12-31', montant: 74_000_000, periodiciteFacturation: 'Trimestrielle', visitesIncluses: 12, statut: 'Expire bientôt' },
  { id: 2, numero: 'CTR-2026-011', clientId: 6, type: 'Astreinte', debut: '2026-05-01', fin: '2027-04-30', montant: 36_000_000, periodiciteFacturation: 'Mensuelle', visitesIncluses: 0, statut: 'Actif' },
  { id: 3, numero: 'CTR-2026-014', clientId: 3, type: 'Mise à disposition', debut: '2026-08-01', fin: '2027-01-31', montant: 48_600_000, periodiciteFacturation: 'Mensuelle', visitesIncluses: 0, statut: 'Actif' },
]

// ── Factures ────────────────────────────────────────────────────────────────

export const invoices: Invoice[] = [
  { id: 1, numero: 'FAC-2026-0089', clientId: 6, origine: 'DEV-2026-0138 — Inspection boroscopique', montantTTC: 25_370_000, montantPaye: 0, dateEmission: '2026-10-20', dateEcheance: '2026-11-19', statut: 'Émise' },
  { id: 2, numero: 'FAC-2026-0087', clientId: 1, origine: 'CTR-2026-007 — Échéance T3', montantTTC: 21_830_000, montantPaye: 0, dateEmission: '2026-10-01', dateEcheance: '2026-10-31', statut: 'Émise' },
  { id: 3, numero: 'FAC-2026-0084', clientId: 3, origine: 'CTR-2026-014 — Échéance octobre', montantTTC: 9_558_000, montantPaye: 4_000_000, dateEmission: '2026-10-05', dateEcheance: '2026-11-04', statut: 'Partiellement payée' },
  { id: 4, numero: 'FAC-2026-0078', clientId: 6, origine: 'INT-2026-0112 — Dépannage pompe P-204', montantTTC: 7_330_000, montantPaye: 7_330_000, dateEmission: '2026-09-15', dateEcheance: '2026-10-15', statut: 'Payée' },
  { id: 5, numero: 'FAC-2026-0071', clientId: 4, origine: 'SES-2026-009 — Session MAI-02 intra', montantTTC: 9_558_000, montantPaye: 0, dateEmission: '2026-08-20', dateEcheance: '2026-09-19', statut: 'En retard' },
  { id: 6, numero: 'FAC-2026-0066', clientId: 1, origine: 'INT-2026-0098 — Maintenance corrective TAG', montantTTC: 14_160_000, montantPaye: 14_160_000, dateEmission: '2026-07-30', dateEcheance: '2026-08-29', statut: 'Payée' },
  { id: 7, numero: 'FAC-2026-0058', clientId: 2, origine: 'SES-2026-006 — Session SEC-01 inter', montantTTC: 2_360_000, montantPaye: 0, dateEmission: '2026-06-25', dateEcheance: '2026-07-25', statut: 'En retard' },
  { id: 8, numero: 'FAC-2026-0090', clientId: 3, origine: 'DEV-2026-0141 — Formation TAG-03 intra (acompte 40%)', montantTTC: 6_041_600, montantPaye: 0, dateEmission: '2026-10-28', dateEcheance: '2026-11-27', statut: 'Brouillon' },
]

// ── Équipements ─────────────────────────────────────────────────────────────

export const equipments: Equipment[] = [
  { id: 1, clientId: 1, site: 'Centrale de Bel Air', type: 'Turbine à gaz', marque: 'GE Vernova', modele: 'Frame 6B', numeroSerie: 'TAG-6B-88412', miseEnService: '2014-06-15', compteurHeures: 48_320, prochaineVisite: '2026-11-14' },
  { id: 2, clientId: 1, site: 'Centrale de Bel Air', type: 'Turbine à gaz', marque: 'GE Vernova', modele: 'Frame 6B', numeroSerie: 'TAG-6B-88413', miseEnService: '2014-06-15', compteurHeures: 47_980, prochaineVisite: '2026-11-14' },
  { id: 3, clientId: 6, site: 'Terminal de stockage', type: 'Pompe centrifuge', marque: 'KSB', modele: 'CPK 200-315', numeroSerie: 'KSB-P-2204', miseEnService: '2019-03-02', compteurHeures: 12_400, prochaineVisite: '2026-12-02' },
  { id: 4, clientId: 6, site: 'Station de pompage', type: 'Pompe centrifuge', marque: 'KSB', modele: 'CPK 150-400', numeroSerie: 'KSB-P-2205', miseEnService: '2020-11-20', compteurHeures: 9_850, prochaineVisite: '2027-01-10' },
  { id: 5, clientId: 3, site: 'Usine de traitement', type: 'Groupe électrogène', marque: 'Caterpillar', modele: '3512B — 1250 kVA', numeroSerie: 'CAT-3512-0991', miseEnService: '2017-09-08', compteurHeures: 22_750, prochaineVisite: '2026-11-05' },
  { id: 6, clientId: 4, site: 'Cimenterie de Kossodo', type: 'Compresseur', marque: 'Atlas Copco', modele: 'GA 250', numeroSerie: 'AC-GA250-4471', miseEnService: '2018-04-11', compteurHeures: 31_200, prochaineVisite: '2026-11-20' },
  { id: 7, clientId: 1, site: 'Poste de Tobène', type: 'Groupe électrogène', marque: 'Cummins', modele: 'C900D5 — 720 kW', numeroSerie: 'CUM-C900-3318', miseEnService: '2021-02-14', compteurHeures: 6_120, prochaineVisite: '2027-02-01' },
]

export function equipmentLabel(id: number): string {
  const e = equipments.find((x) => x.id === id)
  return e ? `${e.type} ${e.modele}` : '—'
}

// ── Interventions ───────────────────────────────────────────────────────────

export const interventions: Intervention[] = [
  { id: 1, numero: 'INT-2026-0128', clientId: 6, equipementId: 3, type: 'Corrective', urgence: 'Critique', description: 'Fuite sur garniture mécanique — pompe P-204 à l\'arrêt', datePrevue: '2026-10-30', techniciens: [6, 7], statut: 'En cours', rapportSaisi: false },
  { id: 2, numero: 'INT-2026-0127', clientId: 1, equipementId: 1, type: 'Préventive', urgence: 'Normale', description: 'Visite trimestrielle contrat CTR-2026-007 — inspection combustion', datePrevue: '2026-11-14', techniciens: [7], statut: 'Planifiée', rapportSaisi: false, contratId: 1 },
  { id: 3, numero: 'INT-2026-0126', clientId: 3, equipementId: 5, type: 'Corrective', urgence: 'Urgente', description: 'Groupe électrogène : démarrage impossible, défaut alternateur', datePrevue: '2026-10-29', techniciens: [6], statut: 'Rapport saisi', rapportSaisi: true },
  { id: 4, numero: 'INT-2026-0124', clientId: 4, equipementId: 6, type: 'Préventive', urgence: 'Normale', description: 'Révision 32 000 h — compresseur GA 250', datePrevue: '2026-11-20', techniciens: [6, 7], statut: 'Planifiée', rapportSaisi: false },
  { id: 5, numero: 'INT-2026-0121', clientId: 6, equipementId: 3, type: 'Expertise', urgence: 'Normale', description: 'Analyse vibratoire complète + thermographie ligne de pompage', datePrevue: '2026-10-21', techniciens: [7], statut: 'Validée', rapportSaisi: true },
  { id: 6, numero: 'INT-2026-0119', clientId: 1, equipementId: 7, type: 'Corrective', urgence: 'Normale', description: 'Alarme température échappement — poste de Tobène', datePrevue: '2026-10-15', techniciens: [6], statut: 'Facturée', rapportSaisi: true },
  { id: 7, numero: 'INT-2026-0130', clientId: 3, equipementId: 5, type: 'Corrective', urgence: 'Urgente', description: 'Demande client du 29/10 : bruit anormal carter moteur', datePrevue: '2026-11-03', techniciens: [], statut: 'Demandée', rapportSaisi: false },
  { id: 8, numero: 'INT-2026-0129', clientId: 2, equipementId: 0, type: 'Corrective', urgence: 'Normale', description: 'Remplacement électrovannes ligne de transfert — dépôt Bel Air', datePrevue: '2026-11-06', techniciens: [], statut: 'Demandée', rapportSaisi: false },
]

// ── Formations ──────────────────────────────────────────────────────────────

export const trainings: Training[] = [
  { id: 1, code: 'TAG-01', intitule: 'Turbines à gaz : principes et technologie', domaine: 'Turbines à gaz', public: 'Opérateurs, techniciens', dureeJours: 3, prixInter: 850_000, forfaitIntra: 6_500_000 },
  { id: 2, code: 'TAG-02', intitule: 'Exploitation et conduite des turbines à gaz', domaine: 'Turbines à gaz', public: 'Opérateurs de conduite', dureeJours: 5, prixInter: 1_250_000, forfaitIntra: 9_800_000 },
  { id: 3, code: 'TAG-03', intitule: 'Maintenance des turbines à gaz', domaine: 'Turbines à gaz', public: 'Techniciens de maintenance', dureeJours: 5, prixInter: 1_350_000, forfaitIntra: 10_500_000 },
  { id: 4, code: 'MAI-01', intitule: 'Fondamentaux de la maintenance industrielle', domaine: 'Maintenance', public: 'Techniciens débutants', dureeJours: 3, prixInter: 450_000, forfaitIntra: 3_600_000 },
  { id: 5, code: 'MAI-02', intitule: 'Maintenance des pompes et compresseurs', domaine: 'Maintenance', public: 'Techniciens', dureeJours: 4, prixInter: 620_000, forfaitIntra: 5_200_000 },
  { id: 6, code: 'ELE-01', intitule: 'Électricité industrielle et habilitation', domaine: 'Électricité', public: 'Électriciens', dureeJours: 3, prixInter: 500_000, forfaitIntra: 4_000_000 },
  { id: 7, code: 'SEC-01', intitule: 'Sécurité en milieu industriel', domaine: 'Sécurité', public: 'Tout public', dureeJours: 2, prixInter: 280_000, forfaitIntra: 2_200_000 },
]

export function trainingLabel(id: number): string {
  const t = trainings.find((x) => x.id === id)
  return t ? `${t.code} — ${t.intitule}` : '—'
}

// ── Sessions ────────────────────────────────────────────────────────────────

export const sessions: TrainingSession[] = [
  { id: 1, numero: 'SES-2026-012', trainingId: 3, type: 'Intra', clientId: 3, debut: '2026-11-10', fin: '2026-11-14', lieu: 'Site minier de Kalsaka', formateurIds: [7], placesMin: 6, placesMax: 10, inscrits: 8, listeAttente: 0, statut: 'Confirmée' },
  { id: 2, numero: 'SES-2026-013', trainingId: 1, type: 'Inter', debut: '2026-11-17', fin: '2026-11-19', lieu: 'Centre de formation PROMI&S, Dakar', formateurIds: [9], placesMin: 5, placesMax: 12, inscrits: 11, listeAttente: 2, statut: 'Confirmée' },
  { id: 3, numero: 'SES-2026-014', trainingId: 6, type: 'Inter', debut: '2026-12-01', fin: '2026-12-03', lieu: 'Centre de formation PROMI&S, Dakar', formateurIds: [7, 9], placesMin: 5, placesMax: 12, inscrits: 4, listeAttente: 0, statut: 'Planifiée' },
  { id: 4, numero: 'SES-2026-011', trainingId: 5, type: 'Intra', clientId: 4, debut: '2026-10-05', fin: '2026-10-08', lieu: 'Cimenterie de Kossodo', formateurIds: [9], placesMin: 6, placesMax: 12, inscrits: 9, listeAttente: 0, statut: 'Terminée' },
  { id: 5, numero: 'SES-2026-010', trainingId: 7, type: 'Inter', debut: '2026-10-26', fin: '2026-10-27', lieu: 'Centre de formation PROMI&S, Dakar', formateurIds: [8], placesMin: 5, placesMax: 15, inscrits: 14, listeAttente: 0, statut: 'En cours' },
  { id: 6, numero: 'SES-2026-015', trainingId: 2, type: 'Inter', debut: '2026-12-14', fin: '2026-12-18', lieu: 'Centre de formation PROMI&S, Dakar', formateurIds: [7], placesMin: 6, placesMax: 10, inscrits: 3, listeAttente: 0, statut: 'Planifiée' },
]

// ── Stagiaires ──────────────────────────────────────────────────────────────

export const trainees: Trainee[] = [
  { id: 1, nom: 'Diop', prenom: 'Amadou', clientId: 1, fonction: 'Opérateur de conduite', tel: '+221 77 611 02 40', email: 'a.diop@nexa-energie.sn', formationsSuivies: 3 },
  { id: 2, nom: 'Gueye', prenom: 'Bineta', clientId: 1, fonction: 'Technicienne maintenance', tel: '+221 76 201 88 14', email: 'b.gueye@nexa-energie.sn', formationsSuivies: 2 },
  { id: 3, nom: 'Zida', prenom: 'Félix', clientId: 3, fonction: 'Technicien électromécanicien', tel: '+226 70 55 41 78', email: 'f.zida@smk.bf', formationsSuivies: 1 },
  { id: 4, nom: 'Kaboré', prenom: 'Aline', clientId: 3, fonction: 'Chef d\'équipe', tel: '+226 71 30 92 60', email: 'a.kabore@smk.bf', formationsSuivies: 4 },
  { id: 5, nom: 'Nana', prenom: 'Salif', clientId: 4, fonction: 'Technicien maintenance', tel: '+226 76 12 48 77', email: 's.nana@cimburkina.bf', formationsSuivies: 2 },
  { id: 6, nom: 'Touré', prenom: 'Fatoumata', clientId: 4, fonction: 'Électricienne', tel: '+226 70 89 23 11', email: 'f.toure@cimburkina.bf', formationsSuivies: 1 },
  { id: 7, nom: 'Sow', prenom: 'El Hadj', clientId: 6, fonction: 'Opérateur terminal', tel: '+221 78 445 66 02', email: 'e.sow@onco.sn', formationsSuivies: 2 },
  { id: 8, nom: 'Mbodj', prenom: 'Khady', clientId: 6, fonction: 'Technicienne instrumentation', tel: '+221 77 318 54 90', email: 'k.mbodj@onco.sn', formationsSuivies: 3 },
  { id: 9, nom: 'Barry', prenom: 'Ousmane', clientId: 2, fonction: 'Pompiste chef', tel: '+221 76 902 15 37', email: 'o.barry@petrosahel.sn', formationsSuivies: 1 },
  { id: 10, nom: 'Deme', prenom: 'Sokhna', clientId: 2, fonction: 'Assistante QHSE', tel: '+221 77 660 41 28', email: 's.deme@petrosahel.sn', formationsSuivies: 1 },
]

export function traineeName(id: number): string {
  const t = trainees.find((x) => x.id === id)
  return t ? `${t.prenom} ${t.nom}` : '—'
}

// ── Attestations ────────────────────────────────────────────────────────────

export const certificates: Certificate[] = [
  { id: 1, numero: 'ATT-2026-0147', traineeId: 5, sessionId: 4, dateDelivrance: '2026-10-09', verificationCode: 'PRS-7K2M-9Q4X' },
  { id: 2, numero: 'ATT-2026-0148', traineeId: 6, sessionId: 4, dateDelivrance: '2026-10-09', verificationCode: 'PRS-3F8D-1W6T' },
  { id: 3, numero: 'ATT-2026-0121', traineeId: 1, sessionId: 4, dateDelivrance: '2026-09-12', verificationCode: 'PRS-9H5P-2R8N' },
  { id: 4, numero: 'ATT-2026-0103', traineeId: 4, sessionId: 4, dateDelivrance: '2026-08-21', verificationCode: 'PRS-4T6Y-8M3K' },
  { id: 5, numero: 'ATT-2026-0095', traineeId: 8, sessionId: 4, dateDelivrance: '2026-07-30', verificationCode: 'PRS-2W9J-5D7F' },
]

// ── Stock ───────────────────────────────────────────────────────────────────

export const items: Item[] = [
  { id: 1, refInterne: 'FIL-TAG-001', refFabricant: 'GE-123A4567P001', designation: 'Filtre à air turbine — panneau primaire', categorie: 'Filtres', unite: 'pièce', prixAchat: 185_000, prixVente: 260_000, stock: 24, seuilAlerte: 8, magasin: 'Siège' },
  { id: 2, refInterne: 'FIL-TAG-002', refFabricant: 'GE-372A4875P002', designation: 'Filtre coalesceur gaz combustible', categorie: 'Filtres', unite: 'pièce', prixAchat: 420_000, prixVente: 590_000, stock: 5, seuilAlerte: 6, magasin: 'Siège' },
  { id: 3, refInterne: 'JNT-0045', refFabricant: 'GR-1622-4590', designation: 'Joint spiralé DN150 inox/graphite', categorie: 'Joints', unite: 'pièce', prixAchat: 12_500, prixVente: 19_800, stock: 140, seuilAlerte: 30, magasin: 'Siège' },
  { id: 4, refInterne: 'GAR-PMP-204', refFabricant: 'JCM-48-STD', designation: 'Garniture mécanique 48 mm — pompe KSB', categorie: 'Étanchéité', unite: 'kit', prixAchat: 890_000, prixVente: 1_240_000, stock: 2, seuilAlerte: 3, magasin: 'Siège' },
  { id: 5, refInterne: 'RLT-6312', refFabricant: 'SKF-6312-2RS1', designation: 'Roulement à billes 6312 2RS', categorie: 'Roulements', unite: 'pièce', prixAchat: 28_000, prixVente: 42_000, stock: 36, seuilAlerte: 10, magasin: 'Siège' },
  { id: 6, refInterne: 'HUI-TUR-46', refFabricant: 'MOB-DTE-932', designation: 'Huile turbine ISO VG 46 — fût 208 L', categorie: 'Consommables', unite: 'fût', prixAchat: 310_000, prixVente: 425_000, stock: 11, seuilAlerte: 4, magasin: 'Siège' },
  { id: 7, refInterne: 'BOU-TAG-IGN', refFabricant: 'GE-362A1102P104', designation: 'Bougie d\'allumage turbine Frame 6B', categorie: 'Électricité', unite: 'pièce', prixAchat: 145_000, prixVente: 210_000, stock: 3, seuilAlerte: 4, magasin: 'Véhicule S. Diallo' },
  { id: 8, refInterne: 'VAN-SOL-24', refFabricant: 'ASCO-EF8210G094', designation: 'Électrovanne 24 Vcc — ligne de transfert', categorie: 'Électricité', unite: 'pièce', prixAchat: 96_000, prixVente: 138_000, stock: 7, seuilAlerte: 5, magasin: 'Siège' },
  { id: 9, refInterne: 'CAP-VIB-01', refFabricant: 'BNT-330500-02', designation: 'Capteur de vibration proximiteur', categorie: 'Instrumentation', unite: 'pièce', prixAchat: 540_000, prixVente: 760_000, stock: 4, seuilAlerte: 2, magasin: 'Siège' },
  { id: 10, refInterne: 'FIL-HUI-3512', refFabricant: 'CAT-1R-1808', designation: 'Filtre à huile moteur CAT 3512', categorie: 'Filtres', unite: 'pièce', prixAchat: 34_500, prixVente: 52_000, stock: 18, seuilAlerte: 8, magasin: 'Site Kalsaka' },
]

export function itemName(id: number): string {
  const i = items.find((x) => x.id === id)
  return i ? `${i.refInterne} — ${i.designation}` : '—'
}

export const stockMovements: StockMovement[] = [
  { id: 1, itemId: 4, type: 'Réservation', quantite: 1, date: '2026-10-29', motif: 'Réservé pour INT-2026-0128', intervention: 'INT-2026-0128' },
  { id: 2, itemId: 1, type: 'Entrée', quantite: 20, date: '2026-10-24', motif: 'Réception BCF-2026-031 — TurboParts BV' },
  { id: 3, itemId: 5, type: 'Sortie', quantite: 4, date: '2026-10-21', motif: 'Roulements remplacés sur pompe P-204', intervention: 'INT-2026-0121' },
  { id: 4, itemId: 7, type: 'Sortie', quantite: 1, date: '2026-10-18', motif: 'Bougie défectueuse remplacée — TAG Bel Air', intervention: 'INT-2026-0119' },
  { id: 5, itemId: 6, type: 'Transfert', quantite: 2, date: '2026-10-15', motif: 'Siège → Site Kalsaka pour visite GE 3512' },
  { id: 6, itemId: 3, type: 'Sortie', quantite: 12, date: '2026-10-10', motif: 'Joints ligne vapeur — CimBurkina', intervention: 'INT-2026-0115' },
  { id: 7, itemId: 8, type: 'Entrée', quantite: 10, date: '2026-10-06', motif: 'Réception BCF-2026-028 — Socapex' },
  { id: 8, itemId: 2, type: 'Ajustement', quantite: -1, date: '2026-09-30', motif: 'Écart inventaire tournant septembre' },
  { id: 9, itemId: 10, type: 'Sortie', quantite: 6, date: '2026-09-22', motif: 'Vidange trimestrielle GE 3512 — SMK', intervention: 'INT-2026-0109' },
  { id: 10, itemId: 9, type: 'Retour', quantite: 1, date: '2026-09-18', motif: 'Capteur non utilisé rendu au magasin' },
]

// ── Fournisseurs ────────────────────────────────────────────────────────────

export const suppliers: Supplier[] = [
  { id: 1, nom: 'TurboParts BV', contact: 'Jan Verhoeven', tel: '+31 20 445 8900', email: 'sales@turboparts.eu', delaiJours: 21, articlesFournis: 3 },
  { id: 2, nom: 'Socapex Dakar', contact: 'Alioune Ndir', tel: '+221 33 849 20 10', email: 'contact@socapex.sn', delaiJours: 3, articlesFournis: 4 },
  { id: 3, nom: 'KSB West Africa', contact: 'Yasmine Diallo', tel: '+225 27 21 75 44 80', email: 'y.diallo@ksb.com', delaiJours: 14, articlesFournis: 2 },
  { id: 4, nom: 'SKF Distribution CI', contact: 'Marc Kouassi', tel: '+225 27 21 35 91 12', email: 'm.kouassi@skf.com', delaiJours: 10, articlesFournis: 1 },
]

// ── Journal d'activité ──────────────────────────────────────────────────────

export const activityLogs: ActivityLog[] = [
  { id: 1, userId: 3, action: 'Devis créé', cible: 'DEV-2026-0145 — Onco Hydrocarbures', date: '2026-10-26T14:32:00' },
  { id: 2, userId: 6, action: 'Intervention démarrée', cible: 'INT-2026-0128 — Pompe P-204', date: '2026-10-30T08:05:00' },
  { id: 3, userId: 4, action: 'Paiement enregistré', cible: 'FAC-2026-0084 — 4 000 000 FCFA', date: '2026-10-28T11:20:00' },
  { id: 4, userId: 2, action: 'Devis validé (Direction)', cible: 'DEV-2026-0138 — remise 6 %', date: '2026-10-01T09:44:00' },
  { id: 5, userId: 8, action: 'Session confirmée', cible: 'SES-2026-012 — TAG-03 Kalsaka', date: '2026-10-22T16:10:00' },
  { id: 6, userId: 9, action: 'Présences saisies', cible: 'SES-2026-010 — demi-journée du 26/10', date: '2026-10-26T17:01:00' },
  { id: 7, userId: 10, action: 'Sortie de stock', cible: 'RLT-6312 ×4 — INT-2026-0121', date: '2026-10-21T10:15:00' },
  { id: 8, userId: 5, action: 'Rapport validé', cible: 'INT-2026-0121 — Analyse vibratoire', date: '2026-10-23T15:38:00' },
  { id: 9, userId: 5, action: 'Intervention créée', cible: 'INT-2026-0130 — SMK groupe électrogène', date: '2026-10-29T13:52:00' },
  { id: 10, userId: 3, action: 'Facture générée', cible: 'FAC-2026-0090 — acompte TAG-03', date: '2026-10-28T09:12:00' },
]

// ── Notifications ───────────────────────────────────────────────────────────

export const notifications: AppNotification[] = [
  { id: 1, titre: 'Intervention critique en cours', detail: 'INT-2026-0128 — fuite garniture pompe P-204 (Onco)', type: 'alerte', date: '2026-10-30T08:05:00', lue: false },
  { id: 2, titre: 'Devis à valider — Direction', detail: 'DEV-2026-0145 — 15,2 M FCFA, remise 8 %', type: 'validation', date: '2026-10-26T14:32:00', lue: false },
  { id: 3, titre: 'Contrat expire dans 62 jours', detail: 'CTR-2026-007 — Nexa Énergie (31/12/2026)', type: 'alerte', date: '2026-10-30T07:00:00', lue: false },
  { id: 4, titre: '3 articles sous seuil d\'alerte', detail: 'FIL-TAG-002, GAR-PMP-204, BOU-TAG-IGN', type: 'alerte', date: '2026-10-29T18:00:00', lue: false },
  { id: 5, titre: 'Facture impayée +40 jours', detail: 'FAC-2026-0071 — CimBurkina, 9,56 M FCFA', type: 'alerte', date: '2026-10-29T09:00:00', lue: true },
  { id: 6, titre: 'Session complète — liste d\'attente', detail: 'SES-2026-013 TAG-01 : 11/12 inscrits, 2 en attente', type: 'info', date: '2026-10-27T11:24:00', lue: true },
  { id: 7, titre: 'Rapport en attente de validation', detail: 'INT-2026-0126 — groupe électrogène SMK', type: 'validation', date: '2026-10-29T17:40:00', lue: true },
]
