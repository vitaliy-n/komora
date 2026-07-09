import type { Product } from '../../types'

export const auxiliaryProducts: Product[] = [
{
    id: 'prod-sugar',
    name: 'Цукор',
    category: 'Допоміжні інгредієнти',
    icon: '🧂',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 60 }, shelfLifeDays: 3650, tips: 'У герметичній тарі, в сухому місці' },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування від вологи', 'Сторонній запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Основний інгредієнт варення та компотів', 'Поглинає запахи'],
    isBuiltIn: true,
  },

{
    id: 'prod-salt',
    name: 'Сіль кам\'яна',
    category: 'Допоміжні інгредієнти',
    icon: '🧂',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 50 }, shelfLifeDays: 3650, tips: 'У сухому місці' },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування від вологи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для консервації — ТІЛЬКИ кам\'яна без добавок', 'НЕ використовувати йодовану — псує консервацію', 'НЕ використовувати "Екстра" — містить добавки'],
    isBuiltIn: true,
  },

{
    id: 'prod-vinegar',
    name: 'Оцет столовий 9%',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 3650, tips: 'В темному місці' },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Основний консервант для маринадів', '9% — найпоширеніший для консервації'],
    isBuiltIn: true,
  },

{
    id: 'prod-apple-vinegar',
    name: 'Оцет яблучний',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння', 'Осад'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['М\'якший за столовий — для ніжних маринадів', 'Осад у натуральному оцті — це нормально'],
    isBuiltIn: true,
  },

{
    id: 'prod-wine-vinegar',
    name: 'Оцет винний',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для вишуканих маринадів та соусів'],
    isBuiltIn: true,
  },

{
    id: 'prod-citric-acid',
    name: 'Лимонна кислота',
    category: 'Допоміжні інгредієнти',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 50 }, shelfLifeDays: 3650, tips: 'В герметичній тарі, подалі від вологи' },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Зміна кольору'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Замінює оцет — 1 ч.л. = 50 мл оцту 9%', 'Запобігає потемнінню фруктів', 'Для компотів та варення без оцту'],
    isBuiltIn: true,
  },

{
    id: 'prod-pectin',
    name: 'Пектин',
    category: 'Допоміжні інгредієнти',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 50 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Втрата желюючих властивостей'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для джемів та конфітюрів — загущує без довгого варіння', 'Зберігає колір та вітаміни краще за звичайне варення'],
    isBuiltIn: true,
  },

{
    id: 'prod-gelatin',
    name: 'Желатин',
    category: 'Допоміжні інгредієнти',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 50 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для желе та холодцю', 'Не кип\'ятити — втрачає властивості'],
    isBuiltIn: true,
  },

{
    id: 'prod-agar',
    name: 'Агар-агар',
    category: 'Допоміжні інгредієнти',
    icon: '⬜',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Рослинна альтернатива желатину', 'Сильніший за желатин — потрібно менше'],
    isBuiltIn: true,
  },

{
    id: 'prod-sunflower-oil',
    name: 'Олія соняшникова',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365, tips: 'В темному місці, в скляній тарі' },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах', 'Гіркий смак', 'Помутніння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Рафінована — для маринадів та салатів', 'Нерафінована — ароматніша для ікри'],
    isBuiltIn: true,
  },

{
    id: 'prod-olive-oil',
    name: 'Олія оливкова',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'room', temperature: { min: 15, max: 22 }, shelfLifeDays: 540, tips: 'В темному місці' },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах', 'Гіркий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для в\'ялених помідорів та овочів в олії'],
    isBuiltIn: true,
  },

{
    id: 'prod-tomato-paste',
    name: 'Томатна паста',
    category: 'Допоміжні інгредієнти',
    icon: '🍅',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365, tips: 'Закрита банка' },
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 14, tips: 'Відкрита банка' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Потемніння', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додають у лечо, аджику та соуси для густоти'],
    isBuiltIn: true,
  },

