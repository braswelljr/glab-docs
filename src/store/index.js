import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { matchSorter } from 'match-sorter'

const useStore = create(
  devtools(set => ({
    theme: false,
    setTheme: type => set({ theme: type }),
    pageStruct: undefined,
    setPageStruct: struct => set({ pageStruct: struct }),
    query: ''
  }))
)

export default useStore
