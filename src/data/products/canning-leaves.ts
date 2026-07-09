import type { Product } from '../../types'

export const canningLeavesProducts: Product[] = [
{
    id: 'prod-cherry-leaf',
    name: 'Листя вишні',
    category: 'Листя для консервації',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 2 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 7, tips: 'У вологому рушнику' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'В\'ялість', 'Чорні плями'],
    seasonMonths: [5, 6, 7, 8],
    tips: ['Надає огіркам хрусткість', 'Додавати 3-5 листочків на літрову банку', 'Класичний інгредієнт маринованих огірків'],
    isBuiltIn: true,
  },

{
    id: 'prod-currant-leaf',
    name: 'Листя смородини (чорної)',
    category: 'Листя для консервації',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 2 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 7 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'В\'ялість', 'Плісняві плями'],
    seasonMonths: [5, 6, 7, 8],
    tips: ['Надає маринаду аромат та антибактеріальні властивості', '2-3 листки на банку', 'Один з найважливіших інгредієнтів для засолки'],
    isBuiltIn: true,
  },

{
    id: 'prod-horseradish-leaf',
    name: 'Листя хріну',
    category: 'Листя для консервації',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 1 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 5, tips: 'Загорнути у вологий рушник' },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'В\'ялість', 'Потемніння'],
    seasonMonths: [5, 6, 7, 8, 9],
    tips: ['Запобігає плісняві в банці', 'Кладеться на дно та зверху банки', 'Надає огіркам хрусткість та гостроту'],
    isBuiltIn: true,
  },

{
    id: 'prod-oak-leaf',
    name: 'Листя дуба',
    category: 'Листя для консервації',
    icon: '🍂',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 3 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 10 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'Висихання', 'Плісняві плями'],
    seasonMonths: [5, 6, 7, 8],
    tips: ['Містить дубильні речовини — огірки залишаються хрусткими', '1-2 листки на банку', 'Збирати молоді, не пошкоджені листки'],
    isBuiltIn: true,
  },

{
    id: 'prod-grape-leaf',
    name: 'Листя винограду',
    category: 'Листя для консервації',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 2 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 7 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365, tips: 'Скласти стопкою, загорнути в плівку' },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'Висихання', 'Плісняві плями'],
    seasonMonths: [5, 6, 7],
    tips: ['Для долми (голубців у виноградному листі)', 'Додають хрусткість огіркам при маринуванні', 'Маринують або заморожують для долми на зиму', 'Збирати молоді світло-зелені листки'],
    isBuiltIn: true,
  },

{
    id: 'prod-walnut-leaf',
    name: 'Листя горіха волоського',
    category: 'Листя для консервації',
    icon: '🍃',
    storage: [
      { method: 'room', temperature: { min: 18, max: 22 }, shelfLifeDays: 3 },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 10 },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'Висихання', 'Чорні плями'],
    seasonMonths: [5, 6, 7, 8],
    tips: ['Має антисептичні властивості', 'Додає пряний аромат маринадам', 'Використовують при маринуванні помідорів'],
    isBuiltIn: true,
  },

{
    id: 'prod-bay-leaf-fresh',
    name: 'Лавровий лист (свіжий)',
    category: 'Листя для консервації',
    icon: '🍃',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 14 },
      { method: 'freezer', temperature: { min: -18, max: -15 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пожовтіння', 'Висихання'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Свіжий має більш м\'який аромат ніж сушений'],
    isBuiltIn: true,
  }
]
