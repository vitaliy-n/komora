import type { Product } from '../../types'

export const nutsSeedsProducts: Product[] = [
{
    id: 'prod-nut-pistachio',
    name: 'Фісташки смажені',
    category: 'Горіхи та насіння',
    icon: '🥜',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Зміна кольору ядра', 'Гіркота'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Багаті на калій'],
    isBuiltIn: true,
  },

{
    id: 'prod-nut-macadamia',
    name: 'Макадамія',
    category: 'Горіхи та насіння',
    icon: '🌰',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 10 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Найміцніша шкаралупа серед горіхів'],
    isBuiltIn: true,
  },

{
    id: 'prod-nut-pine',
    name: 'Кедрові горіхи',
    category: 'Горіхи та насіння',
    icon: '🌲',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркий присмак у роті після вживання'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Швидко окислюються при кімнатній температурі'],
    isBuiltIn: true,
  },

{
    id: 'prod-seed-flax',
    name: 'Насіння льону',
    category: 'Горіхи та насіння',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Краще засвоюється у меленому вигляді'],
    isBuiltIn: true,
  },

{
    id: 'prod-seed-chia',
    name: 'Насіння чіа',
    category: 'Горіхи та насіння',
    icon: '⚫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Затхлість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Абсорбує воду, утворюючи гель'],
    isBuiltIn: true,
  },

{
    id: 'prod-seed-pumpkin',
    name: 'Насіння гарбуза (очищене)',
    category: 'Горіхи та насіння',
    icon: '🟢',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість'],
    seasonMonths: [9, 10, 11, 12, 1, 2],
    tips: ['Джерело цинку'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-green-walnut',
    name: 'Горіх волоський (зелений)',
    category: 'Горіхи та насіння',
    icon: '🟢',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 5 }, shelfLifeDays: 10 },
    ],
    compatibility: [],
    spoilageSigns: ['Затвердіння шкаралупи (перезрівання)'],
    seasonMonths: [5, 6],
    tips: ['Для екзотичного варення. Потребує тривалого вимочування.'],
    isBuiltIn: true,
  }
]
