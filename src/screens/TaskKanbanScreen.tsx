// src/screens/TaskKanbanScreen.tsx

import React, { useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '../redux/Hooks'
import { toggleComplete, deleteTask, Task } from '../redux/slices/TasksSlice'
import { useTheme as useAppTheme } from '../context/ThemeContext'

export default function TaskKanbanScreen({ navigation }: any) {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(s => s.tasks.items)

  // styled-components theme
  const styledTheme = useTheme()
  // seu toggle context
  const { toggle, isDark } = useAppTheme()

  // adiciona o botão de toggle de tema no header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <IconBtn onPress={toggle}>
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={24}
              color={styledTheme.colors.primary}
            />
          </IconBtn>
        </HeaderButtons>
      ),
    })
  }, [navigation, toggle, isDark, styledTheme])

  // separa as tasks
  const toDo = tasks.filter(t => !t.completed)
  const done = tasks.filter(t => t.completed)

  return (
    <Container>
      {/* Para Fazer */}
      <Column>
        <ColumnHeader>Para Fazer</ColumnHeader>
        <ScrollArea>
          {toDo.map((task: Task) => (
            <Card key={task.id} completed={false}>
              <CardContent onPress={() => dispatch(toggleComplete(task.id))}>
                <Title completed={false}>{task.title}</Title>
                {task.description ? <Desc>{task.description}</Desc> : null}
              </CardContent>
              <DeleteBtn onPress={() => dispatch(deleteTask(task.id))}>
                <Ionicons name="trash-outline" size={20} color={styledTheme.colors.danger} />
              </DeleteBtn>
            </Card>
          ))}
        </ScrollArea>
      </Column>

      {/* Concluídas */}
      <Column>
        <ColumnHeader>Concluídas</ColumnHeader>
        <ScrollArea>
          {done.map((task: Task) => (
            <Card key={task.id} completed={true}>
              <CardContent onPress={() => dispatch(toggleComplete(task.id))}>
                <Title completed={true}>{task.title}</Title>
                {task.description ? <Desc>{task.description}</Desc> : null}
              </CardContent>
              <DeleteBtn onPress={() => dispatch(deleteTask(task.id))}>
                <Ionicons name="trash-outline" size={20} color={styledTheme.colors.danger} />
              </DeleteBtn>
            </Card>
          ))}
        </ScrollArea>
      </Column>
    </Container>
  )
}

// ===== styled-components =====

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${p => p.theme.colors.background};
`

const HeaderButtons = styled.View`
  flex-direction: row;
  margin-right: 16px;
`

const IconBtn = styled.TouchableOpacity`
  margin-left: 12px;
`

const Column = styled.View`
  flex: 1;
  padding: 8px;
`

const ColumnHeader = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
  text-align: center;
  margin-bottom: 8px;
`

const ScrollArea = styled.ScrollView``

const Card = styled.View<{ completed: boolean }>`
  background-color: ${p => p.theme.colors.card};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  opacity: ${p => (p.completed ? 0.6 : 1)};
`

const CardContent = styled.TouchableOpacity`
  flex: 1;
`

const Title = styled.Text<{ completed: boolean }>`
  color: ${p => p.theme.colors.text};
  font-size: 16px;
  text-decoration-line: ${p => (p.completed ? 'line-through' : 'none')};
`

const Desc = styled.Text`
  color: ${p => p.theme.colors.mutedText};
  font-size: 14px;
  margin-top: 4px;
`

const DeleteBtn = styled.TouchableOpacity`
  padding: 4px;
`
