import { Search } from "lucide-react"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete.tsx"
import { services } from "@/features/services/api/service-api.ts"
import type { ServiceDto } from "@/features/services/types/service-types.ts"
import { useRouter } from "@tanstack/react-router"

export const SelectService = () => {
   const router = useRouter()

   const handleServiceChange = (service: ServiceDto | null) => {
      if (!service) return
      router.navigate({ to: `/usluga/${service.slug}` })
   }

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <FormAutocomplete
            placeholder="Wyszukaj usługę którą potrzebujesz..."
            onChange={handleServiceChange}
            queryFn={services.getSearchServicesQuery}
         />
      </div>
   )
}
