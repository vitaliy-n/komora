import type { Product } from '../../types'

export const seedsProducts: Product[] = [
{
    id: 'prod-pumpkin-seeds',
    name: 'Насіння гарбуза',
    category: 'Насіння',
    icon: '🌻',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 180 },
      { method: 'fridge', temperature: { min: 0, max: 5 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак', 'Пліснява', 'Зміна кольору'],
    seasonMonths: [9, 10, 11],
    tips: ['Дуже корисне', 'Для салатів та випічки'],
    isBuiltIn: true,
  },

{
    id: 'prod-sunflower-seeds-raw',
    name: 'Насіння соняшника (сире)',
    category: 'Насіння',
    icon: '🌻',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість', 'Пліснява', 'Комахи'],
    seasonMonths: [8, 9, 10],
    tips: ['Зберігати в темному місці щоб не гірчило'],
    isBuiltIn: true,
  },

{
    id: 'prod-chia-seeds',
    name: 'Насіння чіа',
    category: 'Насіння',
    icon: '🌑',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Сторонній запах', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Суперфуд', 'Желює рідину — чудовий замінник пектину'],
    isBuiltIn: true,
  },

{
    id: 'prod-flax-seeds',
    name: 'Насіння льону',
    category: 'Насіння',
    icon: '🌑',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 5 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак', 'Гіркота'],
    seasonMonths: [8, 9],
    tips: ['Мелене насіння льону псується швидше'],
    isBuiltIn: true,
  }
]
