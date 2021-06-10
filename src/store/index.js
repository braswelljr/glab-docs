import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { matchSorter } from 'match-sorter'

const useStore = create(
  devtools(set => ({
    theme: true,
    setTheme: type => set({ theme: type }),
    pageStruct: undefined,
    setPageStruct: struct => set({ pageStruct: struct }),
    query: '',
    filter: undefined,
    search: (collection, query) =>
      set({
        query,
        filter: query
          ? matchSorter(
              typeof collection === 'object'
                ? Object.entries(collection).map(([key, value]) => [key, value])
                : collection,
              query,
              {
                threshold: matchSorter.rankings.WORD_STARTS_WITH,
                keys: []
              }
            )
          : undefined
      })
  }))
)

export default useStore
