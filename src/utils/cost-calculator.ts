import type { CanningEntry, InventoryItem, Recipe } from '../types'
import { JAR_PRICES, UTILITY_COSTS } from '../types'

export interface CostBreakdown {
  ingredients: { name: string; amount: number; unit: string; price: number }[]
  ingredientsTotal: number
  jars: { size: number; count: number; jarPrice: number; lidPrice: number; total: number }
  jarsTotal: number
  utilities: number
  utilitiesBreakdown: { electricity: number; gas: number; water: number }
  total: number
  perJar: number
  perLiter: number
}

export function calculateCanningCost(
  canning: CanningEntry,
  recipe: Recipe | undefined,
  inventory: InventoryItem[],
): CostBreakdown {
  const ingredients: CostBreakdown['ingredients'] = []
  const inventoryMap = new Map(inventory.filter((i) => i.price).map((i) => [i.name.toLowerCase(), i]))

  const recipeIngredients = recipe?.ingredients || []
  const scalingFactor = recipe
    ? (canning.totalJars * canning.jarSize) / (recipe.baseJars * recipe.baseJarSize)
    : 1

  for (const ing of recipeIngredients) {
    const scaledAmount = ing.amount * scalingFactor
    const invItem = inventoryMap.get(ing.name.toLowerCase())
    const unitPrice = invItem?.price || 0
    const price = unitPrice > 0 ? (scaledAmount / invItem!.quantity) * unitPrice : 0
    ingredients.push({
      name: ing.name,
      amount: scaledAmount,
      unit: ing.unit,
      price: Math.round(price * 100) / 100,
    })
  }

  const ingredientsTotal = ingredients.reduce((sum, i) => sum + i.price, 0)

  const jarPrice = JAR_PRICES.find((j) => j.size === canning.jarSize) || JAR_PRICES[1]
  const jarCost = (jarPrice.jarPrice + jarPrice.lidPrice) * canning.totalJars
  const jarsTotal = jarCost

  const cookTimeHours = (recipe?.cookTime || 60) / 60
  const electricity = cookTimeHours * 2 * UTILITY_COSTS.electricityPerKwh
  const gas = cookTimeHours * 0.3 * UTILITY_COSTS.gasPerM3
  const water = 0.05 * UTILITY_COSTS.waterPerM3
  const utilities = Math.round((electricity + gas + water) * 100) / 100

  const total = Math.round((ingredientsTotal + jarsTotal + utilities) * 100) / 100
  const perJar = canning.totalJars > 0 ? Math.round((total / canning.totalJars) * 100) / 100 : 0
  const totalLiters = canning.totalJars * canning.jarSize
  const perLiter = totalLiters > 0 ? Math.round((total / totalLiters) * 100) / 100 : 0

  return {
    ingredients,
    ingredientsTotal: Math.round(ingredientsTotal * 100) / 100,
    jars: {
      size: canning.jarSize,
      count: canning.totalJars,
      jarPrice: jarPrice.jarPrice,
      lidPrice: jarPrice.lidPrice,
      total: jarsTotal,
    },
    jarsTotal,
    utilities,
    utilitiesBreakdown: {
      electricity: Math.round(electricity * 100) / 100,
      gas: Math.round(gas * 100) / 100,
      water: Math.round(water * 100) / 100,
    },
    total,
    perJar,
    perLiter,
  }
}

export interface ShoppingListItem {
  name: string
  amount: number
  unit: string
  haveAmount: number
  needAmount: number
  deficit: number
  estimatedPrice?: number
}

export function generateShoppingListFromDeficit(
  recipe: Recipe,
  jars: number,
  jarSize: number,
  inventory: InventoryItem[],
): ShoppingListItem[] {
  const scalingFactor = (jars * jarSize) / (recipe.baseJars * recipe.baseJarSize)
  const inventoryMap = new Map(inventory.map((i) => [i.name.toLowerCase(), i]))

  const items: ShoppingListItem[] = []

  for (const ing of recipe.ingredients) {
    const needAmount = ing.amount * scalingFactor
    const invItem = inventoryMap.get(ing.name.toLowerCase())
    const haveAmount = invItem?.quantity || 0
    const deficit = Math.max(0, needAmount - haveAmount)

    if (deficit > 0) {
      items.push({
        name: ing.name,
        amount: needAmount,
        unit: ing.unit,
        haveAmount,
        needAmount,
        deficit: Math.round(deficit * 100) / 100,
        estimatedPrice: invItem?.price,
      })
    }
  }

  return items
}
