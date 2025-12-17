import { Wifi, WifiOff, X } from 'lucide-react'
import { Button } from './button'

interface OfflineBannerProps {
  show: boolean
  isOnline: boolean
  onClose: () => void
}

export function OfflineBanner({ show, isOnline, onClose }: OfflineBannerProps) {
  if (!show) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 p-3 text-center ${
      isOnline ? 'bg-green-500' : 'bg-orange-500'
    } text-white transition-all duration-300`}>
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">You're back online!</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">
              You're offline. Some features may be limited.
            </span>
          </>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="ml-auto text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
