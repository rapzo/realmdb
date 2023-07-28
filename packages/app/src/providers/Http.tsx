import axios, { AxiosResponse, type AxiosInstance } from "axios"
import { type ReactNode, useEffect, useState } from "react"
import { redirect } from "react-router-dom"

export type Http = AxiosInstance

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

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

export const HttpProvider = ({ children }: { children: ReactNode }) => {
  const [isSet, setup] = useState(false)

  useEffect(() => {
    const interceptor = http.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            removeAuthorizationHeader()
            redirect("/signin")
          }
          return Promise.reject(error.response.data)
        }

        return Promise.reject(error.message)
      },
    )

    setup(true)

    return () => {
      http.interceptors.response.eject(interceptor)
    }
  }, [])

  return isSet ? children : null
}
