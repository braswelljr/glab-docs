import create from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools(set => ({
    theme: true,
    setTheme: t => set({ theme: t })
  }))
)

export default useStore
