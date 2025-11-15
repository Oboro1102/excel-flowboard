import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

export const instance = setupCache(
  axios.create({
    withCredentials: true,
    timeout: 2 * 60 * 1000,
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  {
    ttl: 1000 * 60 * 60 * 24,
  },
)

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!window.navigator.onLine) alert('查無網路，請重新連線後重整網頁')
    return Promise.reject(error)
  },
)
