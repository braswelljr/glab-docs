import { useState, createContext } from 'react'

export const DocsContext = createContext()

const DocsProvider = ({ children }) => {
  const [theme, setTheme] = useState(false)

  return (
    <DocsContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme
      }}
    >
      {children}
    </DocsContext.Provider>
  )
}

export default DocsProvider
