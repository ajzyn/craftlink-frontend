import { useForm } from "react-hook-form"
import { createJobRequestSchema, type JobRequestData } from "../utils/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { useCreateJobRequestMutation } from "@/features/job-request/api/mutations"
import { toast } from "sonner"
import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/api/types"
import { useState } from "react"

export const useJobRequestForm = (selectedCity: CityDto, selectedService: ServiceDetailsDto) => {
   const router = useRouter()
   const [isCreatingJobRequest, setIsCreatingJobRequest] = useState(false)
   const { mutate: createJobMutation } = useCreateJobRequestMutation()

   const form = useForm<JobRequestData>({
      resolver: zodResolver(createJobRequestSchema(selectedCity.hasDistricts)),
      mode: "onChange",
      defaultValues: {
         district: "",
         serviceTime: { type: undefined, exactDate: undefined },
         description: { text: "", images: [] },
      },
   })

   const submitJobRequest = async (data: JobRequestData) => {
      const exactDate =
         data.serviceTime.type === "EXACT_DATE" && data.serviceTime.exactDate
            ? data.serviceTime.exactDate.toISOString().split("T")[0]
            : undefined

      const payload = {
         city: selectedCity.name,
         district: data.district || "",
         deadlineType: data.serviceTime.type,
         exactDate,
         serviceId: selectedService.id.toString(),
         description: data.description.text,
      }

      setIsCreatingJobRequest(true)
      const toastId = toast.loading("Trwa wysyłanie zlecenia...", { id: "auth-toast" })

      createJobMutation(payload, {
         onSuccess: res => {
            setTimeout(() => {
               toast.success("Zlecenie zostało utworzone pomyślnie", { id: toastId })
               setIsCreatingJobRequest(false)
               router.navigate({ to: `/zlecenia/${res.id}` })
            }, 1000)
         },
         onError: () => {
            toast.error("Nie udało się utworzyć zlecenia. Spróbuj ponownie.", { id: toastId })
         },
      })
   }

   const submitJobRequestForm = form.handleSubmit(submitJobRequest)

   return { ...form, submitJobRequestForm, isCreatingJobRequest }
}
