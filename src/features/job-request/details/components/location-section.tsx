import { useBreakpoint } from "@/shared/hooks"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { MapPin, Pin } from "lucide-react"
import { SectionContent, SectionIconContent } from "@/shared/components/section"

interface JobRequestLocationProps {
   city: string
   district?: string
}

export const LocationSection = ({ city, district }: JobRequestLocationProps) => {
   const { isMobile } = useBreakpoint()

   return (
      <Card>
         <CardHeader>
            <h2 className="text-heading-lg">Lokalizacja</h2>
         </CardHeader>
         {isMobile ? (
            <>
               <CardContent className="flex items-center gap-4">
                  <SectionIconContent icon={MapPin} tone="amber">
                     <h3 className="text-lg text-foreground">{city}</h3>
                     {district && <h3 className="text-sm text-foreground-muted">{district}</h3>}
                  </SectionIconContent>
               </CardContent>
            </>
         ) : (
            <CardContent className="grid grid-cols-2 gap-4">
               <SectionContent icon={MapPin} label="Miasto" tone="green">
                  {city}
               </SectionContent>

               {district && (
                  <SectionContent icon={Pin} label="Dzielnica" tone="blue">
                     {district}
                  </SectionContent>
               )}
            </CardContent>
         )}
      </Card>
   )
}
