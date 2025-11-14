import { Form } from "@/shared/components/ui/form"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"
import type { UseFormReturn } from "react-hook-form"

interface ServiceRequestDetailsFormProps {
   form: UseFormReturn<JobRequestData>
   children: React.ReactNode
}

export const CreationForm = ({ form, children }: ServiceRequestDetailsFormProps) => {
   return (
      <Form {...form}>
         <form>{children}</form>
      </Form>
   )
}
