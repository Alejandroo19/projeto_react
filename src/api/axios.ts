import axios from 'axios'
import { store } from '../redux/store'

const api = axios.create({ baseURL: 'https://api.taskmaster.local' })
api.interceptors.request.use(cfg => {
  const token = store.getState().auth.token
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
export default api