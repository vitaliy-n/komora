import type { Ingredient } from '../types'

export function scaleIngredients(
  ingredients: Ingredient[],
  baseJars: number,
  targetJars: number,
): Ingredient[] {
  const factor = targetJars / baseJars
  return ingredients.map((ing) => ({
    ...ing,
    amount: Math.round(ing.amount * factor * 100) / 100,
  }))
}

export function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) return amount.toString()

  const fractions: Record<string, string> = {
    '0.25': '¼',
    '0.33': '⅓',
    '0.5': '½',
    '0.67': '⅔',
    '0.75': '¾',
  }

  const decimal = amount - Math.floor(amount)
  const key = decimal.toFixed(2)

  if (fractions[key]) {
    const whole = Math.floor(amount)
    return whole > 0 ? `${whole} ${fractions[key]}` : fractions[key]
  }

  return amount % 1 === 0 ? amount.toString() : amount.toFixed(1)
}
