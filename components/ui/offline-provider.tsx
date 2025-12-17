"use client"
import { ReactNode } from 'react'
import { OfflineBanner } from './offline-banner'
import { useNetworkStatus } from '@/hooks/use-network-status'

interface OfflineProviderProps {
  children: ReactNode
}

export function OfflineProvider({ children }: OfflineProviderProps) {
  const { isOnline, showOfflineBanner, setShowOfflineBanner } = useNetworkStatus()

  return (
    <>
      <OfflineBanner 
        show={showOfflineBanner} 
        isOnline={isOnline} 
        onClose={() => setShowOfflineBanner(false)} 
      />
      <div className={showOfflineBanner ? "pt-14" : ""}>
        {children}
      </div>
    </>
  )
}
