import { useMemo } from "react"
import type { ServiceRequestStep } from "../types/step-types"
import { ServiceDateStep } from "../components/steps/date/service-date-step"
import { Summary } from "../components/steps/summary/summary"
import { Description } from "../components/steps/description/description"
import { DistrictStep } from "../components/steps/district/district-step"
import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/service-types"
import { Bell, Clock, FileText, MapPin } from "lucide-react"

export const useServiceRequestSteps = (
   city: CityDto,
   service: ServiceDetailsDto,
): ServiceRequestStep[] =>
   useMemo(() => {
      const base: ServiceRequestStep[] = [
         {
            id: 1,
            component: <ServiceDateStep />,
            validate: "serviceTime",
            title: "Termin usługi",
            icon: Clock,
         },
         {
            id: 2,
            component: <Description />,
            validate: "description",
            title: "Opisz usługę",
            icon: FileText,
         },
         {
            id: 3,
            component: <Summary service={service} city={city} />,
            title: "Podsumowanie",
            icon: Bell,
         },
      ]
      return city.hasDistricts
         ? [
              {
                 id: 0,
                 component: <DistrictStep cityName={city.name} />,
                 validate: "district",
                 title: "Wybierz dzielnice",
                 icon: MapPin,
              },
              ...base,
           ]
         : base
   }, [city, service])
