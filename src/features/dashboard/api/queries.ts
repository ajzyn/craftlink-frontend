import { useQuery } from "@tanstack/react-query"
import { dashboardKeys } from "@/features/dashboard/api/keys"
import { getSpecialistDashboardData } from "@/features/dashboard/api/api"

export const useAllConversationsQuery = () => {
   return useQuery({
      queryKey: dashboardKeys.all,
      queryFn: getSpecialistDashboardData,
      refetchInterval: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
   })
}
