import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import type { JobRequestNavigationProps } from "@/features/job-request/browse/components/navigation/types"

export const JobRequestDesktopNavigation = ({
   onEdit,
   onDelete,
   goBack,
}: JobRequestNavigationProps) => {
   return (
      <div className="flex justify-end gap-2 mb-10">
         <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Powrót</span>
         </Button>
         <Button onClick={onEdit} className="flex items-center gap-2 ">
            <Edit className="h-4 w-4" />
            <span>Edytuj</span>
         </Button>
         <Button variant="destructive" onClick={onDelete} className="flex items-center gap-2">
            <Trash className="h-4 w-4" />
            <span>Usuń</span>
         </Button>
      </div>
   )
}
