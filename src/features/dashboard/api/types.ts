import type { JobRequestSummaryDto } from "@/features/job-request/api/types"

export interface SpecialistDashboardStats {
   totalApplications: number
   activeConversations: number
}

export interface SpecialistDashboardData {
   statistics: SpecialistDashboardStats
   recentJobRequests: JobRequestSummaryDto[] // TODO: nie wyniesc tego typu do enrity?
}
