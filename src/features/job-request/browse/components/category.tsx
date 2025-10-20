import { DynamicIcon } from "@/components/dynamic-icon"
import type { JobRequestServiceDto } from "@/features/job-request/browse/types/data"

interface JobRequestCategoryProps {
   service: JobRequestServiceDto
}

export const JobRequestCategory = ({ service }: JobRequestCategoryProps) => {
   return (
      <div className="flex gap-2 items-center">
         <div className="bg-primary/50 p-2 rounded-md">
            <DynamicIcon iconName={service.categoryIconName} className="w-6 h-6 text-white" />
         </div>
         <div>
            <h2 className="text-xl text-foreground">{service.categoryName}</h2>
            <h3 className="text-sm text-muted-foreground">{service.serviceName}</h3>
         </div>
      </div>
   )
}
