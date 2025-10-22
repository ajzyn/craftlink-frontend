import { apiClient } from "@/shared/api/http-client"
import type { AuthenticationResponse, LoginRequest, RegisterRequest } from "../types/auth-types"

export const authApi = {
   login: async (data: LoginRequest) => {
      const response = await apiClient.post<AuthenticationResponse, LoginRequest>(
         "/auth/login",
         data,
      )
      return response.data
   },

   register: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthenticationResponse, RegisterRequest>(
         "/auth/register",
         data,
      )
      return response.data
   },

   logout: async () => {
      await apiClient.post("/sec/auth/logout")
   },
}
