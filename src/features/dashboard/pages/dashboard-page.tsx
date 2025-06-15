import { useAllServiceRequestsQuery } from "@/features/service-request/api/service-request-queries.ts"

const DashboardPage = () => {
  const { data, isLoading, isError } = useAllServiceRequestsQuery()

  return "homepage"
}

export default DashboardPage
