import type { ApiErrorDto } from "../api/api-types"

export const isApiError = (error: unknown): error is ApiErrorDto => {
   return typeof error === "object" && error !== null && "error" in error && "message" in error
}

export const getErrorMessage = (error: unknown): string => {
   if (isApiError(error)) {
      return error.message
   }

   if (error instanceof Error) {
      return error.message
   }

   if (typeof error === "string") {
      return error
   }

   return "Wystąpił nieznany błąd"
}
