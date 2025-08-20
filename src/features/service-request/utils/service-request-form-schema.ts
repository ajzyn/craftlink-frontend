import { z } from "zod"
import { DeadlineType } from "@/features/service-request/types/deadline-types"

export const createServiceRequestSchema = (hasDistricts: boolean) =>
   z.object({
      district: hasDistricts
         ? z.string().min(1, "Proszę wybierz dzielnicę")
         : z.string().optional(),

      serviceTime: z
         .object({
            type: z.enum(
               [
                  DeadlineType.ASAP,
                  DeadlineType.WITHIN_5_DAYS,
                  DeadlineType.WITHIN_2_WEEKS,
                  DeadlineType.EXACT_DATE,
                  DeadlineType.ADJUST,
               ],
               {
                  errorMap: () => ({ message: "Proszę wybierz termin realizacji" }),
               },
            ),
            exactDate: z.date().optional(),
         })
         .refine(data => data.type !== DeadlineType.EXACT_DATE || !!data.exactDate, {
            message: "Proszę podać dokładną datę",
            path: ["exactDate"],
         }),

      description: z.object({
         text: z.string().min(20, "Opis musi mieć co najmniej 20 znaków"),
         images: z.array(z.instanceof(File)).optional(),
      }),
   })

export type ServiceRequestData = z.infer<ReturnType<typeof createServiceRequestSchema>>
