import { describe, it, expect } from 'vitest'
import { encodeRecipeToUrl, decodeRecipeFromUrl } from '../utils/recipe-share'
import type { Recipe } from '../types'

const mockRecipe: Recipe = {
  id: 'test-1',
  name: 'Тестовий рецепт',
  categoryId: 'cat-test',
  description: 'Опис тесту',
  ingredients: [
    { name: 'Помідор', amount: 2, unit: 'кг' },
    { name: 'Сіль', amount: 1, unit: 'ст.л.' },
  ],
  steps: ['Крок 1', 'Крок 2'],
  baseJars: 3,
  baseJarSize: 1,
  prepTime: 30,
  cookTime: 60,
  difficulty: 'easy',
  tips: ['Порада 1'],
  isBuiltIn: false,
  productIds: ['prod-1'],
  createdAt: '2025-01-01T00:00:00.000Z',
}

describe('recipe-share', () => {
  it('encodes recipe to URL with data param', () => {
    const url = encodeRecipeToUrl(mockRecipe)
    expect(url).toContain('/app/recipes/import?data=')
    expect(url.startsWith('http')).toBe(true)
  })

  it('decodes recipe from URL data', () => {
    const url = encodeRecipeToUrl(mockRecipe)
    const data = url.split('data=')[1]
    const decoded = decodeRecipeFromUrl(data)
    expect(decoded).not.toBeNull()
    expect(decoded!.name).toBe('Тестовий рецепт')
    expect(decoded!.ingredients.length).toBe(2)
    expect(decoded!.ingredients[0].name).toBe('Помідор')
    expect(decoded!.steps).toEqual(['Крок 1', 'Крок 2'])
    expect(decoded!.baseJars).toBe(3)
  })

  it('returns null for invalid data', () => {
    expect(decodeRecipeFromUrl('invalid-base64!!!')).toBeNull()
  })
})
