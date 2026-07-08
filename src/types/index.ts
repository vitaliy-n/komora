export interface Category {
  id: string
  name: string
  icon: string
  color: string
  isBuiltIn: boolean
}

export interface Ingredient {
  name: string
  amount: number
  unit: string
  productId?: string
}

export interface Recipe {
  id: string
  name: string
  categoryId: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
  baseJars: number
  baseJarSize: number
  prepTime?: number
  cookTime?: number
  difficulty: 'easy' | 'medium' | 'hard'
  tips?: string[]
  isBuiltIn: boolean
  productIds: string[]
  createdAt: string
}

export interface CanningEntry {
  id: string
  name: string
  categoryId: string
  recipeId?: string
  date: string
  expiryDate?: string
  jarSize: number
  totalJars: number
  consumedJars: number
  storageLocation: string
  photos: string[]
  rating?: number
  review?: string
  notes?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface StorageCondition {
  method: 'room' | 'fridge' | 'basement' | 'freezer'
  temperature: { min: number; max: number }
  humidity?: { min: number; max: number }
  shelfLifeDays: number
  tips?: string
}

export interface Compatibility {
  productId: string
  compatible: boolean
  reason: string
}

export interface Product {
  id: string
  name: string
  category: string
  icon: string
  storage: StorageCondition[]
  compatibility: Compatibility[]
  spoilageSigns: string[]
  seasonMonths: number[]
  tips?: string[]
  isBuiltIn: boolean
}

export interface InventoryItem {
  id: string
  productId: string
  name: string
  quantity: number
  unit: string
  purchaseDate: string
  storageMethod: 'room' | 'fridge' | 'basement' | 'freezer'
  expiryDate?: string
  notes?: string
  createdAt: string
}

export type StorageMethod = 'room' | 'fridge' | 'basement' | 'freezer'
export type Difficulty = 'easy' | 'medium' | 'hard'

export const STORAGE_METHOD_LABELS: Record<StorageMethod, string> = {
  room: 'Кімнатна температура',
  fridge: 'Холодильник',
  basement: 'Підвал/Погріб',
  freezer: 'Морозилка',
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Легко',
  medium: 'Середньо',
  hard: 'Складно',
}

export const JAR_SIZES = [0.5, 1, 1.5, 2, 3] as const

export const STORAGE_LOCATIONS = [
  'Підвал',
  'Погріб',
  'Комора',
  'Балкон',
  'Холодильник',
  'Кухня',
  'Інше',
] as const
