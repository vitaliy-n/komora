import { useState, useRef, useCallback, useEffect } from 'react'

export function useCookingTimer() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [running, setRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const notify = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/pwa-192x192.png' })
    }
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }
  }, [])

  const start = useCallback((minutes: number) => {
    const total = Math.round(minutes * 60)
    setTotalSeconds(total)
    setSecondsLeft(total)
    setRunning(true)
  }, [])

  const pause = useCallback(() => {
    setRunning(false)
  }, [])

  const resume = useCallback(() => {
    if (secondsLeft > 0) setRunning(true)
  }, [secondsLeft])

  const stop = useCallback(() => {
    setRunning(false)
    setSecondsLeft(0)
    setTotalSeconds(0)
    clearTimer()
  }, [clearTimer])

  useEffect(() => {
    if (running && secondsLeft > 0) {
      clearTimer()
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setRunning(false)
            clearTimer()
            notify('⏰ Таймер!', 'Час вийшов — перевірте блюдо')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [running, secondsLeft, clearTimer, notify])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0

  return { display, secondsLeft, totalSeconds, running, progress, start, pause, resume, stop }
}
