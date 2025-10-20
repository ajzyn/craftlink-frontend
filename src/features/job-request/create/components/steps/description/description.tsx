import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"
import { Textarea } from "@/components/ui/textarea"

export const Description = () => {
   const { control } = useFormContext<JobRequestData>()

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
