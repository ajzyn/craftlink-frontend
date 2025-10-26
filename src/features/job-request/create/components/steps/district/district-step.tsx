import { Search } from "lucide-react"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"
import { FormAutocomplete } from "@/components/autocomplete/autocomplete"
import { ErrorState } from "@/components/error-state"
import { useCityDistrictsQuery } from "@/features/location/api/location-queries"
import { useMemo } from "react"
import { capitalizeFirstLetter } from "@/shared/utils/string-utils"

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
      return data.map(cityName => capitalizeFirstLetter(cityName))
   }, [data])

   if (isError) {
      return <ErrorState onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <FormField
         control={control}
         name="district"
         render={({ field }) => (
            <FormItem>
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                  <FormControl>
                     <FormAutocomplete
                        placeholder="Wybierz dzielnicę..."
                        options={districts}
                        value={field.value ?? ""}
                        onChange={val => field.onChange(val ?? "")}
                        onBlur={field.onBlur}
                     />
                  </FormControl>
               </div>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
