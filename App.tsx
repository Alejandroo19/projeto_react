import React from 'react'
import 'react-native-get-random-values'
import { Provider } from 'react-redux'
import { store }     from './src/redux/store'
import { ThemeProvider } from './src/context/ThemeContext'
import Navigator     from './src/navigation'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </Provider>
  )
}
