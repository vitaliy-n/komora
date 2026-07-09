import type { Product } from '../../types'

export const beveragesProducts: Product[] = [
{
    id: 'prod-pomegranate-juice',
    name: 'Сік гранатовий (свіжий)',
    category: 'Напої',
    icon: '🧃',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 2 },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий запах', 'Зміна кольору'],
    seasonMonths: [10, 11, 12, 1],
    tips: ['Потужний антиоксидант'],
    isBuiltIn: true,
  },

{
    id: 'prod-birch-sap',
    name: 'Сік березовий',
    category: 'Напої',
    icon: '🥤',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 3 },
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365, tips: 'Консервований' },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння', 'Кислий смак'],
    seasonMonths: [3, 4],
    tips: ['Традиційний весняний напій'],
    isBuiltIn: true,
  },

{
    id: 'prod-apple-juice',
    name: 'Сік яблучний',
    category: 'Напої',
    icon: '🧃',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730, tips: 'Консервований' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява під кришкою', 'Бродіння'],
    seasonMonths: [8, 9, 10],
    tips: ['Основа для сидру'],
    isBuiltIn: true,
  },

{
    id: 'prod-tomato-juice',
    name: 'Сік томатний',
    category: 'Напої',
    icon: '🥤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Бродіння'],
    seasonMonths: [8, 9],
    tips: ['Краще готувати зі зрілих м\'ясистих помідорів'],
    isBuiltIn: true,
  },

{
    id: 'prod-grape-juice',
    name: 'Сік виноградний',
    category: 'Напої',
    icon: '🧃',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Осад (винний камінь — це нормально)', 'Бродіння'],
    seasonMonths: [9, 10],
    tips: ['Дуже поживний'],
    isBuiltIn: true,
  },

{
    id: 'prod-pumpkin-juice',
    name: 'Сік гарбузовий',
    category: 'Напої',
    icon: '🥤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Бродіння'],
    seasonMonths: [9, 10, 11],
    tips: ['Часто змішують з яблучним соком'],
    isBuiltIn: true,
  },

{
    id: 'prod-kvass',
    name: 'Квас (домашній)',
    category: 'Напої',
    icon: '🍺',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 7 },
    ],
    compatibility: [],
    spoilageSigns: ['Надмірна кислота', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Традиційний ферментований напій'],
    isBuiltIn: true,
  },

{
    id: 'prod-mead',
    name: 'Медовуха',
    category: 'Напої',
    icon: '🍯',
    storage: [
      { method: 'room', temperature: { min: 10, max: 18 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Оцтовий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Старовинний напій на основі меду'],
    isBuiltIn: true,
  },

{
    id: 'prod-cider',
    name: 'Сидр (яблучний)',
    category: 'Напої',
    icon: '🍏',
    storage: [
      { method: 'room', temperature: { min: 10, max: 15 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Перетворення на оцет'],
    seasonMonths: [9, 10, 11],
    tips: ['Легкий алкогольний напій з яблучного соку'],
    isBuiltIn: true,
  },

{
    id: 'prod-wine-red-home',
    name: 'Вино червоне (домашнє)',
    category: 'Напої',
    icon: '🍷',
    storage: [
      { method: 'basement', temperature: { min: 10, max: 14 }, shelfLifeDays: 3650 },
    ],
    compatibility: [],
    spoilageSigns: ['Оцтове скисання', 'Помутніння'],
    seasonMonths: [9, 10],
    tips: ['Найкраще зберігати у скляних бутлях у темряві'],
    isBuiltIn: true,
  },

{
    id: 'prod-tea-black',
    name: 'Чай чорний (листовий)',
    category: 'Напої',
    icon: '☕',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730, tips: 'В сухому темному місці' },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату', 'Пліснява від вологи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Поглинає сторонні запахи'],
    isBuiltIn: true,
  },

{
    id: 'prod-tea-green',
    name: 'Чай зелений',
    category: 'Напої',
    icon: '🍵',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата свіжого кольору'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Містить багато антиоксидантів'],
    isBuiltIn: true,
  },

{
    id: 'prod-coffee-beans',
    name: 'Кава в зернах',
    category: 'Напої',
    icon: '🫘',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365, tips: 'У клапанному пакеті' },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Мелена кава втрачає аромат за 15 хвилин'],
    isBuiltIn: true,
  },

{
    id: 'prod-tea-matcha',
    name: 'Чай Матча (порошок)',
    category: 'Напої',
    icon: '🍵',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 8 }, shelfLifeDays: 90, tips: 'У герметичній непрозорій тарі' },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння порошку', 'Втрата запаху трави'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Японський розтертий зелений чай'],
    isBuiltIn: true,
  },

{
    id: 'prod-tea-hibiscus',
    name: 'Каркаде (суданька троянда)',
    category: 'Напої',
    icon: '🌺',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата кольору пелюсток'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Має приємну кислотність, можна пити холодним'],
    isBuiltIn: true,
  },

{
    id: 'prod-drink-kombucha',
    name: 'Комбуча (чайний гриб)',
    category: 'Напої',
    icon: '🍺',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30 },
    ],
    compatibility: [],
    spoilageSigns: ['Оцтовий запах', 'Неприємний осад'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Ферментований напій, багатий на пробіотики'],
    isBuiltIn: true,
  }
]
