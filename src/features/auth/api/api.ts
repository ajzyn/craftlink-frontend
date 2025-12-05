import { apiClient } from "@/shared/api/http-client"
import type { AuthenticationDto, LoginRequest, RegisterRequest, UserDto } from "./types"

export const authApi = {
   login: async (data: LoginRequest) => {
      const response = await apiClient.post<AuthenticationDto, LoginRequest>("/auth/login", data)
      return response.data
   },

   register: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthenticationDto, RegisterRequest>(
         "/auth/register",
         data,
      )
      return response.data
   },

   logout: async () => {
      await apiClient.post("/sec/auth/logout")
   },

   getCurrentUser: async () => {
      const res = await apiClient.get<UserDto>("/sec/auth/me")
      return res.data
   },
}
