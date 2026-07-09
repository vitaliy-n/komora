import type { Product } from '../../types'

export const frozenProducts: Product[] = [
{
    id: 'prod-frozen-dumplings',
    name: 'Пельмені (напівфабрикат)',
    category: 'М’ясо',
    icon: '🥟',
    storage: [
      { method: 'freezer', temperature: { min: -20, max: -18 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Тріщини на тісті', 'Злипання в одну грудку'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Швидка вечеря'],
    isBuiltIn: true,
  }
]
