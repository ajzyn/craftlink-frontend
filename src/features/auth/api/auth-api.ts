import { apiClient } from "@/shared/api/client"
import type { AuthenticationResponse, LoginRequest, RegisterRequest, UserDto } from "../types/auth"

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthenticationResponse>("/auth/login", data)
    return response.data
  },

  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<{ message: string }>("/auth/register-client", {
      email: data.email,
      password: data.password,
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await apiClient.get<UserDto>("/auth/me")
    return response.data
  },

  logout: async () => {
    await apiClient.post("/auth/logout")
  },
}
