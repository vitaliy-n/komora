import type { Product } from '../../types'

export const melonsProducts: Product[] = [
{
    id: 'prod-watermelon',
    name: 'Кавун',
    category: 'Баштанні',
    icon: '🍉',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 14 },
      { method: 'basement', temperature: { min: 5, max: 10 }, humidity: { min: 70, max: 80 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Тріщини', 'М\'які ділянки', 'Неприємний запах'],
    seasonMonths: [7, 8, 9],
    tips: ['Цілий кавун зберігається довше', 'Варення з кавунових кірок — традиційний рецепт'],
    isBuiltIn: true,
  },

{
    id: 'prod-melon',
    name: 'Диня',
    category: 'Баштанні',
    icon: '🍈',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 7 },
      { method: 'basement', temperature: { min: 5, max: 10 }, humidity: { min: 70, max: 80 }, shelfLifeDays: 60 },
    ],
    compatibility: [],
    spoilageSigns: ['М\'які ділянки', 'Неприємний запах', 'Тріщини в шкірці'],
    seasonMonths: [7, 8, 9],
    tips: ['Варення з дині має ніжний аромат'],
    isBuiltIn: true,
  }
]
