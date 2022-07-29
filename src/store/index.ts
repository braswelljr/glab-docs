import zustand from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  pageStruct?: any
  setPageStruct: (struct: any) => void
}

const useStore = zustand<Store>()(
  devtools(set => ({
    pageStruct: undefined,
    setPageStruct: (struct: any) =>
      set(state => ({ ...state, pageStruct: struct }))
  }))
)

export default useStore
