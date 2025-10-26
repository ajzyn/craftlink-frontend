import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, Pin } from "lucide-react"
import { SectionColoredItem } from "@/components/section/section-colored-item"
import { SectionContentWithIcon } from "@/components/section/section-content-with-icon"

interface JobRequestLocationProps {
   city: string
   district?: string
}

export const JobRequestLocation = ({ city, district }: JobRequestLocationProps) => {
   const { isMobile } = useBreakpoint()

   return (
      <Card>
         <CardHeader>
            <h2 className="text-heading-lg">Lokalizacja</h2>
         </CardHeader>
         {isMobile ? (
            <>
               <CardContent className="flex items-center gap-4">
                  <SectionContentWithIcon icon={MapPin} tone="amber">
                     <h3 className="text-lg text-foreground">{city}</h3>
                     {district && <h3 className="text-sm text-foreground-muted">{district}</h3>}
                  </SectionContentWithIcon>
               </CardContent>
            </>
         ) : (
            <CardContent className="grid grid-cols-2 gap-4">
               <SectionColoredItem icon={MapPin} label="Miasto" value={city} tone="green" />

               {district && (
                  <SectionColoredItem icon={Pin} label="Dzielnica" value={district} tone="blue" />
               )}
            </CardContent>
         )}
      </Card>
   )
}
