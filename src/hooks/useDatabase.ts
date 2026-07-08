import { useCallback } from 'react'
import { db } from '../db/database'
import { builtInCategories } from '../data/categories'
import { builtInProducts } from '../data/products-db'
import { builtInRecipes } from '../data/recipes-db'
import type { CanningEntry, Recipe, InventoryItem, Category } from '../types'
import { generateId } from '../utils/date'

export function useDatabase() {
  const initializeDB = useCallback(async () => {
    const categoryCount = await db.categories.count()
    if (categoryCount === 0) {
      await db.categories.bulkAdd(builtInCategories)
    }
    const productCount = await db.products.count()
    if (productCount === 0) {
      await db.products.bulkAdd(builtInProducts)
    }
    const recipeCount = await db.recipes.count()
    if (recipeCount === 0) {
      await db.recipes.bulkAdd(builtInRecipes)
    }
  }, [])

  const addCanning = useCallback(async (entry: Omit<CanningEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const item: CanningEntry = {
      ...entry,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    await db.canningEntries.add(item)
    return item
  }, [])

  const updateCanning = useCallback(async (id: string, updates: Partial<CanningEntry>) => {
    await db.canningEntries.update(id, { ...updates, updatedAt: new Date().toISOString() })
  }, [])

  const deleteCanning = useCallback(async (id: string) => {
    await db.canningEntries.delete(id)
  }, [])

  const getAllCannings = useCallback(async () => {
    return db.canningEntries.orderBy('date').reverse().toArray()
  }, [])

  const getCanningById = useCallback(async (id: string) => {
    return db.canningEntries.get(id)
  }, [])

  const addRecipe = useCallback(async (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const item: Recipe = {
      ...recipe,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    await db.recipes.add(item)
    return item
  }, [])

  const updateRecipe = useCallback(async (id: string, updates: Partial<Recipe>) => {
    await db.recipes.update(id, updates)
  }, [])

  const deleteRecipe = useCallback(async (id: string) => {
    await db.recipes.delete(id)
  }, [])

  const getAllRecipes = useCallback(async () => {
    return db.recipes.orderBy('name').toArray()
  }, [])

  const getRecipeById = useCallback(async (id: string) => {
    return db.recipes.get(id)
  }, [])

  const getRecipesByProduct = useCallback(async (productId: string) => {
    return db.recipes.where('productIds').equals(productId).toArray()
  }, [])

  const getAllProducts = useCallback(async () => {
    return db.products.orderBy('name').toArray()
  }, [])

  const getProductById = useCallback(async (id: string) => {
    return db.products.get(id)
  }, [])

  const getProductsByCategory = useCallback(async (category: string) => {
    return db.products.where('category').equals(category).toArray()
  }, [])

  const addInventory = useCallback(async (item: Omit<InventoryItem, 'id' | 'createdAt'>) => {
    const inventoryItem: InventoryItem = {
      ...item,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    await db.inventory.add(inventoryItem)
    return inventoryItem
  }, [])

  const updateInventory = useCallback(async (id: string, updates: Partial<InventoryItem>) => {
    await db.inventory.update(id, updates)
  }, [])

  const deleteInventory = useCallback(async (id: string) => {
    await db.inventory.delete(id)
  }, [])

  const getAllInventory = useCallback(async () => {
    return db.inventory.orderBy('purchaseDate').reverse().toArray()
  }, [])

  const getAllCategories = useCallback(async () => {
    return db.categories.orderBy('name').toArray()
  }, [])

  const addCategory = useCallback(async (category: Omit<Category, 'id'>) => {
    const item: Category = { ...category, id: generateId() }
    await db.categories.add(item)
    return item
  }, [])

  return {
    initializeDB,
    addCanning, updateCanning, deleteCanning, getAllCannings, getCanningById,
    addRecipe, updateRecipe, deleteRecipe, getAllRecipes, getRecipeById, getRecipesByProduct,
    getAllProducts, getProductById, getProductsByCategory,
    addInventory, updateInventory, deleteInventory, getAllInventory,
    getAllCategories, addCategory,
  }
}
