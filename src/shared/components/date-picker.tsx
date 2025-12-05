import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button"
import { getFormattedDate } from "@/shared/utils"
import { Calendar } from "@/shared/components/calendar"
import { type MouseEvent, useState } from "react"
import { X } from "lucide-react"

interface DatePickerBtnProps {
   value?: string
   onChange: (date?: Date) => void
   minDate?: Date
   maxDate?: Date
}

export const DatePicker = ({ value, onChange, minDate, maxDate }: DatePickerBtnProps) => {
   const [open, setOpen] = useState(false)

   const handleDateChange = (date?: Date) => {
      onChange(date)
      setOpen(false)
   }

   const handleClear = (e: MouseEvent) => {
      e.stopPropagation()
      onChange(undefined)
   }

   return (
      <Popover modal={true} open={open} onOpenChange={setOpen}>
         <div className="relative w-full">
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  className="w-full justify-start h-10 font-normal border-input bg-white hover:bg-white pr-10"
               >
                  {value ? getFormattedDate(value) : "Wybierz datę"}
               </Button>
            </PopoverTrigger>
            {value && (
               <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm z-10"
               >
                  <X className="h-4 w-4 opacity-50 hover:opacity-100" />
               </button>
            )}
         </div>
         <PopoverContent className="w-auto p-0 border-0">
            <Calendar
               value={value ? new Date(value) : undefined}
               onChange={handleDateChange}
               minDate={minDate}
               maxDate={maxDate}
            />
         </PopoverContent>
      </Popover>
   )
}
