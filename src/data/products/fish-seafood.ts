import type { Product } from '../../types'

export const fishSeafoodProducts: Product[] = [
{
    id: 'prod-canned-anchovies',
    name: 'Анчоуси в олії',
    category: 'Риба та морепродукти',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Різкий неприємний запах', 'Помутніння олії'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовуйте для соусу Цезар та піци'],
    isBuiltIn: true,
  },

{
    id: 'prod-frozen-shrimp',
    name: 'Креветки (заморожені)',
    category: 'Риба та морепродукти',
    icon: '🦐',
    storage: [
      { method: 'freezer', temperature: { min: -20, max: -18 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Чорні плями на панцирі', 'Запах аміаку'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Розморожувати в холодильнику'],
    isBuiltIn: true,
  }
]