{
    id: 'prod-honey',
    name: 'Мед',
    category: 'Допоміжні інгредієнти',
    icon: '🍯',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 40, max: 60 }, shelfLifeDays: 730, tips: 'В скляній тарі з герметичною кришкою' },
    ],
    compatibility: [],
    spoilageSigns: ['Бродіння (піна)', 'Кислий запах', 'Розшарування'],
    seasonMonths: [5, 6, 7, 8],
    tips: ['Кристалізація — природній процес', 'Замінює цукор у деяких рецептах варення', 'Не нагрівати вище 40°C'],
    isBuiltIn: true,
  },

{
    id: 'prod-aspirin',
    name: 'Аспірин (ацетилсаліцилова кислота)',
    category: 'Допоміжні інгредієнти',
    icon: '💊',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095, tips: 'В сухому темному місці' },
    ],
    compatibility: [],
    spoilageSigns: ['Розкришування таблеток', 'Оцтовий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Деякі господині додають замість оцту — 1 таблетка на літрову банку', 'Спірний метод — не рекомендується для дитячого харчування'],
    isBuiltIn: true,
  },

{
    id: 'prod-mustard-powder',
    name: 'Гірчичний порошок',
    category: 'Допоміжні інгредієнти',
    icon: '🟡',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Втрата гостроти'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Засипати під кришку для запобігання плісняві', 'Для домашньої гірчиці'],
    isBuiltIn: true,
  },

{
    id: 'prod-baking-soda',
    name: 'Сода харчова',
    category: 'Допоміжні інгредієнти',
    icon: '⬜',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 3650 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для миття банок перед стерилізацією', 'Знижує кислотність'],
    isBuiltIn: true,
  },

{
    id: 'prod-corn-starch',
    name: 'Крохмаль кукурудзяний',
    category: 'Допоміжні інгредієнти',
    icon: '⬜',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 50 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Сторонній запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Загущувач для джемів та соусів'],
    isBuiltIn: true,
  },

{
    id: 'prod-sesame-oil',
    name: 'Олія кунжутна',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'room', temperature: { min: 15, max: 22 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах', 'Гіркий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для азіатських маринадів'],
    isBuiltIn: true,
  },

{
    id: 'prod-linseed-oil',
    name: 'Олія лляна',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'fridge', temperature: { min: 0, max: 4 }, shelfLifeDays: 90, tips: 'Тільки в холодильнику!' },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах', 'Гіркий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Не підходить для нагрівання', 'Для холодних заправок'],
    isBuiltIn: true,
  },

{
    id: 'prod-corn-oil',
    name: 'Олія кукурудзяна',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий запах', 'Гіркий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Нейтральний смак — підходить для будь-якої консервації'],
    isBuiltIn: true,
  },

{
    id: 'prod-wine-white',
    name: 'Вино біле (для маринадів)',
    category: 'Допоміжні інгредієнти',
    icon: '🍷',
    storage: [
      { method: 'room', temperature: { min: 10, max: 18 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Окислення', 'Оцтовий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для вишуканих маринадів замість оцту'],
    isBuiltIn: true,
  },

{
    id: 'prod-vodka',
    name: 'Горілка (для наливок)',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 3650 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Основа для настоянок та наливок', '1 ст.л. під кришку замість оцту'],
    isBuiltIn: true,
  },

{
    id: 'prod-brown-sugar',
    name: 'Цукор тростинний',
    category: 'Допоміжні інгредієнти',
    icon: '🟤',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, humidity: { min: 30, max: 60 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Затверділість', 'Сторонній запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Надає карамельний відтінок варенню та джемам'],
    isBuiltIn: true,
  },

{
    id: 'prod-sea-salt',
    name: 'Сіль морська',
    category: 'Допоміжні інгредієнти',
    icon: '🧂',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 3650 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування від вологи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Перевіряти склад — без добавок!', 'Підходить для засолки якщо без йоду та добавок'],
    isBuiltIn: true,
  },

{
    id: 'prod-soy-sauce',
    name: 'Соєвий соус',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява (рідко)', 'Зміна смаку', 'Осад'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Натурального бродіння зберігається краще', 'Замінює сіль у маринадах'],
    isBuiltIn: true,
  },

{
    id: 'prod-coconut-milk',
    name: 'Кокосове молоко (консервоване)',
    category: 'Допоміжні інгредієнти',
    icon: '🥥',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730, tips: 'В закритій банці' },
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 3, tips: 'Після відкриття перелити в скло' },
    ],
    compatibility: [],
    spoilageSigns: ['Кислий запах', 'Зміна кольору', 'Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для азіатських супів та десертів'],
    isBuiltIn: true,
  },

