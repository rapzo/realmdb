import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios"

export type Http = AxiosInstance

export interface HttpProviderOptions {
  baseURL: string
  apiKey: string
  apiReadAccessToken: string
}

export const createHttpProvider = ({
  baseURL,
  apiKey,
  apiReadAccessToken,
}: HttpProviderOptions): Http => {
  const http: Http = axios.create({
    baseURL,

    headers: {
      Authorization: `bearer ${apiReadAccessToken}`,
    },
  })

  http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const params = (config.params || {}) as Record<string, unknown>

    params["region"] = "PT"
    params["api_key"] = apiKey

    return {
      ...config,
      params,
    }
  })

  return http
}
