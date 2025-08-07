import axios from "axios"

const url = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: url,
  headers: { Accept: "application/json" },
  withCredentials: true // важно
})

// 🛡️ Добавляем access token к каждому запросу
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const res = await api.post('/refresh', {},{})

        const newToken = res.data.token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user))

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (e) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
