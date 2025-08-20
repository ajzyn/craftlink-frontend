import { useFormContext } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, FileText, MapPin } from "lucide-react"
import type { ServiceRequestData } from "@/features/service-request/types/service-request-form-schema"
import { deadlineLabels, DeadlineType } from "@/features/service-request/types/deadline-type"
import { format } from "date-fns"
import type { CityDto } from "@/shared/types/location"
import type { ServiceDetailsDto } from "@/features/services/types/service-types"
import { pl } from "date-fns/locale"

interface SummaryStepProps {
   city: CityDto
   service: ServiceDetailsDto
}

export const Summary = ({ city, service }: SummaryStepProps) => {
   const { getValues } = useFormContext<ServiceRequestData>()
   const values = getValues()

   return (
      <div className="space-y-4 w-full max-w-[600px]">
         <Card>
            <CardHeader>
               <CardTitle>Miasto i usługa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                     {city.name}
                     {city.hasDistricts && values.district ? `, dzielnica: ${values.district}` : ""}
                  </span>
               </div>
               <Separator />
               <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.category.name}</p>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Termin</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                     {values.serviceTime.type === DeadlineType.EXACT_DATE &&
                     values.serviceTime.exactDate
                        ? `${deadlineLabels[DeadlineType.EXACT_DATE]}: ${format(values.serviceTime.exactDate, "dd MMMM yyyy", { locale: pl })}`
                        : deadlineLabels[values.serviceTime.type]}
                  </span>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Opis zgłoszenia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                  <p>{values.description.text}</p>
               </div>
               {values.description.images?.length ? (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                     {values.description.images.map((file, i) => (
                        <div
                           key={i}
                           className="w-full h-20 rounded-md bg-muted flex items-center justify-center text-xs"
                        >
                           {file.name}
                        </div>
                     ))}
                  </div>
               ) : null}
            </CardContent>
         </Card>
      </div>
   )
}
