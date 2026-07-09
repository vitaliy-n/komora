import type { Product } from '../../types'

export const nutsProducts: Product[] = [
{
    id: 'prod-walnut',
    name: 'Горіх волоський',
    category: 'Горіхи',
    icon: '🌰',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 180, tips: 'У шкаралупі, в тканинному мішечку' },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 365 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркий смак', 'Пліснява', 'Прогірклий запах'],
    seasonMonths: [9, 10],
    tips: ['Варення з зелених горіхів — екзотичний делікатес'],
    isBuiltIn: true,
  },

{
    id: 'prod-hazelnut',
    name: 'Ліщина (фундук)',
    category: 'Горіхи',
    icon: '🌰',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак', 'Пліснява', 'Комахи'],
    seasonMonths: [9, 10],
    tips: ['Додають у варення та джеми для текстури'],
    isBuiltIn: true,
  },

{
    id: 'prod-almond',
    name: 'Мигдаль',
    category: 'Горіхи',
    icon: '🌰',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, humidity: { min: 50, max: 60 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 545 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак', 'Пліснява'],
    seasonMonths: [8, 9, 10],
    tips: ['Мигдаль у варенні — вишуканий акцент', 'Мигдальна есенція — для аромату'],
    isBuiltIn: true,
  },

{
    id: 'prod-pine-nuts',
    name: 'Кедрові горіхи',
    category: 'Горіхи',
    icon: '🟡',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 90 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак', 'Пліснява'],
    seasonMonths: [9, 10, 11],
    tips: ['Для песто та вишуканих заготовок'],
    isBuiltIn: true,
  },

{
    id: 'prod-pistachio',
    name: 'Фісташки',
    category: 'Горіхи',
    icon: '🥜',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365, tips: 'В шкаралупі' },
      { method: 'fridge', temperature: { min: 0, max: 5 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак', 'Пліснява', 'Комахи'],
    seasonMonths: [9, 10],
    tips: ['Фісташкове варення — делікатес', 'Для прикрашання десертів'],
    isBuiltIn: true,
  },

{
    id: 'prod-cashew',
    name: 'Кеш\'ю',
    category: 'Горіхи',
    icon: '🥜',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 180 },
      { method: 'fridge', temperature: { min: 0, max: 5 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['М\'якість', 'Прогірклий запах', 'Комахи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовують для веганських соусів та десертів'],
    isBuiltIn: true,
  }
]
