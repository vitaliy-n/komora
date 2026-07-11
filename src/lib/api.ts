const API_URL = import.meta.env.VITE_API_URL || '/api'

function getToken(): string | null {
  return localStorage.getItem('komora_token')
}

export function setToken(token: string) {
  localStorage.setItem('komora_token', token)
}

export function clearToken() {
  localStorage.removeItem('komora_token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
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
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Помилка запиту' }))
    throw new Error(data.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export interface AuthUser {
  id: number
  username: string
  email?: string
  role: string
}

export const api = {
  register: (username: string, email: string, password: string) =>
    request<{ token: string; user: AuthUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),

  login: (username: string, password: string) =>
    request<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  getMe: () => request<{ user: AuthUser }>('/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  getStats: () => request<{ products: number; recipes: number; users: number; canningCount: number; inventoryCount: number }>('/stats'),

  getProducts: () => request<any[]>('/products'),

  saveProduct: (product: any) =>
    request<{ success: boolean }>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    request<{ success: boolean }>(`/products/${id}`, { method: 'DELETE' }),

  bulkProducts: (products: any[]) =>
    request<{ success: boolean; count: number }>('/products/bulk', {
      method: 'POST',
      body: JSON.stringify({ products }),
    }),

  getRecipes: () => request<any[]>('/recipes'),

  saveRecipe: (recipe: any) =>
    request<{ success: boolean }>('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    }),

  deleteRecipe: (id: string) =>
    request<{ success: boolean }>(`/recipes/${id}`, { method: 'DELETE' }),

  bulkRecipes: (recipes: any[]) =>
    request<{ success: boolean; count: number }>('/recipes/bulk', {
      method: 'POST',
      body: JSON.stringify({ recipes }),
    }),

  getCannings: () => request<any[]>('/cannings'),

  saveCanning: (canning: any) =>
    request<{ success: boolean }>('/cannings', {
      method: 'POST',
      body: JSON.stringify(canning),
    }),

  bulkCannings: (items: any[]) =>
    request<{ success: boolean; count: number }>('/cannings/bulk', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),

  deleteCanning: (id: string) =>
    request<{ success: boolean }>(`/cannings/${id}`, { method: 'DELETE' }),

  getInventory: () => request<any[]>('/inventory'),

  saveInventory: (item: any) =>
    request<{ success: boolean }>('/inventory', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  bulkInventory: (items: any[]) =>
    request<{ success: boolean; count: number }>('/inventory/bulk', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),

  deleteInventory: (id: string) =>
    request<{ success: boolean }>(`/inventory/${id}`, { method: 'DELETE' }),

  getAdminUsers: () => request<any[]>('/admin/users'),

  updateAdminUser: (id: number, role: string) =>
    request<{ success: boolean }>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }),

  deleteAdminUser: (id: number) =>
    request<{ success: boolean }>(`/admin/users/${id}`, { method: 'DELETE' }),

  getAdminStats: () => request<any>('/admin/stats'),
}
