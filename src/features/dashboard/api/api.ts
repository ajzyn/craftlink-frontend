import { apiClient } from "@/shared/api/http-client"
import type { SpecialistDashboardData } from "./types"

export const getSpecialistDashboardData = async () => {
   const response = await apiClient.get<SpecialistDashboardData>("/sec/specialist/me/dashboard")
   return response.data
}
