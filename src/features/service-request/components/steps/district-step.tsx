import type { ServiceRequestData } from "@/features/service-request/types/step.ts"
import { useCityDistrictsQuery } from "@/shared/api/shared-queries.ts"

interface DistrictStepProps {
   handleDistrictChange: (data: Partial<ServiceRequestData>) => void
   cityName: string
}

export const DistrictStep = ({ handleDistrictChange, cityName }: DistrictStepProps) => {
   const { data } = useCityDistrictsQuery(cityName)

   return <div>{data?.map(d => d)}</div>
}
