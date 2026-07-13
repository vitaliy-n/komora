export interface UnitConversion {
  from: string
  to: string
  factor: number
}

const CONVERSIONS: UnitConversion[] = [
  { from: 'кг', to: 'г', factor: 1000 },
  { from: 'г', to: 'кг', factor: 0.001 },
  { from: 'л', to: 'мл', factor: 1000 },
  { from: 'мл', to: 'л', factor: 0.001 },
  { from: 'кг', to: 'г', factor: 1000 },
  { from: 'склянки', to: 'мл', factor: 250 },
  { from: 'склянка', to: 'мл', factor: 250 },
  { from: 'ст.л.', to: 'мл', factor: 15 },
  { from: 'ст.л', to: 'мл', factor: 15 },
  { from: 'ч.л.', to: 'мл', factor: 5 },
  { from: 'ч.л', to: 'мл', factor: 5 },
  { from: 'шт', to: 'шт', factor: 1 },
  { from: 'пучок', to: 'г', factor: 50 },
  { from: 'пакет', to: 'г', factor: 500 },
]

export function convertUnit(amount: number, from: string, to: string): number | null {
  if (from === to) return amount

  const direct = CONVERSIONS.find((c) => c.from === from && c.to === to)
  if (direct) return Math.round(amount * direct.factor * 100) / 100

  const reverse = CONVERSIONS.find((c) => c.from === to && c.to === from)
  if (reverse) return Math.round(amount / reverse.factor * 100) / 100

  const fromToMl = CONVERSIONS.find((c) => c.from === from && c.to === 'мл')
  const mlToTo = CONVERSIONS.find((c) => c.from === 'мл' && c.to === to)
  if (fromToMl && mlToTo) {
    return Math.round(amount * fromToMl.factor * mlToTo.factor * 100) / 100
  }

  const fromToG = CONVERSIONS.find((c) => c.from === from && c.to === 'г')
  const gToTo = CONVERSIONS.find((c) => c.from === 'г' && c.to === to)
  if (fromToG && gToTo) {
    return Math.round(amount * fromToG.factor * gToTo.factor * 100) / 100
  }

  return null
}

export const COMMON_UNITS = ['кг', 'г', 'л', 'мл', 'шт', 'склянки', 'ст.л.', 'ч.л.', 'пучок', 'пакет']
