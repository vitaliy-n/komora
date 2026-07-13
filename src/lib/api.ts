import type {
  AuthUser,
  AuthResponse,
  PaginatedResponse,
  ApiProduct,
  ApiRecipe,
  ApiCanning,
  ApiInventoryItem,
  AdminStats,
  AdminUser,
  StatsResponse,
} from '../types/api'
import type { Product, Recipe, CanningEntry, InventoryItem } from '../types'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function getToken(): string | null {
  return localStorage.getItem('komora_token')
}

function getRefreshToken(): string | null {
  return localStorage.getItem('komora_refresh_token')
}

export function setToken(token: string) {
  localStorage.setItem('komora_token', token)
}

export function setRefreshToken(token: string) {
  localStorage.setItem('komora_refresh_token', token)
}

export function clearToken() {
  localStorage.removeItem('komora_token')
  localStorage.removeItem('komora_refresh_token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

async function tryRefreshToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise
  isRefreshing = true
  refreshPromise = (async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return null
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      if (!res.ok) return null
      const data = await res.json()
      setToken(data.token)
      return data.token
    } catch {
      return null
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  })()
  return refreshPromise
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (res.status === 401 && !endpoint.includes('/auth/')) {
    const newToken = await tryRefreshToken()
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`
      const retryRes = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
      if (!retryRes.ok) {
        const data = await retryRes.json().catch(() => ({ error: 'Помилка запиту' }))
        throw new Error(data.error || `HTTP ${retryRes.status}`)
      }
      return retryRes.json()
    }
    clearToken()
    throw new Error('Сесія закінчилась. Увійдіть знову.')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Помилка запиту' }))
    throw new Error(data.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export type { AuthUser }

export const api = {
  register: (username: string, email: string, password: string) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),

  login: (username: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    request<{ success: boolean }>('/auth/logout', { method: 'POST' }),

  getMe: () => request<{ user: AuthUser }>('/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  getStats: () => request<StatsResponse>('/stats'),

  getProducts: (page?: number, limit?: number, search?: string) => {
    const params = new URLSearchParams()
    if (page) params.set('page', String(page))
    if (limit) params.set('limit', String(limit))
    if (search) params.set('search', search)
    const query = params.toString() ? `?${params.toString()}` : ''
    return request<PaginatedResponse<ApiProduct> | ApiProduct[]>(`/products${query}`)
  },

  saveProduct: (product: Product) =>
    request<{ success: boolean }>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    request<{ success: boolean }>(`/products/${id}`, { method: 'DELETE' }),

  bulkProducts: (products: Product[]) =>
    request<{ success: boolean; count: number }>('/products/bulk', {
      method: 'POST',
      body: JSON.stringify({ products }),
    }),

  getRecipes: (page?: number, limit?: number, search?: string) => {
    const params = new URLSearchParams()
    if (page) params.set('page', String(page))
    if (limit) params.set('limit', String(limit))
    if (search) params.set('search', search)
    const query = params.toString() ? `?${params.toString()}` : ''
    return request<PaginatedResponse<ApiRecipe> | ApiRecipe[]>(`/recipes${query}`)
  },

  saveRecipe: (recipe: Recipe) =>
    request<{ success: boolean }>('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    }),

  deleteRecipe: (id: string) =>
    request<{ success: boolean }>(`/recipes/${id}`, { method: 'DELETE' }),

  bulkRecipes: (recipes: Recipe[]) =>
    request<{ success: boolean; count: number }>('/recipes/bulk', {
      method: 'POST',
      body: JSON.stringify({ recipes }),
    }),

  getCannings: () => request<ApiCanning[]>('/cannings'),

  saveCanning: (canning: CanningEntry) =>
    request<{ success: boolean }>('/cannings', {
      method: 'POST',
      body: JSON.stringify(canning),
    }),

  bulkCannings: (items: CanningEntry[]) =>
    request<{ success: boolean; count: number }>('/cannings/bulk', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),

  deleteCanning: (id: string) =>
    request<{ success: boolean }>(`/cannings/${id}`, { method: 'DELETE' }),

  getInventory: () => request<ApiInventoryItem[]>('/inventory'),

  saveInventory: (item: InventoryItem) =>
    request<{ success: boolean }>('/inventory', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  bulkInventory: (items: InventoryItem[]) =>
    request<{ success: boolean; count: number }>('/inventory/bulk', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),

  deleteInventory: (id: string) =>
    request<{ success: boolean }>(`/inventory/${id}`, { method: 'DELETE' }),

  getAdminUsers: () => request<AdminUser[]>('/admin/users'),

  updateAdminUser: (id: number, role: string) =>
    request<{ success: boolean }>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }),

  deleteAdminUser: (id: number) =>
    request<{ success: boolean }>(`/admin/users/${id}`, { method: 'DELETE' }),

  getAdminStats: () => request<AdminStats>('/admin/stats'),
}
