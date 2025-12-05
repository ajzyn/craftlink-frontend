import { useNavigate } from "@tanstack/react-router"
import { useSearchServiceQuery } from "@/entities/service"
import { useCallback, useState } from "react"
import { ComboboxWithSearchIcon } from "@/shared/components/autocomplete/combobox-with-search-icon"

export const ServiceSelect = () => {
   const navigate = useNavigate()
   const [search, setSearch] = useState("")
   const { data: services, isLoading } = useSearchServiceQuery(search)

   const handleSearchChange = useCallback((value: string) => setSearch(value), [])

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
      <ComboboxWithSearchIcon
         placeholder="Wyszukaj usługę..."
         onSearchChange={handleSearchChange}
         options={services}
         isLoading={isLoading}
         onOptionChange={handleServiceChange}
      />
   )
}
