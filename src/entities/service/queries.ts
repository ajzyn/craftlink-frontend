import { useQuery } from "@tanstack/react-query"
import { serviceKeys } from "@/entities/service/query-keys"
import { getServiceBySlug, searchServiceByText } from "@/entities/service/api"
import type { ServiceSearchComboboxOption } from "@/entities/service/types"

export const useServiceDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => getServiceBySlug(slug!),
      queryKey: serviceKeys.detail(slug!),
      enabled: !!slug,
   })
}

export const useSearchServiceQuery = (text?: string) => {
   return useQuery({
      queryFn: () => searchServiceByText(text!),
      queryKey: serviceKeys.search(text),
      enabled: !!text,
      staleTime: 60 * 1000,
      select: data =>
         data.map(
            s =>
               ({
                  label: s.name,
                  value: s.slug,
                  categorySlug: s.categorySlug,
               }) as ServiceSearchComboboxOption,
         ),
   })
}
