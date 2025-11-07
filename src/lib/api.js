import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || '/api'
const useBasic = String(import.meta.env.VITE_USE_BASIC_AUTH || 'false') === 'true'
const user = import.meta.env.VITE_USER || ''
const pass = import.meta.env.VITE_PASS || ''

const api = axios.create({ baseURL })

api.interceptors.request.use(cfg => {
  if (useBasic) {
    const token = btoa(`${user}:${pass}`)
    cfg.headers = cfg.headers || {}
    cfg.headers['Authorization'] = `Basic ${token}`
  }
  return cfg
})

export default api
