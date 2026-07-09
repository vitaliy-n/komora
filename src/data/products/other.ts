import type { Product } from '../../types'

export const otherProducts: Product[] = [
{
    id: 'prod-chocolate-dark',
    name: 'Шоколад чорний',
    category: 'Інше',
    icon: '🍫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 18 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Білий наліт (сивина) — це жир, не псування', 'Старий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Не зберігати в холодильнику'],
    isBuiltIn: true,
  },

{
    id: 'prod-halva',
    name: 'Халва соняшникова',
    category: 'Інше',
    icon: '🍯',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, shelfLifeDays: 120 },
    ],
    compatibility: [],
    spoilageSigns: ['Витікання олії', 'Гіркота'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Традиційний східний десерт'],
    isBuiltIn: true,
  },

{
    id: 'prod-marshmallow-home',
    name: 'Зефір (домашній)',
    category: 'Інше',
    icon: '☁️',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 7 },
    ],
    compatibility: [],
    spoilageSigns: ['Зацукровування', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['На основі яблучного пюре та агар-агару'],
    isBuiltIn: true,
  },

{
    id: 'prod-canned-capers',
    name: 'Каперси мариновані',
    category: 'Інше',
    icon: '🟢',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 8 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Білий наліт', 'М’якість плодів'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Нерозквітлі бутони чагарника каперсника'],
    isBuiltIn: true,
  },

{
    id: 'prod-canned-olives-black',
    name: 'Маслини (чорні оливки)',
    category: 'Інше',
    icon: '🫒',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 8 }, shelfLifeDays: 14, tips: 'Після відкриття у розсолі' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява на поверхні розсолу'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Багаті на корисні жири'],
    isBuiltIn: true,
  },

{
    id: 'prod-canned-olives-green',
    name: 'Оливки зелені',
    category: 'Інше',
    icon: '🫒',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 8 }, shelfLifeDays: 14 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Зелені оливки збирають недозрілими'],
    isBuiltIn: true,
  },

{
    id: 'prod-canned-sundried-tomatoes',
    name: "Томати в'ялені в олії",
    category: 'Інше',
    icon: '🍅',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Зміна кольору на дуже темний'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Олію можна використовувати для салатів'],
    isBuiltIn: true,
  },

{
    id: 'prod-sweets-maple-syrup',
    name: 'Сироп кленовий',
    category: 'Інше',
    icon: '🍁',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 365, tips: 'Після відкриття тільки в холоді' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява на поверхні'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Натуральний підсолоджувач з соку клена'],
    isBuiltIn: true,
  },

{
    id: 'prod-sweets-agave-nectar',
    name: 'Нектар агави',
    category: 'Інше',
    icon: '🌵',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Кристалізація (цукрування)'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Солодший за цукор, низький глікемічний індекс'],
    isBuiltIn: true,
  }
]
