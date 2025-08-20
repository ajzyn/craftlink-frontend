import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { deadlineLabels, DeadlineType } from "@/features/service-request/types/deadline-type"
import { useFormContext, useWatch } from "react-hook-form"
import type { ServiceRequestData } from "@/features/service-request/utils/service-request-form-schema"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect } from "react"
import { DeadlineCalendar } from "@/features/service-request/components/steps/date/deadline-calendar"

export const ServiceDateStep = () => {
   const { control, setValue } = useFormContext<ServiceRequestData>()
   const type = useWatch({ control, name: "serviceTime.type" })

   useEffect(() => {
      if (type !== DeadlineType.EXACT_DATE) {
         setValue("serviceTime.exactDate", undefined, { shouldValidate: true })
      }
   }, [type, setValue])

   return (
      <div>
         <FormField
            control={control}
            name="serviceTime.type"
            render={({ field }) => (
               <FormItem>
                  <FormControl>
                     <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-4"
                     >
                        <FormItem className="flex items-center gap-3">
                           <RadioGroupItem value={DeadlineType.ASAP} id="asap" />
                           <FormLabel htmlFor="asap" className="text-label-xl">
                              {deadlineLabels[DeadlineType.ASAP]}
                           </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                           <RadioGroupItem value={DeadlineType.WITHIN_5_DAYS} id="5days" />
                           <FormLabel htmlFor="5days" className="text-label-xl">
                              {deadlineLabels[DeadlineType.WITHIN_5_DAYS]}
                           </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                           <RadioGroupItem value={DeadlineType.WITHIN_2_WEEKS} id="2weeks" />
                           <FormLabel htmlFor="2weeks" className="text-label-xl">
                              {deadlineLabels[DeadlineType.WITHIN_2_WEEKS]}
                           </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                           <RadioGroupItem value={DeadlineType.ADJUST} id="adjust" />
                           <FormLabel htmlFor="adjust" className="text-label-xl">
                              {deadlineLabels[DeadlineType.ADJUST]}
                           </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                           <RadioGroupItem value={DeadlineType.EXACT_DATE} id="exact" />
                           <FormLabel htmlFor="exact" className="text-label-xl">
                              {deadlineLabels[DeadlineType.EXACT_DATE]}
                           </FormLabel>
                        </FormItem>
                     </RadioGroup>
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
         {type === DeadlineType.EXACT_DATE && (
            <div className="mt-10 flex justify-center">
               <FormField
                  control={control}
                  name="serviceTime.exactDate"
                  render={({ field }) => (
                     <FormItem className="space-y-2">
                        <FormLabel className="text-label-xl">Wybierz datę</FormLabel>
                        <FormControl>
                           <DeadlineCalendar
                              value={field.value}
                              onChange={d => field.onChange(d)}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
         )}
      </div>
   )
}