{
    id: 'prod-maple-syrup',
    name: 'Кленовий сироп',
    category: 'Допоміжні інгредієнти',
    icon: '🍁',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 730, tips: 'Після відкриття — ТІЛЬКИ в холодильнику' },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява на поверхні', 'Бродіння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Альтернатива цукру', 'Унікальний аромат'],
    isBuiltIn: true,
  },

{
    id: 'prod-stevia',
    name: 'Стевія (цукрозамінник)',
    category: 'Допоміжні інгредієнти',
    icon: '🌿',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування', 'Втрата солодкості'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Натуральний безкалорійний підсолоджувач', 'Набагато солодша за цукор'],
    isBuiltIn: true,
  },

{
    id: 'prod-oil-pumpkin',
    name: 'Олія гарбузова',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'fridge', temperature: { min: 4, max: 8 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклий смак'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Має темно-зелений колір та горіховий аромат'],
    isBuiltIn: true,
  },

{
    id: 'prod-oil-walnut',
    name: 'Олія волоського горіха',
    category: 'Допоміжні інгредієнти',
    icon: '🫒',
    storage: [
      { method: 'fridge', temperature: { min: 4, max: 8 }, shelfLifeDays: 120 },
    ],
    compatibility: [],
    spoilageSigns: ['Гіркота'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для заправки салатів, не для смаження'],
    isBuiltIn: true,
  },

{
    id: 'prod-oil-ghee',
    name: 'Масло Гхі (Дхі)',
    category: 'Допоміжні інгредієнти',
    icon: '🧈',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Старий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Топлене вершкове масло, ідеально для смаження'],
    isBuiltIn: true,
  },

{
    id: 'prod-vinegar-balsamic',
    name: 'Оцет бальзамічний',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1825 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння (рідко)'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Класика італійської кухні'],
    isBuiltIn: true,
  },

{
    id: 'prod-vinegar-rice',
    name: 'Оцет рисовий',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Осад'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Обов\'язковий для суші та азіатських маринадів'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-teriyaki',
    name: 'Соус Теріякі',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Солодко-солоний соус для глазурування'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-worcestershire',
    name: 'Соус Ворчестер (Ворчестерширський)',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Зміна смаку'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Має дуже складний ферментований склад'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-sriracha',
    name: 'Соус Шрирача',
    category: 'Допоміжні інгредієнти',
    icon: '🌶️',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Гострий чилі-соус з часником'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-fish',
    name: 'Соус рибний',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Кристалізація солі (нормально)', 'Неприємний запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Дуже солоний та ароматний, основа тайської кухні'],
    isBuiltIn: true,
  },

{
    id: 'prod-mayonnaise-home',
    name: 'Майонез домашній',
    category: 'Допоміжні інгредієнти',
    icon: '🥣',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 4 }, shelfLifeDays: 3 },
    ],
    compatibility: [],
    spoilageSigns: ['Розшарування', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Готувати безпосередньо перед вживанням'],
    isBuiltIn: true,
  },

{
    id: 'prod-mustard-ready',
    name: 'Гірчиця готова (діжонська)',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Висихання', 'Втрата гостроти'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['З цілими зернами або гостра'],
    isBuiltIn: true,
  },

{
    id: 'prod-cocoa-powder',
    name: 'Какао-порошок',
    category: 'Допоміжні інгредієнти',
    icon: '🍫',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Вибирайте алкалізоване какао для випічки'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-pesto',
    name: 'Соус Песто',
    category: 'Допоміжні інгредієнти',
    icon: '🌿',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 4 }, shelfLifeDays: 7 },
    ],
    compatibility: [],
    spoilageSigns: ['Потемніння', 'Кислий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Заливайте тонким шаром олії зверху для зберігання'],
    isBuiltIn: true,
  },

