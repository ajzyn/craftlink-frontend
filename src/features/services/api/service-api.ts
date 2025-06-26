import { apiClient } from "@/shared/api/client.ts"

export const services = {
   getSearchServicesQuery: async (searchPhrase: string) => {
      const response = await apiClient.get<any>(`/services?searchPhrase=${searchPhrase}`)
      return response.data
   },
}
