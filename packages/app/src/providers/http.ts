import axios from "axios"

export const http = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data)
    }

    return Promise.reject(error.message)
  },
)

export const setAuthorizationHeader = (token: string) => {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const removeAuthorizationHeader = () => {
  delete http.defaults.headers.common["Authorization"]
}

export const getAuthorizationHeader = () => {
  return http.defaults.headers.common["Authorization"]
}

export const isAuthorized = () => {
  return !!getAuthorizationHeader()
}
