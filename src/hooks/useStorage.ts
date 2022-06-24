/**
 * useStorage hook to get localhost | session data
 * @returns {Function} getStorageItem - used to get the storage value
 * @returns {Function} setStorageItem - used to set | update the storage value
 * @returns {Function} removeStorageItem - removes the storage value
 * @returns {Function} clear - clears the storage
 */

type StorageType = 'session' | 'local'

const useStorage = (): {
  getStorageItem: (key: string, type?: StorageType) => any
  setStorageItem: (key: string, value: any, type?: StorageType) => void
  removeStorageItem: (key: string, type?: StorageType) => void
  clear: (type?: StorageType) => void
} => {
  const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' =>
    `${type ?? 'session'}Storage`

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

  const getStorageItem = (key: string, type?: StorageType): any => {
    return isBrowser ? JSON.parse(window[storageType(type)][key]) : null
  }

  const setStorageItem = (
    key: string,
    value: any,
    type?: StorageType
  ): void => {
    if (isBrowser) {
      window[storageType(type)].setStorageItem(key, JSON.stringify(value))
      console.log(`${key} set to ${value} to ${storageType(type)}`)
    }

    console.warn(`environment not supported`)
  }

  const removeStorageItem = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeStorageItem(key)
  }

  const clear = (type?: StorageType): void => window[storageType(type)].clear()

  return {
    getStorageItem,
    setStorageItem,
    removeStorageItem,
    clear
  }
}

export default useStorage
