export enum UserType {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  SPECIALIST = "SPECIALIST",
}

export interface UserDto {
  id: number
  username: string
  authorities: string
  specializationSlugs: Set<string>
  userType: UserType
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface AuthenticationResponse {
  user: UserDto
  token: string
}

export interface AuthState {
  user: UserDto | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
