import { Button } from "@/components/ui/button"
import { ArrowLeft, MoreVertical, Settings } from "lucide-react"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { JobRequestNavigationProps } from "@/features/job-request/browse/components/navigation/types"

export const JobRequestMobileNavigation = ({
   onEdit,
   onDelete,
   goBack,
}: JobRequestNavigationProps) => {
   return (
      <div className="flex justify-end">
         <Button variant="ghost" size="icon" onClick={goBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
         </Button>
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon" className="flex items-center gap-2">
                  <MoreVertical className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
               <DropdownMenuItem
                  onClick={onEdit}
                  className="flex items-center space-x-2 cursor-pointer"
               >
                  <Settings size={16} />
                  <span>Edytuj</span>
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={onDelete}
                  className="flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
               >
                  <Settings size={16} />
                  <span>Usuń</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
