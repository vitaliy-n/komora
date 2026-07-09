import type { Product } from '../../types'

export const dairyProducts: Product[] = [
{
    id: 'prod-milk',
    name: 'Молоко',
    category: 'Молочні',
    icon: '🥛',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 5, tips: 'Пастеризоване' },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий запах', 'Згортання', 'Змінений колір'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Можна заморожувати для випічки'],
    isBuiltIn: true,
  },

{
    id: 'prod-sour-cream',
    name: 'Сметана',
    category: 'Молочні',
    icon: '🥛',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 10 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Кисле смак', 'Пліснява', 'Розшарування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Заморожена - для приготування'],
    isBuiltIn: true,
  },

{
    id: 'prod-cottage-cheese',
    name: 'Сир кисломолочний (сирок)',
    category: 'Молочні',
    icon: '🧀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 7 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий запах', 'Пліснява', 'Слизькість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для сирників, вареників'],
    isBuiltIn: true,
  },

{
    id: 'prod-hard-cheese',
    name: 'Сир твердий',
    category: 'Молочні',
    icon: '🧀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30, tips: 'У пергаменті' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180, tips: 'Змінюється текстура' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Висихання', 'Гіркота'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Загорнути у пергамент', 'Не в плівці'],
    isBuiltIn: true,
  },

{
    id: 'prod-butter',
    name: 'Масло вершкове',
    category: 'Молочні',
    icon: '🧈',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість', 'Жовтий наліт', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['У фользі або пергаменті', 'Добре морозиться'],
    isBuiltIn: true,
  }
]
