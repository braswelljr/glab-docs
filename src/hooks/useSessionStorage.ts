import { useState, useEffect } from 'react'

/**
 * useSessionStorage hook to get session data
 * @param {string} sessionKey - the key name to get and set
 * @param {any} options.initialValue (default - null) - initial value to set
 * @param {boolean} options.keepOnWindowClosed (default - false) - retains and retrieve state after window is closed
 * @returns {any} sessionValue - value of the provided key stored in session storage
 * @returns {Function} setSessionValue - used to update the session value
 */
export default function useSessionStorage(
  sessionKey: string,
  options: { initialValue?: any; keepOnWindowClosed?: boolean } = {
    initialValue: null,
    keepOnWindowClosed: false
  }
): [sessionValue: any, setSessionValue: (value: any) => void] {
  const [sessionValue, setSessionValue] = useState<any>(options.initialValue)

  useEffect(() => {
    // get type of storage
    const storage = options.keepOnWindowClosed ? localStorage : sessionStorage
    // get value from storage
    const value = storage.getItem(sessionKey)
    // set initial value if value not found
    setSessionValue(value ? JSON.parse(value) : options.initialValue)
  }, [options.keepOnWindowClosed, sessionKey, options.initialValue])

  useEffect(() => {
    // get type of storage
    const storage = options.keepOnWindowClosed ? localStorage : sessionStorage

    // set value in storage
    if (sessionValue !== options.initialValue)
      storage.setItem(sessionKey, JSON.stringify(sessionValue))
  }, [
    sessionValue,
    sessionKey,
    options.keepOnWindowClosed,
    options.initialValue
  ])

  useEffect(() => {
    // sync state with storage events
    const syncState = (event: StorageEvent) => {
      // get type of storage
      const storage = options.keepOnWindowClosed ? localStorage : sessionStorage
      // get value from storage
      let storageValue = storage.getItem(sessionKey)
      // if event is for the provided key
      if (event.key === sessionKey) {
        // set value
        setSessionValue(
          storageValue ? JSON.parse(storageValue) : options.initialValue
        )
      }
    }
    window.addEventListener('storage', syncState)
    // cleanup function to remove storage event listener
    return () => window.removeEventListener('storage', syncState)
  }, [options.initialValue, options.keepOnWindowClosed, sessionKey])

  return [sessionValue, setSessionValue]
}
