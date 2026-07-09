import type { Product } from '../../types'

export const saucesProducts: Product[] = [
{
    id: 'prod-tomato-paste',
    name: 'Томатна паста (домашня)',
    category: 'Соуси',
    icon: '🍅',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 180 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Кислий смак', 'Зміна кольору'],
    seasonMonths: [7, 8, 9],
    tips: ['Основа для багатьох страв', 'Зберігати під олією'],
    isBuiltIn: true,
  },

{
    id: 'prod-tomato-sauce',
    name: 'Томатний соус',
    category: 'Соуси',
    icon: '🍅',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 365, tips: 'Консервований' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Бродіння', 'Роздутість кришки'],
    seasonMonths: [7, 8, 9],
    tips: ['Універсальна заготовка', 'Для піци, пасти, борщів'],
    isBuiltIn: true,
  },

{
    id: 'prod-adjika',
    name: 'Аджика',
    category: 'Соуси',
    icon: '🌶️',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 365 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Втрата гостроти', 'Зміна кольору'],
    seasonMonths: [8, 9],
    tips: ['Гостра приправа до м\'яса', 'Кавказька класика'],
    isBuiltIn: true,
  },

{
    id: 'prod-tkemali',
    name: 'Ткемалі',
    category: 'Соуси',
    icon: '🟣',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Бродіння', 'Зміна кольору'],
    seasonMonths: [6, 7, 8],
    tips: ['Грузинський сливовий соус', 'До шашлику'],
    isBuiltIn: true,
  },

{
    id: 'prod-horseradish-sauce',
    name: 'Хрін (готовий соус)',
    category: 'Соуси',
    icon: '⬜',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата гостроти', 'Пліснява', 'Зміна кольору'],
    seasonMonths: [10, 11],
    tips: ['До холодцю та м\'яса', 'З буряком — червоний хрін'],
    isBuiltIn: true,
  },

{
    id: 'prod-pesto',
    name: 'Песто',
    category: 'Соуси',
    icon: '🌿',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 90, tips: 'Під шаром олії' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Пліснява', 'Прогіркла олія'],
    seasonMonths: [6, 7, 8],
    tips: ['Базилік, часник, пармезан, кедрові горіхи'],
    isBuiltIn: true,
  }
]
