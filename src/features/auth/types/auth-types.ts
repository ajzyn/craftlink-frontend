export enum UserType {
   ADMIN = "ADMIN",
   CLIENT = "CLIENT",
   SPECIALIST = "SPECIALIST",
}

export enum Authority {
   ADMIN = "ADMIN",
   CLIENT = "CLIENT",
}

export interface UserDto {
   id: string
   email: string
   authorities: Authority[]
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
   token: string
}

export interface JwtPayload {
   email: string
   sub: string
   iat: number
   authorities: Authority[]
   userType: UserType
}
