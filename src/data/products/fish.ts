import type { Product } from '../../types'

export const fishProducts: Product[] = [
{
    id: 'prod-fish-fresh',
    name: 'Риба (свіжа)',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Неприємний запах', 'Тьмяні очі', 'Сіра луска'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Можна консервувати', 'Домашні шпроти'],
    isBuiltIn: true,
  },

{
    id: 'prod-salmon',
    name: 'Лосось (Сьомга)',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 120 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата пружності', 'Запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Багатий на Омега-3'],
    isBuiltIn: true,
  },

{
    id: 'prod-trout',
    name: 'Форель',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 120 },
    ],
    compatibility: [],
    spoilageSigns: ['Запах', 'Тьмяні очі'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Річкова форель менша та ніжніша за морську'],
    isBuiltIn: true,
  },

{
    id: 'prod-tuna',
    name: 'Тунець (свіжий)',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 1 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння м\'яса до коричневого'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['М\'ясо тунця називають "морською яловичиною"'],
    isBuiltIn: true,
  },

{
    id: 'prod-mackerel',
    name: 'Скумбрія',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Дуже різкий рибний запах', 'М\'якість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Ідеальна для запікання та копчення'],
    isBuiltIn: true,
  },

{
    id: 'prod-herring',
    name: 'Оселедець',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 2, tips: 'Свіжий' },
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30, tips: 'Солоний в розсолі' },
    ],
    compatibility: [],
    spoilageSigns: ['"Іржа" (жовті плями) на шкірі', 'Запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Норвезький оселедець вважається найякіснішим'],
    isBuiltIn: true,
  },

{
    id: 'prod-cod',
    name: 'Тріска',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Жовтизна м\'яса'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Дієтична біла риба'],
    isBuiltIn: true,
  },

{
    id: 'prod-carp',
    name: 'Короп',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
    ],
    compatibility: [],
    spoilageSigns: ['Запах тіни', 'Тьмяна луска'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Річкова риба, може мати запах мулу — допоможе вимочування в молоці'],
    isBuiltIn: true,
  },

{
    id: 'prod-pike',
    name: 'Щука',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
    ],
    compatibility: [],
    spoilageSigns: ['Запах'],
    seasonMonths: [3, 4, 9, 10],
    tips: ['Ідеальна для фарширування та котлет'],
    isBuiltIn: true,
  },

{
    id: 'prod-catfish',
    name: 'Сом',
    category: 'Риба',
    icon: '🐟',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 2 }, shelfLifeDays: 2 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Запах'],
    seasonMonths: [5, 6, 7, 8],
    tips: ['Жирна риба без луски'],
    isBuiltIn: true,
  },

{
    id: 'prod-cod-liver',
    name: 'Печінка тріски (консервована)',
    category: 'Риба',
    icon: '🥫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Здуття банки', 'Металевий присмак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Надзвичайно багата на вітамін D та A'],
    isBuiltIn: true,
  },

{
    id: 'prod-sprats',
    name: 'Шпроти в олії',
    category: 'Риба',
    icon: '🥫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Здуття банки'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Класична закуска для бутербродів'],
    isBuiltIn: true,
  }
]
