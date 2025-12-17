// IndexedDB-based offline cache for critical boot state
export interface BootState {
  userName?: string
  theme?: string
  lastSaved: number
  version: string
}

export class OfflineBootCache {
  private static DB_NAME = 'pitaka-offline-db'
  private static DB_VERSION = 1
  private static STORE_NAME = 'boot-state'

  private static async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME)
        }
      }
    })
  }

  static async saveBootState(state: BootState): Promise<void> {
    if (!('indexedDB' in window)) {
      // Fallback to localStorage
      localStorage.setItem('pitaka-boot-state', JSON.stringify(state))
      return
    }

    try {
      const db = await this.openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite')
        const store = transaction.objectStore(this.STORE_NAME)
        const request = store.put(state, 'critical')
        
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
        
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      })
    } catch (error) {
      console.warn('IndexedDB failed, falling back to localStorage:', error)
      localStorage.setItem('pitaka-boot-state', JSON.stringify(state))
    }
  }

  static async getBootState(): Promise<BootState | null> {
    if (!('indexedDB' in window)) {
      // Fallback to localStorage
      const stored = localStorage.getItem('pitaka-boot-state')
      return stored ? JSON.parse(stored) : null
    }

    try {
      const db = await this.openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readonly')
        const store = transaction.objectStore(this.STORE_NAME)
        const request = store.get('critical')
        
        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => reject(request.error)
        transaction.onerror = () => reject(transaction.error)
      })
    } catch (error) {
      console.warn('IndexedDB failed, falling back to localStorage:', error)
      const stored = localStorage.getItem('pitaka-boot-state')
      return stored ? JSON.parse(stored) : null
    }
  }

  static async clearBootState(): Promise<void> {
    if (!('indexedDB' in window)) {
      localStorage.removeItem('pitaka-boot-state')
      return
    }

    try {
      const db = await this.openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite')
        const store = transaction.objectStore(this.STORE_NAME)
        const request = store.delete('critical')
        
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
        
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      })
    } catch (error) {
      console.warn('IndexedDB clear failed, using localStorage fallback:', error)
      localStorage.removeItem('pitaka-boot-state')
    }
  }
}
