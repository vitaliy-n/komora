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
  isFavorite?: boolean
  collection?: string
  productIds: string[]
  createdAt: string
}

export type JarStatus = 'sealed' | 'opened' | 'spoiled'

export interface JarLogEntry {
  date: string
  action: 'opened' | 'consumed' | 'spoiled' | 'restored'
  count: number
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
  spoiledJars?: number
  openedJars?: number
  storageLocation: string
  photos: string[]
  rating?: number
  review?: string
  notes?: string
  tags: string[]
  tastingNotes?: TastingNote[]
  consumptionLog?: JarLogEntry[]
  batchNumber?: string
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
  price?: number
  minStock?: number
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

export interface JarPrice {
  size: number
  jarPrice: number
  lidPrice: number
}

export const JAR_PRICES: JarPrice[] = [
  { size: 0.5, jarPrice: 8, lidPrice: 4 },
  { size: 1, jarPrice: 12, lidPrice: 5 },
  { size: 1.5, jarPrice: 15, lidPrice: 6 },
  { size: 2, jarPrice: 18, lidPrice: 7 },
  { size: 3, jarPrice: 25, lidPrice: 8 },
]

export const UTILITY_COSTS = {
  electricityPerKwh: 4.5,
  gasPerM3: 12,
  waterPerM3: 25,
}

export interface StorageLocation {
  id: string
  name: string
  type: 'room' | 'fridge' | 'basement' | 'freezer'
  icon: string
  capacity: number
  position: { x: number; y: number }
  color: string
}

export interface TastingNote {
  id: string
  date: string
  rating: number
  notes: string
  pairedWith?: string
}

export interface PriceHistoryEntry {
  date: string
  price: number
  store?: string
}

export interface ShoppingTemplate {
  id: string
  name: string
  items: { name: string; quantity: string }[]
  isBuiltIn: boolean
}

export const JAR_STATUS_LABELS: Record<JarStatus, string> = {
  sealed: 'Запечатана',
  opened: 'Відкрита',
  spoiled: 'Зіпсована',
}

export const SHELF_LIFE_DAYS: Record<string, number> = {
  'room': 365,
  'fridge': 180,
  'basement': 730,
  'freezer': 365,
}
