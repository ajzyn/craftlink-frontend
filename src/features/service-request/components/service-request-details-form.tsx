import { Form } from "@/components/ui/form"
import type { ServiceRequestData } from "@/features/service-request/utils/service-request-form-schema"
import type { UseFormReturn } from "react-hook-form"

interface ServiceRequestDetailsFormProps {
   formId: string
   form: UseFormReturn<ServiceRequestData>
   children: React.ReactNode
}

export const ServiceRequestDetailsForm = ({
   formId,
   form,
   children,
}: ServiceRequestDetailsFormProps) => {
   const onSubmit = (data: ServiceRequestData) => {
      console.log(data)
   }

   return (
      <Form {...form}>
         <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            {children}
         </form>
      </Form>
   )
}
