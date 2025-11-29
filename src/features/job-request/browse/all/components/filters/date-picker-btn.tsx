import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button"
import { getFormattedDate } from "@/shared/utils"
import { DeadlineCalendar } from "@/features/job-request/create/components/deadline-calendar"
import { useState } from "react"

interface DatePickerBtnProps {
   value?: string
   onChange: (date?: Date) => void
}

export const DatePickerBtn = ({ value, onChange }: DatePickerBtnProps) => {
   const [open, setOpen] = useState(false)

   const handleDateChange = (date?: Date) => {
      onChange(date)
      setOpen(false)
   }

   return (
      <Popover modal={true} open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className="w-full justify-start h-10 font-normal border-input bg-white hover:bg-white"
            >
               {value ? getFormattedDate(value) : "Wybierz datę"}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0 border-0">
            <DeadlineCalendar
               value={value ? new Date(value) : undefined}
               onChange={handleDateChange}
            />
         </PopoverContent>
      </Popover>
   )
}
