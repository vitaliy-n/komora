import type { CanningEntry, InventoryItem } from '../types'
import { daysUntil, getExpiryStatus } from './date'

export interface ExpiryAlert {
  id: string
  name: string
  type: 'canning' | 'inventory'
  expiryDate: string
  status: 'warning' | 'danger' | 'expired'
  daysLeft: number
}

export function checkExpiringItems(
  canningEntries: CanningEntry[],
  inventoryItems: InventoryItem[],
): ExpiryAlert[] {
  const alerts: ExpiryAlert[] = []

  for (const entry of canningEntries) {
    if (!entry.expiryDate) continue
    if (entry.consumedJars >= entry.totalJars) continue
    const status = getExpiryStatus(entry.expiryDate)
    if (status === 'ok') continue
    alerts.push({
      id: entry.id,
      name: entry.name,
      type: 'canning',
      expiryDate: entry.expiryDate,
      status,
      daysLeft: daysUntil(entry.expiryDate),
    })
  }

  for (const item of inventoryItems) {
    if (!item.expiryDate) continue
    const status = getExpiryStatus(item.expiryDate)
    if (status === 'ok') continue
    alerts.push({
      id: item.id,
      name: item.name,
      type: 'inventory',
      expiryDate: item.expiryDate,
      status,
      daysLeft: daysUntil(item.expiryDate),
    })
  }

  alerts.sort((a, b) => a.daysLeft - b.daysLeft)
  return alerts
}
