import React, { createContext, useState, useContext } from 'react'
import { ThemeProvider as SCProvider } from 'styled-components/native'
import { lightTheme, darkTheme } from '../styles/theme'

type ThemeContextType = {
  toggle: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({ toggle: () => {}, isDark: false })

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  const toggle = () => setIsDark(d => !d)

  return (
    <ThemeContext.Provider value={{ toggle, isDark }}>
      <SCProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </SCProvider>
    </ThemeContext.Provider>
  )
}
