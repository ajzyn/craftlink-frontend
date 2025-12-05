import { Check, ChevronDown, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandItem,
   CommandList,
} from "@/shared/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import {
   type ChangeEvent,
   type KeyboardEvent,
   type MouseEvent,
   useMemo,
   useRef,
   useState,
} from "react"
import { isEmpty } from "lodash"
import { Input } from "@/shared/components/ui/input"

export interface ComboboxOption {
   value: string
   label: string
}

interface ComboboxProps<T extends ComboboxOption> {
   options: T[]
   value?: string
   onChange: (value: string | null) => void
   onSearchChange?: (search: string) => void
   placeholder?: string
   emptyText?: string
   defaultText?: string
   isLoading?: boolean
   disabled?: boolean
   className?: string
   onBlur?: VoidFunction
   name?: string
}

export const Combobox = <T extends ComboboxOption>({
   options,
   value,
   onChange,
   onSearchChange,
   placeholder = "Wybierz...",
   emptyText = "Nie znaleziono",
   defaultText = "Zacznij pisać by zobaczyć sugestie",
   isLoading = false,
   disabled = false,
   className,
   onBlur,
   name,
}: ComboboxProps<T>) => {
   //TODO: refactor
   const [open, setOpen] = useState(false)
   const [search, setSearch] = useState("")
   const commandRef = useRef<HTMLDivElement>(null)
   const inputRef = useRef<HTMLInputElement>(null)
   const [keyboardNavigationStarted, setKeyboardNavigationStarted] = useState(false)

   const selectedLabel = useMemo(
      () => options.find(opt => opt.value === value)?.label,
      [options, value],
   )

   const displayValue = open ? search : search || selectedLabel || ""

   const filteredOptions = useMemo(() => {
      const filtered = search
         ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
         : options

      if (!value) return filtered

      const selectedIndex = filtered.findIndex(opt => opt.value === value)
      if (selectedIndex <= 0) return filtered

      const selected = filtered[selectedIndex]
      return [selected, ...filtered.slice(0, selectedIndex), ...filtered.slice(selectedIndex + 1)]
   }, [options, search, value])

   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value
      setSearch(newSearch)
      if (!open) setOpen(true)
      onSearchChange?.(newSearch)
   }

   const clearInputAndClosePopover = () => {
      setOpen(false)
      setSearch("")
   }

   const handleSelect = (selectedValue: string) => {
      onChange(selectedValue === value ? null : selectedValue)
      clearInputAndClosePopover()
   }

   const handleClear = (e: MouseEvent) => {
      e.stopPropagation()
      setSearch("")
      onChange(null)
      onSearchChange?.("")
   }

   const handleFocus = () => {
      setSearch("")
      setOpen(true)
   }

   const handleInputKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && search === "") {
         onChange(null)
         clearInputAndClosePopover()
         return
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
         e.preventDefault()
         setKeyboardNavigationStarted(true)

         commandRef.current?.focus()
         const event = new KeyboardEvent("keydown", { key: e.key })
         commandRef.current?.dispatchEvent(event)
      }
   }

   return (
      <Popover
         open={open}
         onOpenChange={isOpen => {
            setOpen(isOpen)
            if (!isOpen && onBlur) {
               onBlur()
            }
         }}
      >
         <div className="relative">
            <PopoverTrigger asChild>
               <button
                  type="button"
                  className="absolute inset-0 w-full cursor-text"
                  onClick={() => inputRef.current?.focus()}
               />
            </PopoverTrigger>
            <Input
               ref={inputRef}
               name={name}
               value={displayValue}
               onChange={handleSearchChange}
               onFocus={handleFocus}
               placeholder={placeholder}
               disabled={disabled}
               onBlur={onBlur}
               onKeyDown={handleInputKeyDown}
               className={cn(
                  "pr-16 border-border",
                  "hover:border-primary focus:border-primary focus:ring-primary",
                  className,
               )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
               {value && (
                  <button
                     onClick={handleClear}
                     onMouseDown={e => e.preventDefault()}
                     className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity"
                     tabIndex={-1}
                  >
                     <X className="h-4 w-4" />
                  </button>
               )}
               {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                  <ChevronDown
                     className={cn(
                        "h-4 w-4 opacity-50 transition-transform pointer-events-none",
                        open && "rotate-180",
                     )}
                  />
               )}
            </div>
         </div>
         <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0 border-border"
            align="start"
            onOpenAutoFocus={e => e.preventDefault()}
         >
            <Command
               ref={commandRef}
               tabIndex={-1}
               className="pointer-events-auto"
               onTouchMove={e => e.stopPropagation()}
               {...(!keyboardNavigationStarted && { value: "" })}
            >
               <CommandList>
                  {isLoading ? (
                     <div className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Wyszukiwanie...
                     </div>
                  ) : isEmpty(filteredOptions) ? (
                     <CommandEmpty>{isEmpty(value) ? defaultText : emptyText}</CommandEmpty>
                  ) : (
                     <CommandGroup>
                        {filteredOptions.map(option => (
                           <CommandItem
                              key={option.value}
                              value={option.value}
                              onSelect={handleSelect}
                              className={cn(
                                 "capitalize justify-between cursor-pointer",
                                 value === option.value && "text-primary",
                              )}
                           >
                              {option.label}
                              <Check
                                 className={cn(
                                    "h-4 w-4",
                                    value === option.value ? "opacity-100" : "opacity-0",
                                 )}
                              />
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  )}
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}
