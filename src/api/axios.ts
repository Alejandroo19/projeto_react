// src/api/axios.ts
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { store } from '../redux/store'
import { Task } from '../redux/slices/TasksSlice'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

if (__DEV__) {
  const mock = new MockAdapter(api, { delayResponse: 300 })
  let tasks: Task[] = []

  // Auth
  mock.onPost('/login').reply(config => {
    const { email, password } = JSON.parse(config.data)
    // aqui você poderia checar credenciais, mas simularemos sucesso
    return [200, { token: 'fake-token-123' }]
  })

  // Tasks
  mock.onGet('/tasks').reply(200, tasks)
  mock.onPost('/tasks').reply(config => {
    const newTask: Task = JSON.parse(config.data)
    tasks.push(newTask)
    return [201, newTask]
  })
  mock.onPatch(new RegExp('/tasks/.+')).reply(config => {
    const id = config.url!.split('/').pop()!
    const updates = JSON.parse(config.data)
    const idx = tasks.findIndex(t => t.id === id)
    if (idx === -1) return [404]
    tasks[idx] = { ...tasks[idx], ...updates }
    return [200, tasks[idx]]
  })
  mock.onDelete(new RegExp('/tasks/.+')).reply(config => {
    const id = config.url!.split('/').pop()!
    tasks = tasks.filter(t => t.id !== id)
    return [204]
  })
}

export default api
