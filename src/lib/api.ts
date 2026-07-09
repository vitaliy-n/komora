const API_URL = import.meta.env.VITE_API_URL || '/api'

function getToken(): string | null {
  return localStorage.getItem('komora_admin_token')
}

export function setToken(token: string) {
  localStorage.setItem('komora_admin_token', token)
}

export function clearToken() {
  localStorage.removeItem('komora_admin_token')
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

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string; user: { id: number; username: string; role: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  getMe: () => request<{ user: { id: number; username: string; role: string } }>('/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  getStats: () => request<{ products: number; recipes: number; users: number }>('/stats'),

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
}
