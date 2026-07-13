import type { CanningEntry, Recipe, StorageMethod } from '../types'
import { SHELF_LIFE_DAYS } from '../types'
import { toISODate } from './date'

export function calculateAutoExpiry(
  recipe: Recipe | undefined,
  storageMethod: StorageMethod,
  jarSize: number,
  date: string,
): string | undefined {
  let shelfLifeDays = SHELF_LIFE_DAYS[storageMethod] || 365

  if (recipe) {
    const hasPreservatives = recipe.ingredients.some((i) =>
      ['сіль', 'оцет', 'цукор', 'лимонна кислота'].some((p) =>
        i.name.toLowerCase().includes(p),
      ),
    )
    if (hasPreservatives) shelfLifeDays = Math.round(shelfLifeDays * 1.5)

    const isSweet = recipe.ingredients.some((i) =>
      i.name.toLowerCase().includes('цукор') && i.amount > 200,
    )
    if (isSweet) shelfLifeDays = Math.round(shelfLifeDays * 1.3)

    if (jarSize <= 0.5) shelfLifeDays = Math.round(shelfLifeDays * 0.8)
    if (jarSize >= 3) shelfLifeDays = Math.round(shelfLifeDays * 1.2)
  }

  const expiry = new Date(date)
  expiry.setDate(expiry.getDate() + shelfLifeDays)
  return toISODate(expiry)
}

export function generateBatchNumber(
  name: string,
  existingCannings: CanningEntry[],
  date: string,
): string {
  const year = new Date(date).getFullYear()
  const prefix = `${name} #${year}-`
  const existingNumbers = existingCannings
    .filter((c) => c.batchNumber?.startsWith(prefix))
    .map((c) => {
      const match = c.batchNumber?.match(/#(\d+)-(\d+)/)
      return match ? parseInt(match[2], 10) : 0
    })
  const nextNum = Math.max(0, ...existingNumbers) + 1
  return `${name} #${year}-${String(nextNum).padStart(2, '0')}`
}
