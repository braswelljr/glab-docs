import { useState, useEffect } from 'react'

/**
 * useLocalStorage hook to get localStorage data
 * @param {string} localStorageKey - the key name to get and set
 * @param {any} initialValue - retains and retrieve state after window is closed
 * @returns {any} localStorageValuee - value of the provided key stored in localStorage
 * @returns {Function} setLocalStorageValue - used to update the localStorage value
 */
export default function useLocalStorage(
  localStorageKey: string,
  initialValue: any = null
): [localStorageValue: any, setlocalStorageValue: (value: any) => void] {
  const [localStorageValue, setLocalStorageValue] = useState<any>(initialValue)

  useEffect(() => {
    // get value from storage
    const value = localStorage.getItem(localStorageKey)
    // set initial value if value not found
    setLocalStorageValue(value ? JSON.parse(value) : initialValue)
  }, [localStorageKey, initialValue])

  useEffect(() => {
    // set value in storage if value is not initial value
    if (localStorageValue !== initialValue)
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageValue))
  }, [localStorageValue, localStorageKey, initialValue])

  useEffect(() => {
    const syncState = (event: StorageEvent) => {
      let storageValue = localStorage.getItem(localStorageKey)
      if (event.key === localStorageKey) {
        setLocalStorageValue(
          storageValue ? JSON.parse(storageValue) : initialValue
        )
      }
    }
    window.addEventListener('storage', syncState)
    // cleanup function to remove storage event listener
    return () => window.removeEventListener('storage', syncState)
  }, [initialValue, localStorageKey])

  return [localStorageValue, setLocalStorageValue]
}
