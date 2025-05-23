// src/redux/slices/tasksSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
}

interface TasksState {
  items: Task[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TasksState = {
  items: [],
  status: 'idle',
}

/**
 * Aqui você pode adicionar os thunks reais, 
 * mas por enquanto iremos só mockar um fetch vazio:
 */
export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetch',
  async () => {
    // simula um delay e retorna lista vazia
    await new Promise(res => setTimeout(res, 300))
    return []
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // ex.: addTask, removeTask, toggleComplete...
    addTask(state, action: PayloadAction<Task>) {
      state.items.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, state => {
        state.status = 'failed'
      })
  }
})

export const { addTask } = tasksSlice.actions
export default tasksSlice.reducer
