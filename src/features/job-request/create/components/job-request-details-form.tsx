import { Form } from "@/components/ui/form"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"
import type { UseFormReturn } from "react-hook-form"
import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/data"
import { useCreateJobRequest } from "@/features/job-request/create/components/use-create-job-request"

interface ServiceRequestDetailsFormProps {
   formId: string
   form: UseFormReturn<JobRequestData>
   children: React.ReactNode
   selectedCity: CityDto
   service: ServiceDetailsDto
}

export const JobRequestDetailsForm = ({
   formId,
   form,
   children,
   selectedCity,
   service,
}: ServiceRequestDetailsFormProps) => {
   const { onSubmit } = useCreateJobRequest(selectedCity, service)

   return (
      <Form {...form}>
         <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            {children}
         </form>
      </Form>
   )
}
