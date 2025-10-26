import { useCreateJobRequestMutation } from "@/features/job-request/create/api/queries"
import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/data"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"
import { toast } from "sonner"
import { useRouter } from "@tanstack/react-router"

export const useCreateJobRequest = (city: CityDto, service: ServiceDetailsDto) => {
   const router = useRouter()
   const { mutate: createJobMutation } = useCreateJobRequestMutation()

   const onSubmit = (data: JobRequestData) => {
      const exactDate =
         data.serviceTime.type === "EXACT_DATE" && data.serviceTime.exactDate
            ? data.serviceTime.exactDate.toISOString().split("T")[0]
            : undefined

      createJobMutation(
         {
            city: city.name,
            district: data.district || "",
            deadlineType: data.serviceTime.type,
            exactDate,
            serviceId: service.id.toString(),
            description: data.description.text,
         },
         {
            onSuccess: res => {
               toast.success("Zlecenie zostało utworzone pomyślnie")
               router.navigate({ to: `/zlecenia/${res.id}` })
            },
            onError: () => {
               toast.error("Nie udało się utworzyć zlecenia. Spróbuj ponownie.")
            },
         },
      )
   }

   return { onSubmit }
}
