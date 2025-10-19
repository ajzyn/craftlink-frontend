import type { AxiosError } from "axios"

export interface ApiErrorDto {
   error: string
   message: string
   timestamp?: string
   details?: Record<string, string>
}

export type ApiError = AxiosError<ApiErrorDto>
