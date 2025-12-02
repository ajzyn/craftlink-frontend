import { Search } from "lucide-react"
import { useRouter } from "@tanstack/react-router"
import { Combobox } from "@/shared/components/autocomplete/combobox"
import { debounce } from "lodash"
import { useSearchServiceQuery } from "@/entities/service"
import { useMemo, useState } from "react"

export const ServiceSelect = () => {
   const router = useRouter()
   const [search, setSearch] = useState("")
   const { data: cities } = useSearchServiceQuery(search)

   //TODO: ogharnac zeby czyscil sie cache lub dla undefined zawsze zeby byl pusty czy cos

   const debouncedSearch = useMemo(() => debounce(setSearch, 300), [])

   const handleServiceChange = (service: string | null) => {
      if (!service) return
      router.navigate({ to: `/zlecenia/nowe/${service}` })
   }

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <Combobox
            placeholder="Wyszukaj usługę którą potrzebujesz..."
            defaultText="Zacznij pisać by zobaczyć sugestie"
            onChange={handleServiceChange}
            onSearchChange={debouncedSearch}
            options={cities ?? []}
            className="h-10 py-1 px-3 pl-12"
            value={search}
         />
      </div>
   )
}
