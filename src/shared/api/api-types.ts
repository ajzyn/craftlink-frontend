export interface ApiErrorDto {
   error: string
   message: string
   timestamp: string
   details: Record<string, string>
}
