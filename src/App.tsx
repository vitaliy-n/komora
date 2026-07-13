import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { useDatabase } from './hooks/useDatabase'
import { useAuth } from './lib/useAuth'
import { isAuthenticated } from './lib/api'
import { ToastProvider } from './components/ui/Toast'
import { ErrorBoundary } from './components/ErrorBoundary'

const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AdminRecipesPage = lazy(() => import('./pages/AdminRecipesPage').then(m => ({ default: m.AdminRecipesPage })))
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const CanningListPage = lazy(() => import('./pages/CanningListPage').then(m => ({ default: m.CanningListPage })))
const CanningDetailPage = lazy(() => import('./pages/CanningDetailPage').then(m => ({ default: m.CanningDetailPage })))
const CanningFormPage = lazy(() => import('./pages/CanningFormPage').then(m => ({ default: m.CanningFormPage })))
const RecipesPage = lazy(() => import('./pages/RecipesPage').then(m => ({ default: m.RecipesPage })))
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage').then(m => ({ default: m.RecipeDetailPage })))
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })))
const InventoryPage = lazy(() => import('./pages/InventoryPage').then(m => ({ default: m.InventoryPage })))
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const CalendarPage = lazy(() => import('./pages/CalendarPage').then(m => ({ default: m.CalendarPage })))
const StatsPage = lazy(() => import('./pages/StatsPage').then(m => ({ default: m.StatsPage })))
const ShoppingListPage = lazy(() => import('./pages/ShoppingListPage').then(m => ({ default: m.ShoppingListPage })))
const LabelsPage = lazy(() => import('./pages/LabelsPage').then(m => ({ default: m.LabelsPage })))
const QRScannerPage = lazy(() => import('./pages/QRScannerPage').then(m => ({ default: m.QRScannerPage })))
const PantryChefPage = lazy(() => import('./pages/PantryChefPage').then(m => ({ default: m.PantryChefPage })))
const StorageMapPage = lazy(() => import('./pages/StorageMapPage').then(m => ({ default: m.StorageMapPage })))
const ExportReportsPage = lazy(() => import('./pages/ExportReportsPage').then(m => ({ default: m.ExportReportsPage })))
const ImportRecipePage = lazy(() => import('./pages/ImportRecipePage').then(m => ({ default: m.ImportRecipePage })))
const GuidesPage = lazy(() => import('./pages/GuidesPage').then(m => ({ default: m.GuidesPage })))

function Loading() {
  return <div className="flex justify-center items-center min-h-screen">
    <div className="w-8 h-8 border-3 border-komora-200 border-t-komora-600 rounded-full animate-spin" />
  </div>
}

function ProtectedLayout() {
  if (!isAuthenticated()) return <Navigate to="/auth" replace />
  return <Layout />
}

export default function App() {
  const { initializeDB } = useDatabase()
  const { loading } = useAuth()

  useEffect(() => {
    initializeDB()
  }, [initializeDB])

  if (loading) return <Loading />

  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/recipes" element={<AdminRecipesPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/app" element={<DashboardPage />} />
                <Route path="/app/cannings" element={<CanningListPage />} />
                <Route path="/app/cannings/new" element={<CanningFormPage />} />
                <Route path="/app/cannings/:id" element={<CanningDetailPage />} />
                <Route path="/app/cannings/:id/edit" element={<CanningFormPage />} />
                <Route path="/app/recipes" element={<RecipesPage />} />
                <Route path="/app/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/app/products" element={<ProductsPage />} />
                <Route path="/app/products/:id" element={<ProductDetailPage />} />
                <Route path="/app/inventory" element={<InventoryPage />} />
                <Route path="/app/calendar" element={<CalendarPage />} />
                <Route path="/app/stats" element={<StatsPage />} />
                <Route path="/app/shopping" element={<ShoppingListPage />} />
                <Route path="/app/labels" element={<LabelsPage />} />
                <Route path="/app/scan" element={<QRScannerPage />} />
                <Route path="/app/chef" element={<PantryChefPage />} />
                <Route path="/app/storage-map" element={<StorageMapPage />} />
                <Route path="/app/export" element={<ExportReportsPage />} />
                <Route path="/app/recipes/import" element={<ImportRecipePage />} />
                <Route path="/app/guides" element={<GuidesPage />} />
                <Route path="/app/settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  )
}
