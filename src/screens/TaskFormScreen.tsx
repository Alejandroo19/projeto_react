// src/screens/TaskFormScreen.tsx

import React, { useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../redux/Hooks'
import {
  addTask,
  updateTask,
  Task,
} from '../redux/slices/TasksSlice'

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Obrigatório'),
  description: Yup.string(),
})

export default function TaskFormScreen({ navigation, route }: any) {
  const dispatch = useAppDispatch()
  const { mode, taskId } = route.params as {
    mode: 'create' | 'edit'
    taskId?: string
  }


  const task = useAppSelector(s =>
    s.tasks.items.find(t => t.id === taskId)
  )


  const initialValues =
    mode === 'edit' && task
      ? { title: task.title, description: task.description || '' }
      : { title: '', description: '' }


  const handleSubmit = (values: { title: string; description: string }) => {
    if (mode === 'create') {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: values.title,
        description: values.description,
        completed: false,
      }
      dispatch(addTask(newTask))
      Alert.alert('Sucesso', 'Tarefa criada!')
    } else {
      dispatch(
        updateTask({
          id: taskId!,
          changes: {
            title: values.title,
            description: values.description,
          },
        })
      )
      Alert.alert('Sucesso', 'Tarefa atualizada!')
    }
    navigation.goBack()
  }


  useEffect(() => {
    navigation.setOptions({
      title: mode === 'create' ? 'Nova Tarefa' : 'Editar Tarefa',
    })
  }, [mode, navigation])

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Título"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {errors.title && touched.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Descrição (opcional)"
              multiline
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            {errors.description && touched.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>
                {mode === 'create' ? 'Criar Tarefa' : 'Salvar Alterações'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  error: { color: '#cc0000', marginBottom: 8 },
  button: {
    backgroundColor: '#0063DE',
    padding: 12,
    borderRadius: 4,
    marginTop: 12,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
})
