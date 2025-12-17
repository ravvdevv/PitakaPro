"use client"
import { useState, useEffect } from 'react'

export function useSWReady() {
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
      setSupported(true)
      
      // Check if service worker is already ready
      if (navigator.serviceWorker.controller) {
        setReady(true)
      } else {
        // Wait for service worker to be ready
        navigator.serviceWorker.ready.then(() => {
          setReady(true)
        }).catch(() => {
          setReady(false)
        })
      }
    } else {
      setSupported(false)
      setReady(false)
    }
  }, [])

  return { ready, supported }
}
