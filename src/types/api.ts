import type { Product, Recipe, CanningEntry, InventoryItem, Category } from './index'

export interface AuthUser {
  id: number
  username: string
  email?: string
  role: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: AuthUser
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

export interface ApiProduct extends Product {
  id: string
}

export interface ApiRecipe extends Recipe {
  id: string
}

export interface ApiCanning extends CanningEntry {
  id: string
}

export interface ApiInventoryItem extends InventoryItem {
  id: string
}

export interface ApiCategory extends Category {
  id: string
}

export interface AdminStats {
  totalUsers: number
  totalCannings: number
  totalInventory: number
  totalProducts: number
  totalRecipes: number
  todayRegistrations: number
  weekRegistrations: number
  monthRegistrations: number
}

export interface AdminUser {
  id: number
  username: string
  email?: string
  role: string
  created_at: string
  canningCount: number
  inventoryCount: number
}

export interface StatsResponse {
  products: number
  recipes: number
  users: number
  canningCount: number
  inventoryCount: number
}
