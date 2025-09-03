import { Form } from "@/components/ui/form"
import type { ServiceRequestData } from "@/features/service-request/utils/service-request-form-schema"
import type { UseFormReturn } from "react-hook-form"
import { useCreateJobRequestMutation } from "@/features/service-request/api/service-request-queries"
import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/service-types"

interface ServiceRequestDetailsFormProps {
   formId: string
   form: UseFormReturn<ServiceRequestData>
   children: React.ReactNode
   selectedCity: CityDto
   service: ServiceDetailsDto
}

export const ServiceRequestDetailsForm = ({
   formId,
   form,
   children,
   selectedCity,
   service,
}: ServiceRequestDetailsFormProps) => {
   const { mutate } = useCreateJobRequestMutation()

   const onSubmit = (data: ServiceRequestData) => {
      const preferredDate =
         data.serviceTime.type === "EXACT_DATE" && data.serviceTime.exactDate
            ? data.serviceTime.exactDate.toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]

      const deadline =
         data.serviceTime.type === "EXACT_DATE" && data.serviceTime.exactDate
            ? data.serviceTime.exactDate.toISOString().split("T")[0]
            : undefined

      mutate({
         city: selectedCity.name,
         district: data.district || "",
         deadlineType: data.serviceTime.type,
         deadline,
         preferredDate,
         serviceId: service.id.toString(),
         description: data.description.text,
      })
   }

   return (
      <Form {...form}>
         <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            {children}
         </form>
      </Form>
   )
}
