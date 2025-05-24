// src/screens/TaskListScreen.tsx

import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '../redux/Hooks'
import {
  fetchTasks,
  deleteTask,
  toggleComplete,
  Task,
} from '../redux/slices/TasksSlice'
import { useTheme as useAppTheme } from '../context/ThemeContext'

export default function TaskListScreen({ navigation }: any) {
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector(s => s.tasks)
  const styledTheme = useTheme()
  const { toggle, isDark } = useAppTheme()

  // Carrega as tarefas uma única vez
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  // Configura os botões de header: adicionar & toggle tema
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          {/* Botão de adicionar tarefa */}
          <IconButton onPress={() => navigation.navigate('TaskForm', { mode: 'create' })}>
            <Ionicons name="add" size={24} color={styledTheme.colors.primary} />
          </IconButton>

          {/* Toggle light/dark */}
          <IconButton onPress={toggle}>
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={24}
              color={styledTheme.colors.primary}
            />
          </IconButton>
        </HeaderButtons>
      ),
    })
  }, [navigation, toggle, isDark, styledTheme])

  if (status === 'loading') {
    return (
      <Centered>
        <LoadingText>Carregando tarefas...</LoadingText>
      </Centered>
    )
  }

  return (
    <ListContainer>
      <FlatList
        data={items}
        keyExtractor={t => t.id}
        ListEmptyComponent={<EmptyText>Nenhuma tarefa.</EmptyText>}
        renderItem={({ item }) => (
          <Card completed={item.completed}>
            <CardContent onPress={() => dispatch(toggleComplete(item.id))}>
              <Title completed={item.completed}>{item.title}</Title>
              {item.description ? (
                <Description>{item.description}</Description>
              ) : null}
            </CardContent>
            <DeleteButton onPress={() => dispatch(deleteTask(item.id))}>
              <Ionicons name="trash-outline" size={20} color={styledTheme.colors.danger} />
            </DeleteButton>
          </Card>
        )}
      />
    </ListContainer>
  )
}

// ===== styled-components =====

const ListContainer = styled.View`
  flex: 1;
  background-color: ${p => p.theme.colors.background};
`

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.background};
`

const LoadingText = styled.Text`
  color: ${p => p.theme.colors.text};
  font-size: 16px;
`

const EmptyText = styled.Text`
  color: ${p => p.theme.colors.mutedText};
  font-size: 16px;
  text-align: center;
  margin-top: 40px;
`

const HeaderButtons = styled.View`
  flex-direction: row;
  margin-right: 16px;
`

const IconButton = styled.TouchableOpacity`
  margin-left: 12px;
`

const Card = styled.View<{ completed: boolean }>`
  background-color: ${p => p.theme.colors.card};
  margin: 8px 16px;
  padding: 12px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${p => p.theme.colors.border};
  opacity: ${p => (p.completed ? 0.6 : 1)};
`

const CardContent = styled.TouchableOpacity`
  flex: 1;
`

const Title = styled.Text<{ completed: boolean }>`
  color: ${p => p.theme.colors.text};
  font-size: 18px;
  text-decoration-line: ${p => (p.completed ? 'line-through' : 'none')};
`

const Description = styled.Text`
  color: ${p => p.theme.colors.mutedText};
  margin-top: 4px;
  font-size: 14px;
`

const DeleteButton = styled.TouchableOpacity`
  padding: 4px;
`
