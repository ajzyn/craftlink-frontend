import { Search } from "lucide-react"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete"
import { serviceApi } from "@/entities/service/api"
import type { ServiceBasicDto } from "@/entities/service/types"
import { useRouter } from "@tanstack/react-router"

export const ServiceSelect = () => {
   const router = useRouter()

   const handleServiceChange = (service: ServiceBasicDto | null) => {
      if (!service) return
      router.navigate({ to: `/zlecenia/stworz/${service.slug}` })
   }

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <FormAutocomplete
            placeholder="Wyszukaj usługę którą potrzebujesz..."
            onChange={handleServiceChange}
            queryFn={serviceApi.getSearchServicesRequest}
         />
      </div>
   )
}
