import type { Product } from '../../types'

export const meatProducts: Product[] = [
{
    id: 'prod-chicken',
    name: 'Курка (свіжа)',
    category: 'М\'ясо',
    icon: '🐔',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Сірий колір', 'Неприємний запах', 'Слизькість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Можна консервувати', 'Тушонка домашня'],
    isBuiltIn: true,
  },

{
    id: 'prod-pork',
    name: 'Свинина (свіжа)',
    category: 'М\'ясо',
    icon: '🥩',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Сірий колір', 'Неприємний запах', 'Слизькість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Тушонка, ковбаси домашні'],
    isBuiltIn: true,
  },

{
    id: 'prod-beef',
    name: 'Яловичина (свіжа)',
    category: 'М\'ясо',
    icon: '🥩',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Коричневий колір', 'Неприємний запах', 'Слизькість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Тушонка домашня', 'Консервація'],
    isBuiltIn: true,
  },

{
    id: 'prod-duck',
    name: 'Качка (свіжа)',
    category: 'М\'ясо',
    icon: '🦆',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Неприємний запах', 'Потемніння шкіри'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Качиний жир — цінний продукт для смаження'],
    isBuiltIn: true,
  },

{
    id: 'prod-goose',
    name: 'Гуска (свіжа)',
    category: 'М\'ясо',
    icon: '🪿',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Запах', 'Липкість'],
    seasonMonths: [11, 12, 1],
    tips: ['Традиційна різдвяна страва'],
    isBuiltIn: true,
  },

{
    id: 'prod-turkey',
    name: 'Індичка (свіжа)',
    category: 'М\'ясо',
    icon: '🦃',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Сірий колір', 'Запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Дієтичне м\'ясо, багате на білок'],
    isBuiltIn: true,
  },

{
    id: 'prod-quail',
    name: 'Перепілка',
    category: 'М\'ясо',
    icon: '🐦',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 2 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Маленькі тушки, готуються дуже швидко'],
    isBuiltIn: true,
  },

{
    id: 'prod-rabbit',
    name: 'Кролятина',
    category: 'М\'ясо',
    icon: '🐇',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Липкість', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Гіпоалергенне м\'ясо'],
    isBuiltIn: true,
  },

{
    id: 'prod-lamb',
    name: 'Баранина',
    category: 'М\'ясо',
    icon: '🐑',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 4 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 270 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Слизькість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Має специфічний аромат, добре поєднується з зірою та м\'ятою'],
    isBuiltIn: true,
  },

{
    id: 'prod-veal',
    name: 'Телятина',
    category: 'М\'ясо',
    icon: '🥩',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 270 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата рожевого кольору'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Більш ніжне м\'ясо ніж яловичина'],
    isBuiltIn: true,
  },

{
    id: 'prod-lard-fresh',
    name: 'Сало свіже',
    category: 'М\'ясо',
    icon: '🥓',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 5 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Жовтуватий колір', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для тривалого зберігання краще засолити'],
    isBuiltIn: true,
  },

{
    id: 'prod-lard-salted',
    name: 'Сало солоне',
    category: 'М\'ясо',
    icon: '🥓',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 90 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Жовтіння', 'Старий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Український суперфуд'],
    isBuiltIn: true,
  },

{
    id: 'prod-blood-sausage',
    name: 'Кров\'янка (домашня)',
    category: 'М\'ясо',
    icon: '🌭',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 4 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 60 },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий запах', 'Липкість оболонки'],
    seasonMonths: [1, 2, 11, 12],
    tips: ['Перед вживанням краще підсмажити'],
    isBuiltIn: true,
  },

{
    id: 'prod-venison',
    name: 'Оленина',
    category: 'М\'ясо',
    icon: '🦌',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 4 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Темний колір', 'Запах'],
    seasonMonths: [10, 11, 12],
    tips: ['М\'ясо дичини, дуже пісне та корисне'],
    isBuiltIn: true,
  },

{
    id: 'prod-boar',
    name: 'М\'ясо кабана',
    category: 'М\'ясо',
    icon: '🐗',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Запах', 'Липкість'],
    seasonMonths: [11, 12],
    tips: ['Вимагає тривалого маринування'],
    isBuiltIn: true,
  },

{
    id: 'prod-pate-home',
    name: 'Паштет печінковий (домашній)',
    category: 'М\'ясо',
    icon: '🥣',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 4 }, shelfLifeDays: 4 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 60 },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий смак', 'Зміна кольору поверхні'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Зверху можна залити вершковим маслом для кращого зберігання'],
    isBuiltIn: true,
  },

{
    id: 'prod-aspic',
    name: 'Холодець',
    category: 'М\'ясо',
    icon: '🥣',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 5 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння бульйону', 'Кислий запах'],
    seasonMonths: [1, 2, 11, 12],
    tips: ['Традиційна зимова страва'],
    isBuiltIn: true,
  }
]
