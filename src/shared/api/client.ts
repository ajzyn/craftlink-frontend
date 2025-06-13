import axios, { type AxiosInstance, type AxiosResponse } from "axios"
import { useAuthStore } from "@/features/auth/stores/auth-store.ts"
import type { AuthenticationResponse } from "@/features/auth/types/auth.ts"

const API_BASE_URL = "http://localhost:8080/api"

class ApiClient {
  private client: AxiosInstance
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (error?: any) => void
  }> = []

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
    })

    this.setupInterceptors()
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
      error => Promise.reject(error),
    )

    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        // Sprawdź czy to błąd autoryzacji i czy nie próbowaliśmy już retry
        if (
          (error.response?.data.error === "JWT_EXPIRED" ||
            error.response?.data.error === "UNAUTHORIZED" ||
            error.response?.status === 401) &&
          !originalRequest._retry
        ) {
          // Jeśli request jest do refresh endpoint i się nie udał, wyloguj użytkownika
          if (originalRequest.url?.includes("/auth/refresh-token")) {
            console.log("Refresh token wygasł, wylogowuję użytkownika")
            useAuthStore.getState().logout()
            window.location.href = "/login"
            return Promise.reject(error)
          }

          // Oznacz request jako retry żeby nie próbować ponownie
          originalRequest._retry = true

          // Jeśli już trwa odświeżanie tokena, dodaj request do kolejki
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject })
            })
              .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return this.client(originalRequest)
              })
              .catch(err => {
                return Promise.reject(err)
              })
          }

          this.isRefreshing = true

          try {
            console.log("Próbuję odświeżyć token...")
            const refreshResponse = await this.refreshToken()
            const { token } = refreshResponse.data

            // Zapisz nowy token
            useAuthStore.getState().setAccessToken(token)

            // Przetwórz kolejkę oczekujących requestów
            this.processQueue(null, token)

            // Ustaw nowy token dla oryginalnego requesta
            originalRequest.headers.Authorization = `Bearer ${token}`

            return this.client(originalRequest)
          } catch (refreshError) {
            console.log("Nie udało się odświeżyć tokena:", refreshError)

            // Przetwórz kolejkę z błędem
            this.processQueue(refreshError, null)

            // Wyloguj użytkownika
            // useAuthStore.getState().logout()
            // window.location.href = "/login"

            return Promise.reject(refreshError)
          } finally {
            this.isRefreshing = false
          }
        }

        return Promise.reject(error)
      },
    )
  }

  private async refreshToken() {
    // Tworzenie nowego klienta axios BEZ interceptorów dla refresh requesta
    // żeby uniknąć nieskończonej pętli
    const refreshClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      withCredentials: true,
    })

    return refreshClient.get<AuthenticationResponse>("/auth/refresh-toke2n")
  }
}

export const apiClient = new ApiClient()
