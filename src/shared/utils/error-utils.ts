import type { AxiosError } from "axios"
import type { ApiErrorDto } from "@/shared/api/api-types"

export const isApiErrorDto = (error: unknown): error is ApiErrorDto => {
   return typeof error === "object" && error !== null && "error" in error && "message" in error
}

export const isAxiosError = (error: unknown): error is AxiosError<ApiErrorDto> => {
   return typeof error === "object" && error !== null && "isAxiosError" in error
}

export const getErrorMessage = (error: unknown): string => {
   if (isAxiosError(error)) {
      const data = error.response?.data
      if (data && isApiErrorDto(data)) {
         return data.message ?? "Wystąpił błąd serwera"
      }
      return error.message || "Wystąpił problem z połączeniem"
   }

   if (isApiErrorDto(error)) {
      return error.message ?? "Błąd serwera"
   }

   if (error instanceof Error) {
      return error.message
   }

   if (typeof error === "string") {
      return error
   }

   return "Wystąpił nieznany błąd"
}
