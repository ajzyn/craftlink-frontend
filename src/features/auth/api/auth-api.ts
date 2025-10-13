import { apiClient } from "@/shared/api/http-client"
import type { AuthenticationResponse, LoginRequest, RegisterRequest } from "../types/auth-types"

export const authApi = {
   login: async (data: LoginRequest) => {
      const response = await apiClient.post<AuthenticationResponse>("/auth/login", data)
      return response.data
   },

   register: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthenticationResponse>("/auth/register", {
         email: data.email,
         password: data.password,
         username: data.username,
         userType: data.userType,
      })
      return response.data
   },

   logout: async () => {
      await apiClient.get("/auth/logout")
   },
}
