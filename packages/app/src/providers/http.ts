import axios, { type AxiosInstance } from "axios"

export type Http = AxiosInstance

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  http.defaults.headers.common["Authorization"] = `bearer ${token}`
}

export const removeAuthorizationHeader = () => {
  delete http.defaults.headers.common["Authorization"]
}

export const getAuthorizationHeader = () => {
  return http.defaults.headers.common["Authorization"]
}

export const removeCookieHeader = () => {
  delete http.defaults.headers.common["Cookie"]
}

export const isAuthorized = () => {
  return !!getAuthorizationHeader()
}
