import { Label } from "@/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { DEADLINE_URGENCY_LABELS, DeadlineUrgencyFilter } from "../../types/filters"

interface DeadlineUrgencyRadioProps {
   value?: DeadlineUrgencyFilter
   onChange: (value?: DeadlineUrgencyFilter) => void
}

export const DeadlineUrgencyRadio = ({ value, onChange }: DeadlineUrgencyRadioProps) => {
   return (
      <RadioGroup
         value={value ?? "none"}
         onValueChange={val =>
            onChange(val === "none" ? undefined : (val as DeadlineUrgencyFilter))
         }
      >
         <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="deadline-none" />
            <Label htmlFor="deadline-none" className="cursor-pointer text-sm font-normal">
               Wszystkie
            </Label>
         </div>

         {Object.entries(DEADLINE_URGENCY_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2">
               <RadioGroupItem value={key} id={`deadline-${key}`} />
               <Label htmlFor={`deadline-${key}`} className="cursor-pointer text-sm font-normal">
                  {label}
               </Label>
            </div>
         ))}
      </RadioGroup>
   )
}
