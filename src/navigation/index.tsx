import React from 'react'
import { NavigationContainer, DarkTheme as RNDark, DefaultTheme as RNLight } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAppSelector } from '../redux/Hooks'
import { useTheme as useAppTheme } from '../context/ThemeContext'
import { lightTheme, darkTheme } from '../styles/theme'

import AuthStack from './AuthStack'
import AppTabs from './AppTabs'    // agora só importa as tabs
import TaskFormScreen from '../screens/TaskFormScreen'

const Stack = createNativeStackNavigator()

export default function Navigator() {
  const token = useAppSelector(s => s.auth.token)
  const isAuth = !!token
  const { isDark } = useAppTheme()
  const styledTheme = isDark ? darkTheme : lightTheme

  const navTheme = isDark
    ? {
        ...RNDark,
        colors: {
          ...RNDark.colors,
          background: styledTheme.colors.background,
          card: styledTheme.colors.card,
          text: styledTheme.colors.text,
          primary: styledTheme.colors.primary,
        }
      }
    : {
        ...RNLight,
        colors: {
          ...RNLight.colors,
          background: styledTheme.colors.background,
          card: styledTheme.colors.card,
          text: styledTheme.colors.text,
          primary: styledTheme.colors.primary,
        }
      }

  return (
    <NavigationContainer theme={navTheme}>
      {isAuth ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: navTheme.colors.card },
            headerTintColor: navTheme.colors.text,
          }}
        >
          {/* A tela principal agora é seu AppTabs */}
          <Stack.Screen
            name="Home"
            component={AppTabs}
            options={{ headerShown: false }}
          />

          {/* Formulário de tarefa */}
          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
            options={{ title: 'Tarefa' }}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}
