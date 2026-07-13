import { describe, it, expect } from 'vitest'
import { calculateCanningCost, generateShoppingListFromDeficit } from '../utils/cost-calculator'
import type { CanningEntry, InventoryItem, Recipe } from '../types'

const mockCanning: CanningEntry = {
  id: 'c-1',
  name: 'Тестова закрутка',
  categoryId: 'cat-1',
  date: '2025-01-01',
  jarSize: 1,
  totalJars: 5,
  consumedJars: 0,
  storageLocation: 'Підвал',
  photos: [],
  tags: [],
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
}

const mockRecipe: Recipe = {
  id: 'r-1',
  name: 'Тестовий рецепт',
  categoryId: 'cat-1',
  description: '',
  ingredients: [
    { name: 'Помідор', amount: 2, unit: 'кг' },
    { name: 'Сіль', amount: 0.1, unit: 'кг' },
  ],
  steps: [],
  baseJars: 5,
  baseJarSize: 1,
  difficulty: 'easy',
  isBuiltIn: false,
  productIds: [],
  createdAt: '2025-01-01T00:00:00.000Z',
}

const mockInventory: InventoryItem[] = [
  { id: 'i-1', productId: 'p-1', name: 'Помідор', quantity: 1, unit: 'кг', price: 50, purchaseDate: '2025-01-01', storageMethod: 'room', createdAt: '2025-01-01' },
  { id: 'i-2', productId: 'p-2', name: 'Сіль', quantity: 1, unit: 'кг', price: 30, purchaseDate: '2025-01-01', storageMethod: 'room', createdAt: '2025-01-01' },
]

describe('cost-calculator', () => {
  it('calculates cost breakdown for canning', () => {
    const result = calculateCanningCost(mockCanning, mockRecipe, mockInventory)
    expect(result.ingredients.length).toBe(2)
    expect(result.ingredientsTotal).toBeGreaterThan(0)
    expect(result.jars.count).toBe(5)
    expect(result.jarsTotal).toBeGreaterThan(0)
    expect(result.total).toBeGreaterThan(0)
    expect(result.perJar).toBeGreaterThan(0)
  })

  it('calculates per liter correctly', () => {
    const result = calculateCanningCost(mockCanning, mockRecipe, mockInventory)
    expect(result.perLiter).toBe(result.total / 5)
  })

  it('generates shopping list from deficit', () => {
    const list = generateShoppingListFromDeficit(mockRecipe, 10, 1, mockInventory)
    expect(list.length).toBeGreaterThan(0)
    const tomato = list.find((i) => i.name === 'Помідор')
    expect(tomato).toBeDefined()
    expect(tomato!.deficit).toBeGreaterThan(0)
  })

  it('returns empty list when all ingredients available', () => {
    const fullInventory: InventoryItem[] = [
      { id: 'i-1', productId: 'p-1', name: 'Помідор', quantity: 100, unit: 'кг', purchaseDate: '2025-01-01', storageMethod: 'room', createdAt: '2025-01-01' },
      { id: 'i-2', productId: 'p-2', name: 'Сіль', quantity: 100, unit: 'кг', purchaseDate: '2025-01-01', storageMethod: 'room', createdAt: '2025-01-01' },
    ]
    const list = generateShoppingListFromDeficit(mockRecipe, 1, 1, fullInventory)
    expect(list.length).toBe(0)
  })
})
