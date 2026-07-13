import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function OfflineIndicator() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-white text-center text-sm py-1.5 flex items-center justify-center gap-2 animate-slide-up">
      <WifiOff size={14} />
      Ви офлайн — дані зберігаються локально
    </div>
  )
}
