import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + 'api/v1/',
  timeout: 30000,
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
})

export default api;