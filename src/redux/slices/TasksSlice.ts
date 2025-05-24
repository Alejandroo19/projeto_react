import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit'
import api from '../../api/axios'

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

// thunk para GET /tasks
export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetch',
  async () => {
    const resp = await api.get<Task[]>('/tasks')
    return resp.data
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Para criação rápida sem API:
    addTask(state, action: PayloadAction<Task>) {
      state.items.push(action.payload)
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Omit<Task, 'id'>> }>
    ) {
      const { id, changes } = action.payload
      const idx = state.items.findIndex(t => t.id === id)
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...changes }
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const t = state.items.find(t => t.id === action.payload)
      if (t) t.completed = !t.completed
    },
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
  },
})

export const { addTask, updateTask, deleteTask, toggleComplete } =
  tasksSlice.actions
export default tasksSlice.reducer
