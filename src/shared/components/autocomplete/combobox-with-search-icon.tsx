import { Search } from "lucide-react"
import { Combobox, type ComboboxOption } from "@/shared/components/autocomplete/combobox"
import { useEffect, useMemo } from "react"
import { debounce } from "lodash"
import { cn } from "@/lib/utils"

interface ComboboxWithSearchIconProps<T extends ComboboxOption> {
   options?: T[]
   onOptionChange: (option: string | null) => void
   onSearchChange?: (search: string) => void
   value?: string
   className?: string
   placeholder?: string
   defaultText?: string
   isLoading?: boolean
   onBlur?: VoidFunction
   name?: string
}

export const ComboboxWithSearchIcon = <T extends ComboboxOption>({
   options,
   onSearchChange,
   onOptionChange,
   value,
   className = "",
   placeholder,
   defaultText,
   isLoading,
   onBlur,
   name,
}: ComboboxWithSearchIconProps<T>) => {
   const debouncedSearch = useMemo(() => {
      if (!onSearchChange) return undefined
      return debounce(onSearchChange, 300)
   }, [onSearchChange])

   useEffect(() => {
      return () => {
         debouncedSearch?.cancel()
      }
   }, [debouncedSearch])

   return (
      <div className="relative">
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
         <Combobox
            defaultText={defaultText}
            placeholder={placeholder}
            onChange={onOptionChange}
            onSearchChange={debouncedSearch}
            options={options ?? []}
            className={cn("h-12 py-1 px-3 pl-12", className)}
            value={value}
            isLoading={isLoading}
            onBlur={onBlur}
            name={name}
         />
      </div>
   )
}
