import { Search } from "lucide-react"
import { FormField, FormItem, FormMessage } from "@/shared/components/ui/form"
import { useFormContext } from "react-hook-form"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { useCityDistrictsQuery } from "@/entities/location/queries"
import { useMemo } from "react"
import { ComboboxWithSearchIcon } from "@/shared/components/autocomplete/combobox-with-search-icon"

interface DistrictStepProps {
   cityName: string
}

export const DistrictStep = ({ cityName }: DistrictStepProps) => {
   const { control } = useFormContext<JobRequestData>()
   const { data, isError, isLoading, refetch } = useCityDistrictsQuery(cityName)

   const districts = useMemo(() => {
      if (!data) {
         return []
      }
      return data.map(cityName => ({ value: cityName, label: cityName }))
   }, [data])

   if (isError) {
      return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <FormField
         control={control}
         name="district"
         render={({ field }) => (
            <FormItem>
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                  <ComboboxWithSearchIcon
                     placeholder="Wyszukaj dzielnice..."
                     options={districts}
                     isLoading={isLoading}
                     value={field.value ?? ""}
                     onOptionChange={val => field.onChange(val ?? "")}
                     onBlur={field.onBlur}
                  />
               </div>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
