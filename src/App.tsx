import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PublicLayout from './components/PublicLayout'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import Accueil from './pages/Accueil'
import Services from './pages/Services'
import Formations from './pages/Formations'
import FormationDetail from './pages/FormationDetail'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Connexion from './pages/Connexion'
import Dashboard from './pages/Dashboard'
import Clients, { ClientDetail } from './pages/Clients'
import Devis from './pages/Devis'
import Contrats from './pages/Contrats'
import Factures from './pages/Factures'
import Interventions from './pages/Interventions'
import Planning from './pages/Planning'
import Equipements from './pages/Equipements'
import Catalogue from './pages/Catalogue'
import Sessions from './pages/Sessions'
import Stagiaires from './pages/Stagiaires'
import Attestations from './pages/Attestations'
import Stock from './pages/Stock'
import Mouvements from './pages/Mouvements'
import Fournisseurs from './pages/Fournisseurs'
import Journal from './pages/Journal'
import Parametres from './pages/Parametres'

function ClientDetailRoute() {
  const { id } = useParams()
  return <ClientDetail id={Number(id)} />
}

function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Topbar />
        <main className="mx-auto max-w-7xl p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTransition />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/services" element={<Services />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/formations/:id" element={<FormationDetail />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientDetailRoute />} />
          <Route path="devis" element={<Devis />} />
          <Route path="contrats" element={<Contrats />} />
          <Route path="factures" element={<Factures />} />
          <Route path="interventions" element={<Interventions />} />
          <Route path="planning" element={<Planning />} />
          <Route path="equipements" element={<Equipements />} />
          <Route path="formations/catalogue" element={<Catalogue />} />
          <Route path="formations/sessions" element={<Sessions />} />
          <Route path="formations/stagiaires" element={<Stagiaires />} />
          <Route path="formations/attestations" element={<Attestations />} />
          <Route path="stock/articles" element={<Stock />} />
          <Route path="stock/mouvements" element={<Mouvements />} />
          <Route path="stock/fournisseurs" element={<Fournisseurs />} />
          <Route path="journal" element={<Journal />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
