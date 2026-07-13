export function useHaptic() {
  const trigger = (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }

  const light = () => trigger(10)
  const medium = () => trigger(20)
  const heavy = () => trigger(40)
  const success = () => trigger([10, 30, 10])
  const error = () => trigger([40, 20, 40])

  return { trigger, light, medium, heavy, success, error }
}
