import { useCurrentUserQuery } from "@/features/service-request/api/service-request-queries.ts"

const HomePage = () => {
  const { data, isLoading, isError } = useCurrentUserQuery()

  // console.log(data)

  return "homepage"
}

export default HomePage