{
    id: 'prod-mushroom-truffle-oil',
    name: 'Трюфельна олія',
    category: 'Допоміжні інгредієнти',
    icon: '🧴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата аромату'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Додавати кілька крапель у готову страву'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-soy',
    name: 'Соус соєвий',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 20 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява', 'Різкий оцтовий запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Натурального бродіння кращий за хімічний'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-fish',
    name: 'Соус рибний',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Випадання кристалів солі — це норма'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Основа азійської кухні, дуже солоний'],
    isBuiltIn: true,
  },

{
    id: 'prod-sauce-oyster',
    name: 'Соус устричний',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 6 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Пліснява біля кришки'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Надає стравам густого карамельного смаку'],
    isBuiltIn: true,
  },

{
    id: 'prod-vinegar-rice',
    name: 'Оцет рисовий',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння', 'Осад'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['М’якший за звичайний оцет, для суші'],
    isBuiltIn: true,
  },

{
    id: 'prod-vinegar-balsamic-glaze',
    name: 'Бальзамічний крем-глазур',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Загусання до неможливості видавити'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для прикрашання страв та салатів'],
    isBuiltIn: true,
  },

{
    id: 'prod-oil-sesame',
    name: 'Олія кунжутна',
    category: 'Допоміжні інгредієнти',
    icon: '🧴',
    storage: [
      { method: 'fridge', temperature: { min: 2, max: 10 }, shelfLifeDays: 180 },
    ],
    compatibility: [],
    spoilageSigns: ['Прогірклість'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Використовуйте олію зі смаженого кунжуту для аромату'],
    isBuiltIn: true,
  },

{
    id: 'prod-oil-avocado',
    name: 'Олія авокадо',
    category: 'Допоміжні інгредієнти',
    icon: '🧴',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Зміна кольору', 'Запах'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Висока точка димлення, підходить для смаження'],
    isBuiltIn: true,
  },

{
    id: 'prod-other-yeast-dry',
    name: 'Дріжджі сухі активні',
    category: 'Допоміжні інгредієнти',
    icon: '🍞',
    storage: [
      { method: 'room', temperature: { min: 15, max: 20 }, shelfLifeDays: 365 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата підйомної сили (не активуються)'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Зберігати в сухому місці, після відкриття — в холодильнику'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-salt-rock',
    name: 'Сіль кам\'яна (не йодована)',
    category: 'Допоміжні інгредієнти',
    icon: '🧂',
    storage: [
      { method: 'room', temperature: { min: 10, max: 25 }, shelfLifeDays: 3650 },
    ],
    compatibility: [],
    spoilageSigns: ['Скам\'яніння від вологи'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Обов\'язкова для солінь. Йодована сіль розм\'якшує овочі.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-vinegar-9',
    name: 'Оцет столовий 9%',
    category: 'Допоміжні інгредієнти',
    icon: '🍶',
    storage: [
      { method: 'room', temperature: { min: 10, max: 25 }, shelfLifeDays: 1825 },
    ],
    compatibility: [],
    spoilageSigns: ['Помутніння (хоча для консервації зазвичай не критично)'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Головний консервант для маринадів. Зберігати в темному місці.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-citric-acid',
    name: 'Лимонна кислота',
    category: 'Допоміжні інгредієнти',
    icon: '🍋',
    storage: [
      { method: 'room', temperature: { min: 10, max: 25 }, shelfLifeDays: 1095 },
    ],
    compatibility: [],
    spoilageSigns: ['Збивання в тверді грудки'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Альтернатива оцту для більш м\'якого смаку маринадів.'],
    isBuiltIn: true,
  },

{
    id: 'prod-canning-pectin',
    name: 'Желфікс / Пектин',
    category: 'Допоміжні інгредієнти',
    icon: '🥄',
    storage: [
      { method: 'room', temperature: { min: 15, max: 25 }, shelfLifeDays: 730 },
    ],
    compatibility: [],
    spoilageSigns: ['Втрата желюючих властивостей', 'Грудкування'],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tips: ['Для густих джемів та конфітюрів при меншій кількості цукру.'],
    isBuiltIn: true,
  }
]
