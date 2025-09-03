import { apiClient } from "@/shared/api/client"
import type { AuthenticationResponse, LoginRequest, RegisterRequest } from "../types/auth-types"

export const authApi = {
   login: async (data: LoginRequest) => {
      const response = await apiClient.post<AuthenticationResponse>("/auth/login", data)
      return response.data
   },

   register: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthenticationResponse>("/auth/register-client", {
         email: data.email,
         password: data.password,
      })
      return response.data
   },

   logout: async () => {
      await apiClient.get("/auth/logout")
   },
}
