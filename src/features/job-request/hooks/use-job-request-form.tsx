import { useForm } from "react-hook-form"
import { createJobRequestSchema, type JobRequestData } from "../utils/job-request-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"

export const useJobRequestForm = (hasDistricts: boolean) => {
   return useForm<JobRequestData>({
      resolver: zodResolver(createJobRequestSchema(hasDistricts)),
      mode: "onChange",
      defaultValues: {
         district: "",
         serviceTime: { type: undefined, exactDate: undefined },
         description: { text: "", images: [] },
      },
   })
}
