import { Search } from "lucide-react"
import { FormAutocomplete } from "@/components/autocomplete/autocomplete"
import { api } from "@/features/services/api/api"
import type { ServiceBasicDto } from "@/features/services/types/data"
import { useRouter } from "@tanstack/react-router"

export const SelectService = () => {
   const router = useRouter()

   const handleServiceChange = (service: ServiceBasicDto | null) => {
      if (!service) return
      router.navigate({ to: `/zamowienie-uslugi/${service.slug}` })
   }

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <FormAutocomplete
            placeholder="Wyszukaj usługę którą potrzebujesz..."
            onChange={handleServiceChange}
            queryFn={api.getSearchServicesRequest}
         />
      </div>
   )
}
