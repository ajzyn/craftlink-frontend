import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import type { ServiceRequestData } from "@/features/service-request/types/service-request-form-schema.ts"

export const Description = () => {
   const { control } = useFormContext<ServiceRequestData>()

   return (
      <FormField
         control={control}
         name="description.text"
         render={({ field }) => (
            <FormItem>
               <FormControl>
                  <Textarea
                     placeholder="Wpisz tutaj szczegóły..."
                     className="min-h-[150px] resize-y text-body-lg"
                     {...field}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
