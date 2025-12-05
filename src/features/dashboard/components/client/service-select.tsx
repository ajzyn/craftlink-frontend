import { Search } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { Combobox } from "@/shared/components/autocomplete/combobox"
import { debounce } from "lodash"
import { useSearchServiceQuery } from "@/entities/service"
import { useCallback, useMemo, useState } from "react"

export const ServiceSelect = () => {
   const navigate = useNavigate()
   const [search, setSearch] = useState("")
   const { data: services } = useSearchServiceQuery(search)

   const debouncedSearch = useMemo(() => debounce(setSearch, 300), [])

   const handleServiceChange = useCallback(
      (result: string | null) => {
         if (!result) return

         const service = services?.find(s => s.value === result)

         if (service) {
            navigate({ to: `/zlecenia/nowe/${service.categorySlug}/${service.value}` })
         }
      },
      [navigate, services],
   )

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <Combobox
            placeholder="Wyszukaj usługę..."
            defaultText="Zacznij pisać by zobaczyć sugestie"
            onChange={handleServiceChange}
            onSearchChange={debouncedSearch}
            options={services ?? []}
            className="h-12 py-1 px-3 pl-12"
            value={search}
         />
      </div>
   )
}
