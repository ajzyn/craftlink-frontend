import { Search } from "lucide-react"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete.tsx"
import { services } from "@/features/services/api/service-api.ts"
import { useState } from "react"
import type { ServiceDto } from "@/features/services/types/service-types.ts"

export const SelectService = () => {
   const [selectedServices, setSelectedServices] = useState<ServiceDto | null>(null)

   const handleServiceChange = (service: ServiceDto | null) => {
      console.log(service)
      setSelectedServices(service)
   }

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <FormAutocomplete
            placeholder="Wyszukaj usługę którą potrzebujesz..."
            value={selectedServices}
            onChange={handleServiceChange}
            queryFn={services.getSearchServicesQuery}
         />
      </div>
   )
}
