// src/screens/TaskListScreen.tsx

import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../redux/Hooks'
import { fetchTasks, Task } from '../redux/slices/TasksSlice'
export default function TaskListScreen({ navigation }: any) {
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector(state => state.tasks)

  // 1) dispara o fetch ao montar a tela
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  // 2) adiciona botão “+” no header para criar nova task
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TaskForm', { mode: 'create' })}
        >
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      )
    })
  }, [navigation])

  // 3) loading
  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // 4) lista vazia
  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Não há tarefas cadastradas.</Text>
      </View>
    )
  }

  // 5) lista com FlatList
  return (
    <FlatList
      data={items}
      keyExtractor={(item: Task) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('TaskForm', { mode: 'edit', taskId: item.id })
          }
        >
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 12,
    // sombra leve (apenas no iOS)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // e Android elevation
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    color: '#555',
  },
  addButton: {
    marginRight: 16,
    padding: 4,
  },
  addButtonText: {
    fontSize: 28,
    color: '#0063DE',
  },
})
