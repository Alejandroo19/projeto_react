import 'styled-components'
import 'styled-components/native'
import { Theme } from './src/styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
