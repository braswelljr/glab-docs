import { useState, createContext } from 'react'

export const DocsContext = createContext()

export const DocsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  return (
    <DocsContext.Provider
      value={{
        theme,
        setDark: () => setTheme('dark'),
        setLight: () => setTheme('light')
      }}
    >
      {children}
    </DocsContext.Provider>
  )
}
