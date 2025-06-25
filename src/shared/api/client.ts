import axios, { type AxiosInstance, type AxiosResponse } from "axios"
import { useAuthStore } from "@/features/auth/stores/auth-store.ts"
import type { AuthenticationResponse } from "@/features/auth/types/auth.ts"

const API_BASE_URL = "http://localhost:8080/api"

class ApiClient {
  private static instance: ApiClient
  private client: AxiosInstance
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (error?: any) => void
  }> = []

  private constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
    })

    this.setupInterceptors()
  }

  public static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }

    return ApiClient.instance
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.get(url)
  }

  async post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.client.post(url, data)
  }

  async put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.client.put(url, data)
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.delete(url)
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })

    this.failedQueue = []
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      config => {
        const token = useAuthStore.getState().accessToken

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      error => {
        return Promise.reject(error)
      },
    )

    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        const alreadyRetried = originalRequest.headers?.["x-retry-attempted"] === "true"

        if (alreadyRetried || !error.response || error.response.status !== 401) {
          return Promise.reject(error)
        }

        originalRequest.headers["x-retry-attempted"] = "true"

        if (originalRequest.url?.includes("/auth/refresh-token")) {
          this.isRefreshing = false
          useAuthStore.getState().logout()
          window.location.href = "/login"
          return Promise.reject(error)
        }

        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return this.client.request(originalRequest)
            })
            .catch(err => {
              return Promise.reject(err)
            })
        }

        this.isRefreshing = true

        try {
          const refreshResponse = await this.refreshToken()
          const { token, user } = refreshResponse.data

          useAuthStore.getState().setAccessToken(token)
          useAuthStore.getState().setUser(user)

          this.processQueue(null, token)

          originalRequest.headers.Authorization = `Bearer ${token}`
          return this.client.request(originalRequest)
        } catch (refreshError) {
          this.processQueue(refreshError, null)
          useAuthStore.getState().logout()
          window.location.href = "/login"
          return Promise.reject(refreshError)
        } finally {
          this.isRefreshing = false
        }
      },
    )
  }

  private async refreshToken() {
    const refreshClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
    })

    return refreshClient.get<AuthenticationResponse>("/auth/refresh-token")
  }
}

export const apiClient = ApiClient.getInstance()
