// src/navigation/index.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack'
import AppTabs   from './AppTabs'
import TaskFormScreen from '../screens/TaskFormScreen'
import { useAppSelector } from '../redux/Hooks'

const RootStack = createNativeStackNavigator()

export default function Navigator() {
  const isAuth = !!useAppSelector(state => state.auth.token)

  return (
    <NavigationContainer>
      {isAuth ? (
        <RootStack.Navigator>
          {/* A tela principal é seu TabNavigator */}
          <RootStack.Screen
            name="Home"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          {/* Aqui registramos o formulário de tarefas */}
          <RootStack.Screen
            name="TaskForm"
            component={TaskFormScreen}
            options={{ title: 'Nova Tarefa' }}
          />
        </RootStack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}
