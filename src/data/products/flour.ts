import type { Product } from '../../types'

export const flourProducts: Product[] = [
{
    id: 'prod-flour-almond',
    name: 'Борошно мигдалеве',
    category: 'Крупи та борошно',
    icon: '🥡',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 180 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для десертів Макарон та безглютенової випічки'],
    isBuiltIn: true,
  },

{
    id: 'prod-flour-coconut',
    name: 'Борошно кокосове',
    category: 'Крупи та борошно',
    icon: '🥥',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Сторонній запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Поглинає дуже багато рідини'],
    isBuiltIn: true,
  },

{
    id: 'prod-flour-rice',
    name: 'Борошно рисове',
    category: 'Крупи та борошно',
    icon: '🍚',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для хрусткої паніровки'],
    isBuiltIn: true,
  },

{
    id: 'prod-oat-bran',
    name: 'Вівсяні висівки',
    category: 'Крупи та борошно',
    icon: '🌾',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Джерело клітковини'],
    isBuiltIn: true,
  },

{
    id: 'prod-spelt',
    name: 'Спельта (полба)',
    category: 'Крупи та борошно',
    icon: '🌾',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Стародавній вид пшениці'],
    isBuiltIn: true,
  }
]
