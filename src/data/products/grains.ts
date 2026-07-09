import type { Product } from '../../types'

export const grainsProducts: Product[] = [
{
    id: 'prod-rice',
    name: 'Рис',
    category: 'Крупи',
    icon: '🍚',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Грудкування', 'Сторонній запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у голубці та фаршировані перці для консервації'],
    isBuiltIn: true,
  },

{
    id: 'prod-pearl-barley',
    name: 'Перловка',
    category: 'Крупи',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Грудкування', 'Гіркий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Розсольник на зиму з перловкою — класика'],
    isBuiltIn: true,
  },

{
    id: 'prod-rice',
    name: 'Рис',
    category: 'Крупи',
    icon: '🍚',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Прогірклість', 'Затхлий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['В герметичній тарі', 'Перевіряти на комах'],
    isBuiltIn: true,
  },

{
    id: 'prod-buckwheat',
    name: 'Гречка',
    category: 'Крупи',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Прогірклість', 'Затхлий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Багата на залізо', 'Зберігати в темному місці'],
    isBuiltIn: true,
  },

{
    id: 'prod-oats',
    name: 'Вівсянка',
    category: 'Крупи',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість', 'Комахи', 'Вогкість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Корисна для травлення', 'Герметична тара'],
    isBuiltIn: true,
  },

{
    id: 'prod-pearl-barley',
    name: 'Перлова крупа',
    category: 'Крупи',
    icon: '⚪',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Затхлий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Довго зберігається', 'Для розсольника'],
    isBuiltIn: true,
  },

{
    id: 'prod-quinoa',
    name: 'Кіноа',
    category: 'Крупи',
    icon: '🍚',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Затхлий запах', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Промивати перед приготуванням щоб прибрати гіркоту'],
    isBuiltIn: true,
  },

{
    id: 'prod-bulgur',
    name: 'Булгур',
    category: 'Крупи',
    icon: '🌾',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Затхлий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Оброблена пшениця', 'Швидко готується'],
    isBuiltIn: true,
  },

{
    id: 'prod-couscous',
    name: 'Кус-кус',
    category: 'Крупи',
    icon: '🌾',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування від вологи', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Не потребує варіння — достатньо залити окропом'],
    isBuiltIn: true,
  },

{
    id: 'prod-polenta',
    name: 'Полента (кукурудзяна крупа)',
    category: 'Крупи',
    icon: '🌽',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркий смак', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Різний помел впливає на час приготування'],
    isBuiltIn: true,
  },

{
    id: 'prod-semolina',
    name: 'Манна крупа (Манка)',
    category: 'Крупи',
    icon: '🌾',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Комахи', 'Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовують як загущувач'],
    isBuiltIn: true,
  }
]
