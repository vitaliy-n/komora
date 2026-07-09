import type { Product } from '../../types'

export const driedFruitsProducts: Product[] = [
{
    id: 'prod-raisins',
    name: 'Родзинки',
    category: 'Сухофрукти',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Затверділість', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у варення та компоти для солодкості', 'Замочити перед додаванням у тісто'],
    isBuiltIn: true,
  },

{
    id: 'prod-dried-apricots',
    name: 'Курага (сушені абрикоси)',
    category: 'Сухофрукти',
    icon: '🟠',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Затверділість', 'Потемніння', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Компот з кураги — дуже ароматний'],
    isBuiltIn: true,
  },

{
    id: 'prod-prunes',
    name: 'Чорнослив',
    category: 'Сухофрукти',
    icon: '⚫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Затверділість', 'Білий наліт', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у компоти та соуси'],
    isBuiltIn: true,
  },

{
    id: 'prod-raisins',
    name: 'Родзинки',
    category: 'Сухофрукти',
    icon: '�葡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Засахарення', 'Пліснява', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додавати у варення та компоти', 'Перед використанням замочити'],
    isBuiltIn: true,
  },

{
    id: 'prod-dried-apricots',
    name: 'Курага',
    category: 'Сухофрукти',
    icon: '🟠',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Затверділість', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Компоти зі сухофруктів', 'Замочити перед вживанням'],
    isBuiltIn: true,
  },

{
    id: 'prod-prunes',
    name: 'Чорнослив',
    category: 'Сухофрукти',
    icon: '🟣',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Затверділість', 'Пліснява', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Корисний для травлення', 'Компоти, начинки'],
    isBuiltIn: true,
  },

{
    id: 'prod-dried-pears',
    name: 'Груші сушені',
    category: 'Сухофрукти',
    icon: '🍐',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Затверділість', 'Пліснява', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Українська традиція', 'Узвар на Різдво'],
    isBuiltIn: true,
  },

{
    id: 'prod-dried-apples',
    name: 'Яблука сушені',
    category: 'Сухофрукти',
    icon: '🍎',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Пліснява', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Компоти, узвар', 'Зберігати у тканинних мішечках'],
    isBuiltIn: true,
  },

{
    id: 'prod-dates',
    name: 'Фініки',
    category: 'Сухофрукти',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Засахарення', 'Затверділість', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Природна солодість', 'Для компотів та десертів'],
    isBuiltIn: true,
  },

{
    id: 'prod-figs-dried',
    name: 'Інжир сушений',
    category: 'Сухофрукти',
    icon: '🟣',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Затверділість', 'Пліснява', 'Засахарення'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Компоти, начинки', 'Багато клітковини'],
    isBuiltIn: true,
  }
]
