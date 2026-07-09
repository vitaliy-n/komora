import type { Product } from '../../types'

export const seafoodProducts: Product[] = [
{
    id: 'prod-shrimp-tiger',
    name: 'Креветки тигрові',
    category: 'Морепродукти',
    icon: '🦐',
    storage: [
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 1, tips: 'Розморожені' },
    ],
    compatibility: [],
    spoilageSigns: ['Чорні плями на голові', 'Аміачний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Великі креветки, ідеальні для гриля'],
    isBuiltIn: true,
  },

{
    id: 'prod-mussels',
    name: 'Мідії',
    category: 'Морепродукти',
    icon: '🐚',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 1, tips: 'Живі' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Відкриті раковини, що не закриваються при постукуванні', 'Запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Живі мідії мають бути щільно закриті'],
    isBuiltIn: true,
  },

{
    id: 'prod-squid',
    name: 'Кальмари',
    category: 'Морепродукти',
    icon: '🦑',
    storage: [
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Жовтуватий колір м\'яса', 'Сильний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Варити не більше 2-3 хвилин, щоб не стали "гумовими"'],
    isBuiltIn: true,
  },

{
    id: 'prod-octopus',
    name: 'Восьминіг',
    category: 'Морепродукти',
    icon: '🐙',
    storage: [
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 120 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Різкий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Заморожування робить м\'ясо восьминога ніжнішим'],
    isBuiltIn: true,
  },

{
    id: 'prod-scallops',
    name: 'Морський гребінець',
    category: 'Морепродукти',
    icon: '🐚',
    storage: [
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата білого кольору', 'Запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Делікатесний продукт з ніжним смаком'],
    isBuiltIn: true,
  },

{
    id: 'prod-crab-sticks',
    name: 'Крабові палички',
    category: 'Морепродукти',
    icon: '🦀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 45, tips: 'Упаковка' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий запах', 'Липкість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Виготовляються з сурімі (фаршу білої риби)'],
    isBuiltIn: true,
  },

{
    id: 'prod-seaweed',
    name: 'Морська капуста (Ламінарія)',
    category: 'Морепродукти',
    icon: '🌿',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30, tips: 'Маринована' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Надмірна м\'якість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Джерело йоду'],
    isBuiltIn: true,
  },

{
    id: 'prod-red-caviar',
    name: 'Ікра червона',
    category: 'Морепродукти',
    icon: '🔴',
    storage: [
      { method: 'fridge', temperature: { min: -4, max: 0 }, shelfLifeDays: 180, tips: 'Закрита банка' },
      { method: 'fridge', temperature: { min: 2, max: 4 }, shelfLifeDays: 3, tips: 'Відкрита' },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркота', 'Кислий запах', 'Помутніння'],
    seasonMonths: [7, 8, 9],
    tips: ['Зберігати в найхолоднішій зоні холодильника'],
    isBuiltIn: true,
  },

{
    id: 'prod-black-caviar',
    name: 'Ікра чорна',
    category: 'Морепродукти',
    icon: '⚫',
    storage: [
      { method: 'fridge', temperature: { min: -4, max: 0 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Запах', 'Зміна кольору'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Дуже дорогий та рідкісний продукт'],
    isBuiltIn: true,
  },

{
    id: 'prod-crayfish',
    name: 'Раки річкові',
    category: 'Морепродукти',
    icon: '🦞',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 1, tips: 'Живі' },
    ],
    compatibility: [],
    spoilageSigns: ['Мала активність живих раків', 'Запах'],
    seasonMonths: [5, 6, 7, 8, 9],
    tips: ['Варити тільки живими!'],
    isBuiltIn: true,
  },

{
    id: 'prod-oysters',
    name: 'Устриці',
    category: 'Морепродукти',
    icon: '🐚',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 5, tips: 'Живі на льоду' },
    ],
    compatibility: [],
    spoilageSigns: ['Відкрита мушля', 'Запах'],
    seasonMonths: [9, 10, 11, 12, 1, 2, 3, 4],
    tips: ['Традиційно вживаються в місяці, у назві яких є літера "Р"'],
    isBuiltIn: true,
  }
]
