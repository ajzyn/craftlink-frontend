import * as React from "react"
import { Calendar as ShadcnUICalendar } from "@/shared/components/ui/calendar"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

interface CalendarProps {
   value?: Date
   onChange?: (date: Date | undefined) => void
   minDate?: Date
   maxDate?: Date
}

export const Calendar = ({ value, onChange, minDate, maxDate }: CalendarProps) => {
   const [date, setDate] = React.useState<Date | undefined>(value)

   const getDisabledDates = () => {
      if (minDate && maxDate) {
         return [{ before: minDate }, { after: maxDate }]
      }
      if (minDate) {
         return { before: minDate }
      }
      if (maxDate) {
         return { after: maxDate }
      }
      return undefined
   }

   return (
      <ShadcnUICalendar
         mode="single"
         selected={date}
         onSelect={date => {
            setDate(date)
            onChange?.(date)
         }}
         locale={pl}
         disabled={getDisabledDates()}
         formatters={{
            formatCaption: month => format(month, "LLLL yyyy", { locale: pl }).toUpperCase(),
            formatWeekdayName: day => format(day, "EEE", { locale: pl }).toUpperCase(),
         }}
         className="p-2"
         classNames={{
            months: "flex flex-col",
            caption: "flex items-center justify-between py-2",
            caption_label: "text-sm font-semibold tracking-wide",
            nav: "flex items-center gap-1",
            button: "h-7 w-7",
            table: "w-full border-collapse",
            head_row: "grid grid-cols-7",
            head_cell: "text-[11px] font-medium text-muted-foreground text-center py-1",
            row: "grid grid-cols-7 mt-1",
            cell: "relative h-9 w-9 p-0",
            day: "h-9 w-9 p-0 text-center leading-9 rounded-md hover:bg-muted",
            day_selected: "bg-sky-600 text-white hover:bg-sky-600 focus:bg-sky-600 rounded-md",
            day_outside: "opacity-40",
            day_disabled: "opacity-30",
            day_today: "font-semibold",
         }}
      />
   )
}
