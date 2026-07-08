import { useCallback } from 'react'
import type { CanningEntry, InventoryItem } from '../types'
import { checkExpiringItems } from '../utils/expiry-checker'

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true
    const result = await Notification.requestPermission()
    return result === 'granted'
  }, [])

  const sendNotification = useCallback((title: string, body: string) => {
    if (!('Notification' in window)) return
    if (Notification.permission !== 'granted') return
    new Notification(title, {
      body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
    })
  }, [])

  const checkExpiries = useCallback((cannings: CanningEntry[], inventory: InventoryItem[]) => {
    const alerts = checkExpiringItems(cannings, inventory)
    const expired = alerts.filter((a) => a.status === 'expired')
    const danger = alerts.filter((a) => a.status === 'danger')

    if (expired.length > 0) {
      sendNotification(
        'Комора — Термін вийшов!',
        `${expired.length} позицій з простроченим терміном придатності`,
      )
    } else if (danger.length > 0) {
      sendNotification(
        'Комора — Увага!',
        `${danger.length} позицій закінчується термін протягом тижня`,
      )
    }

    return alerts
  }, [sendNotification])

  return { requestPermission, sendNotification, checkExpiries }
}
