import { useMemo } from "react"
import type { JobRequestStep } from "../types/stepper"
import { JobDateStep } from "../components/steps/date/job-date-step"
import { Summary } from "../components/steps/summary/summary"
import { Description } from "../components/steps/description/description"
import { DistrictStep } from "../components/steps/district/district-step"
import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/data"
import { Bell, Clock, FileText, MapPin } from "lucide-react"

export const useJobRequestSteps = (city: CityDto, service: ServiceDetailsDto): JobRequestStep[] =>
   useMemo(() => {
      const base: JobRequestStep[] = [
         {
            id: 1,
            component: <JobDateStep />,
            name: "serviceTime",
            title: "Termin usługi",
            icon: Clock,
         },
         {
            id: 2,
            component: <Description />,
            name: "description",
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
                 name: "district",
                 title: "Wybierz dzielnice",
                 icon: MapPin,
              },
              ...base,
           ]
         : base
   }, [city, service])
