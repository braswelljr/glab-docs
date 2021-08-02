import create from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools(set => ({
    theme: 'light',
    themeDark: () => set({ theme: 'dark' }),
    themeLight: () => set({ theme: 'light' }),
    pageStruct: undefined,
    setPageStruct: struct => set({ pageStruct: struct }),
    query: ''
  }))
)

export default useStore
