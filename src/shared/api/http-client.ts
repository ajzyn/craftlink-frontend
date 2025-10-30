import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { AuthenticationResponse } from "@/features/auth/types/auth-types"

//TODO: move to env vars
export const BACKEND_BASE_URL = "http://localhost:8080"
const API_BASE_URL = `${BACKEND_BASE_URL}/api`

class ApiClient {
   private static instance: ApiClient
   private client: AxiosInstance
   private isRefreshing = false
   private failedQueue: Array<{
      resolve: (token?: string | null) => void
      reject: (error?: unknown) => void
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

   async get<T>(url: string, params: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
      return this.client.get(url, params)
   }

   async post<TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      params: AxiosRequestConfig = {},
   ): Promise<AxiosResponse<TResponse, TRequest>> {
      return this.client.post<TResponse, AxiosResponse<TResponse, TRequest>, TRequest>(
         url,
         data,
         params,
      )
   }

   async put<TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      params: AxiosRequestConfig = {},
   ): Promise<AxiosResponse<TResponse, TRequest>> {
      return this.client.put<TResponse, AxiosResponse<TResponse, TRequest>, TRequest>(
         url,
         data,
         params,
      )
   }

   async delete<T>(url: string, params: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
      return this.client.delete(url, params)
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
               const { data } = await this.refreshToken()
               useAuthStore.getState().setAccessToken(data.token)

               this.processQueue(null, data.token)

               originalRequest.headers.Authorization = `Bearer ${data.token}`
               return this.client.request(originalRequest)
            } catch (refreshError) {
               this.processQueue(refreshError, null)
               useAuthStore.getState().logout()
               if (window.location.pathname !== "/") {
                  window.location.href = "/"
               }
               return Promise.reject(refreshError)
            } finally {
               this.isRefreshing = false
               useAuthStore.getState().setIsLoading(false)
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
