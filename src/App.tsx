import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
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
import { useDatabase } from './hooks/useDatabase'

export default function App() {
  const { initializeDB } = useDatabase()

  useEffect(() => {
    initializeDB()
  }, [initializeDB])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/cannings" element={<CanningListPage />} />
          <Route path="/cannings/new" element={<CanningFormPage />} />
          <Route path="/cannings/:id" element={<CanningDetailPage />} />
          <Route path="/cannings/:id/edit" element={<CanningFormPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
