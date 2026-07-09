import type { Product } from '../../types'

export const jamFruitsProducts: Product[] = [
{
    id: 'prod-canning-gooseberry',
    name: 'Аґрус',
    category: 'Фрукти та ягоди',
    icon: '🟢',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 10 },
    ],
    compatibility: [],
    spoilageSigns: ['М\'якість', 'Бродіння', 'Пліснява'],
    seasonMonths: [6, 7],
    tips: ['Основа для "Царського" (смарагдового) варення.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-red-currant',
    name: 'Смородина червона (порічка)',
    category: 'Фрукти та ягоди',
    icon: '🔴',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 7 },
    ],
    compatibility: [],
    spoilageSigns: ['Витікання соку', 'Пліснява'],
    seasonMonths: [6, 7],
    tips: ['Містить багато пектину, ідеальна для желе без желатину.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-cherry-plum',
    name: 'Алича',
    category: 'Фрукти та ягоди',
    icon: '🟡',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 14 },
    ],
    compatibility: [],
    spoilageSigns: ['Гниття', 'Бродіння'],
    seasonMonths: [7, 8],
    tips: ['Для кисло-солодких компотів та грузинського соусу Ткемалі.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-tea-rose',
    name: 'Пелюстки чайної троянди',
    category: 'Фрукти та ягоди',
    icon: '🌹',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 3 },
    ],
    compatibility: [],
    spoilageSigns: ['В\'янення', 'Коричневі плями'],
    seasonMonths: [5, 6],
    tips: ['Перетерти з цукром у день збору для зберігання аромату.'],
    isBuiltIn: true,
  }
]
