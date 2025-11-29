import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button"
import { getFormattedDate } from "@/shared/utils"
import { DeadlineCalendar } from "@/features/job-request/create/components/deadline-calendar"

interface DatePicketBtnProps {
   value?: string
   onChange: (date?: Date) => void
}

export const DatePicketBtn = ({ value, onChange }: DatePicketBtnProps) => {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className="w-full justify-start h-10 font-normal  border-input bg-white hover:bg-white"
            >
               {value ? getFormattedDate(value) : "Wybierz datę"}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0 border-0">
            <DeadlineCalendar value={value ? new Date(value) : undefined} onChange={onChange} />
         </PopoverContent>
      </Popover>
   )
}
