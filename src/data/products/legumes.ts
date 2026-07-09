import type { Product } from '../../types'

export const legumesProducts: Product[] = [
{
    id: 'prod-chickpeas',
    name: 'Нут',
    category: 'Бобові',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Пліснява', 'Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Можна консервувати як горошок', 'Хумус'],
    isBuiltIn: true,
  },

{
    id: 'prod-lentils',
    name: 'Сочевиця',
    category: 'Бобові',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Пліснява', 'Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Багато білка', 'Супи, гарніри'],
    isBuiltIn: true,
  },

{
    id: 'prod-white-beans',
    name: 'Квасоля біла (суха)',
    category: 'Бобові',
    icon: '⚪',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Пліснява', 'Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Можна консервувати', 'В томатному соусі'],
    isBuiltIn: true,
  },

{
    id: 'prod-red-beans',
    name: 'Квасоля червона (суха)',
    category: 'Бобові',
    icon: '🔴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Лобіо, супи', 'Обов\'язково замочувати'],
    isBuiltIn: true,
  },

{
    id: 'prod-mung-beans',
    name: 'Маш (боби мунг)',
    category: 'Бобові',
    icon: '🟢',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Ідеально для пророщування'],
    isBuiltIn: true,
  },

{
    id: 'prod-adzuki-beans',
    name: 'Боби Адзукі',
    category: 'Бобові',
    icon: '🔴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовують у солодких азіатських десертах'],
    isBuiltIn: true,
  },

{
    id: 'prod-red-lentils',
    name: 'Сочевиця червона',
    category: 'Бобові',
    icon: '🟠',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Швидко розварюється, ідеальна для крем-супів'],
    isBuiltIn: true,
  },

{
    id: 'prod-green-lentils',
    name: 'Сочевиця зелена',
    category: 'Бобові',
    icon: '🟢',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Тримає форму після варіння'],
    isBuiltIn: true,
  },

{
    id: 'prod-beluga-lentils',
    name: 'Сочевиця Белуга (чорна)',
    category: 'Бобові',
    icon: '⚫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Нагадує чорну ікру, вишуканий смак'],
    isBuiltIn: true,
  }
]
