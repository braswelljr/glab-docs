import zustand, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  pageStruct?: any
  setPageStruct: (struct: any) => void
}

const useStore = zustand(
  devtools(<T extends Store>(set: SetState<T>) => ({
    pageStruct: undefined,
    setPageStruct: (struct: any) =>
      set(state => ({ ...state, pageStruct: struct }))
  }))
)

export default useStore
