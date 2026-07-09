import type { Product } from '../../types'

export const dairyEggsProducts: Product[] = [
{
    id: 'prod-chicken-eggs',
    name: 'Яйця курячі',
    category: 'Молочні та яйця',
    icon: '🥚',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 30 },
      { method: 'room', temperature: { min: 15, max: 20 }, shelfLifeDays: 10 },
    ],
    compatibility: [],
    spoilageSigns: ['Неприємний запах при розбиванні', 'Яйце спливає у воді'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Зберігати тупим кінцем догори'],
    isBuiltIn: true,
  },

{
    id: 'prod-quail-eggs',
    name: 'Яйця перепелині',
    category: 'Молочні та яйця',
    icon: '🥚',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 60 },
    ],
    compatibility: [],
    spoilageSigns: ['Висихання всередині'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Маленькі та дуже корисні, не викликають алергії'],
    isBuiltIn: true,
  },

{
    id: 'prod-cheese-parmesan',
    name: 'Сир Пармезан (Парміджано)',
    category: 'Молочні та яйця',
    icon: '🧀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 90 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява (нетипова)', 'Зміна запаху'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Твердий сир, зберігати загорнутим у пергамент'],
    isBuiltIn: true,
  },

{
    id: 'prod-cheese-mozzarella',
    name: 'Сир Моцарела',
    category: 'Молочні та яйця',
    icon: '🧀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 7, tips: 'У розсолі' },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння розсолу', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Класика для піци та салату Капрезе'],
    isBuiltIn: true,
  },

{
    id: 'prod-cheese-brie',
    name: 'Сир Брі',
    category: 'Молочні та яйця',
    icon: '🧀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 14 },
    ],
    compatibility: [],
    spoilageSigns: ['Аміачний запах', 'Потемніння шкірки'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['М\'який сир з білою пліснявою'],
    isBuiltIn: true,
  },

{
    id: 'prod-cheese-feta',
    name: 'Сир Фета',
    category: 'Молочні та яйця',
    icon: '🧀',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 30, tips: 'У розсолі' },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Гіркий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Традиційний грецький сир з овечого молока'],
    isBuiltIn: true,
  },

{
    id: 'prod-yogurt-greek',
    name: 'Йогурт грецький',
    category: 'Молочні та яйця',
    icon: '🥛',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 14 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Бульбашки повітря'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Густий йогурт без добавок, замінник сметани'],
    isBuiltIn: true,
  },

{
    id: 'prod-kefir',
    name: 'Кефір',
    category: 'Молочні та яйця',
    icon: '🥛',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 7 },
    ],
    compatibility: [],
    spoilageSigns: ['Розшарування', 'Різкий кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Кисломолочний напій, корисний для травлення'],
    isBuiltIn: true,
  },

{
    id: 'prod-tofu',
    name: 'Тофу (соєвий сир)',
    category: 'Молочні та яйця',
    icon: '⬜',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 7, tips: 'У воді, яку треба міняти щодня' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Кислий запах', 'Пожовтіння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Рослинна альтернатива сиру'],
    isBuiltIn: true,
  },

{
    id: 'prod-dairy-coconut-milk',
    name: 'Молоко кокосове (консервоване)',
    category: 'Молочні та яйця',
    icon: '🥥',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 3, tips: 'Після відкриття перелити в скло' },
    ],
    compatibility: [],
    spoilageSigns: ['Зміна кольору', 'Металевий присмак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для тайських супів та десертів'],
    isBuiltIn: true,
  },

{
    id: 'prod-dairy-almond-milk',
    name: 'Молоко мигдальне',
    category: 'Молочні та яйця',
    icon: '🥛',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 5 },
    ],
    compatibility: [],
    spoilageSigns: ['Розшарування', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Рослинна альтернатива молоку'],
    isBuiltIn: true,
  },

{
    id: 'prod-dairy-tofu',
    name: 'Тофу (сир соєвий)',
    category: 'Молочні та яйця',
    icon: '⬜',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 7, tips: 'У воді, яку треба щодня міняти' },
    ],
    compatibility: [],
    spoilageSigns: ['Слизькість', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Багатий на білок'],
    isBuiltIn: true,
  }
]
