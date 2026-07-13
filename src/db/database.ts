import Dexie, { type Table } from 'dexie'
import type { CanningEntry, Recipe, Product, InventoryItem, Category, StorageLocation, ShoppingTemplate, PriceHistoryEntry } from '../types'

export class KomoraDB extends Dexie {
  canningEntries!: Table<CanningEntry, string>
  recipes!: Table<Recipe, string>
  products!: Table<Product, string>
  inventory!: Table<InventoryItem, string>
  categories!: Table<Category, string>
  shoppingItems!: Table<any, string>
  storageLocations!: Table<StorageLocation, string>
  shoppingTemplates!: Table<ShoppingTemplate, string>
  priceHistory!: Table<PriceHistoryEntry & { id: string; productName: string }, string>

  constructor() {
    super('komora')
    this.version(1).stores({
      canningEntries: 'id, name, categoryId, recipeId, date, expiryDate, storageLocation, *tags',
      recipes: 'id, name, categoryId, difficulty, isBuiltIn, *productIds',
      products: 'id, name, category, isBuiltIn, *seasonMonths',
      inventory: 'id, productId, storageMethod, purchaseDate, expiryDate',
      categories: 'id, name, isBuiltIn',
    })
    this.version(2).stores({
      canningEntries: 'id, name, categoryId, recipeId, date, expiryDate, storageLocation, *tags',
      recipes: 'id, name, categoryId, difficulty, isBuiltIn, *productIds',
      products: 'id, name, category, isBuiltIn, *seasonMonths',
      inventory: 'id, productId, storageMethod, purchaseDate, expiryDate',
      categories: 'id, name, isBuiltIn',
      shoppingItems: 'id, name, checked',
    })
    this.version(3).stores({
      canningEntries: 'id, name, categoryId, recipeId, date, expiryDate, storageLocation, *tags',
      recipes: 'id, name, categoryId, difficulty, isBuiltIn, *productIds',
      products: 'id, name, category, isBuiltIn, *seasonMonths',
      inventory: 'id, productId, storageMethod, purchaseDate, expiryDate',
      categories: 'id, name, isBuiltIn',
      shoppingItems: 'id, name, checked',
      storageLocations: 'id, name, type',
    })
    this.version(4).stores({
      canningEntries: 'id, name, categoryId, recipeId, date, expiryDate, storageLocation, *tags',
      recipes: 'id, name, categoryId, difficulty, isBuiltIn, isFavorite, *productIds',
      products: 'id, name, category, isBuiltIn, *seasonMonths',
      inventory: 'id, productId, storageMethod, purchaseDate, expiryDate',
      categories: 'id, name, isBuiltIn',
      shoppingItems: 'id, name, checked',
      storageLocations: 'id, name, type',
      shoppingTemplates: 'id, name, isBuiltIn',
      priceHistory: 'id, productName, date',
    })
  }
}

export const db = new KomoraDB()
