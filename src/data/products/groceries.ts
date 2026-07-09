import type { Product } from '../../types'

export const groceriesProducts: Product[] = [
{
    id: 'prod-grain-quinoa',
    name: 'Кіноа (біла)',
    category: 'Бакалія',
    icon: '🍚',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркий смак', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Промивати перед варінням для видалення гіркоти'],
    isBuiltIn: true,
  },

{
    id: 'prod-grain-bulgur',
    name: 'Булгур',
    category: 'Бакалія',
    icon: '🌾',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Затхлий запах', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Обсмажити в маслі перед варінням для горіхового аромату'],
    isBuiltIn: true,
  },

{
    id: 'prod-grain-couscous',
    name: 'Кус-кус',
    category: 'Бакалія',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Не потребує варіння, достатньо залити окропом'],
    isBuiltIn: true,
  },

{
    id: 'prod-grain-polenta',
    name: 'Полента (кукурудзяна крупа)',
    category: 'Бакалія',
    icon: '🌽',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 270 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркота', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для італійської каші або запікання'],
    isBuiltIn: true,
  },

{
    id: 'prod-grain-wild-rice',
    name: 'Рис дикий (чорний)',
    category: 'Бакалія',
    icon: '🖤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Затхлий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Вариться довше за звичайний рис (40-50 хв)'],
    isBuiltIn: true,
  }
]
