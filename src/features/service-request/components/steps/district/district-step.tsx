import { useCityDistrictsQuery } from "@/shared/api/shared-queries"
import { Search } from "lucide-react"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete"
import { ErrorState } from "@/shared/components/error-state"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import type { ServiceRequestData } from "@/features/service-request/utils/service-request-form-schema"

interface DistrictStepProps {
   cityName: string
}

export const DistrictStep = ({ cityName }: DistrictStepProps) => {
   const { control } = useFormContext<ServiceRequestData>()
   const { data, isError, isLoading, refetch } = useCityDistrictsQuery(cityName)

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
                        options={data ?? []}
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
