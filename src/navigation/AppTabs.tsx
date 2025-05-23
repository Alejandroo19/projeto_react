import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TaskListScreen   from '../screens/TaskListScreen'
import TaskKanbanScreen from '../screens/TaskKanbanScreen'

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Lista" component={TaskListScreen}/>
      <Tab.Screen name="Kanban" component={TaskKanbanScreen}/>
    </Tab.Navigator>
  )
}
