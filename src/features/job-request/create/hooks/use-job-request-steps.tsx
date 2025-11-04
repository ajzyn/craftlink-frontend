import { useMemo } from "react"
import type { JobRequestStep } from "../types/stepper"
import { DateStep } from "../components/date-step"
import { SummaryStep } from "../components/summary-step"
import { DescriptionStep } from "../components/description-step"
import { DistrictStep } from "../components/district-step"
import { Bell, Clock, FileText, MapPin } from "lucide-react"
import type { ServiceDetailsDto } from "@/entities/service"
import type { CityDto } from "@/entities/location"

export const useJobRequestSteps = (city: CityDto, service: ServiceDetailsDto): JobRequestStep[] =>
   useMemo(() => {
      const base: JobRequestStep[] = [
         {
            id: 1,
            component: <DateStep />,
            name: "serviceTime",
            title: "Termin usługi",
            icon: Clock,
         },
         {
            id: 2,
            component: <DescriptionStep />,
            name: "description",
            title: "Opisz usługę",
            icon: FileText,
         },
         {
            id: 3,
            component: <SummaryStep service={service} city={city} />,
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
