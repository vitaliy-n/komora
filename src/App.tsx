import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './pages/LandingPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminRecipesPage } from './pages/AdminRecipesPage'
import { DashboardPage } from './pages/DashboardPage'
import { CanningListPage } from './pages/CanningListPage'
import { CanningDetailPage } from './pages/CanningDetailPage'
import { CanningFormPage } from './pages/CanningFormPage'
import { RecipesPage } from './pages/RecipesPage'
import { RecipeDetailPage } from './pages/RecipeDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { InventoryPage } from './pages/InventoryPage'
import { SettingsPage } from './pages/SettingsPage'
import { CalendarPage } from './pages/CalendarPage'
import { useDatabase } from './hooks/useDatabase'

export default function App() {
  const { initializeDB } = useDatabase()

  useEffect(() => {
    initializeDB()
  }, [initializeDB])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/recipes" element={<AdminRecipesPage />} />
        <Route element={<Layout />}>
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
          <Route path="/app/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
