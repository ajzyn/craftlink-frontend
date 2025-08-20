import type { AutocompleteOption } from "@/components/autocomplete/types/autocomplete-option"

interface DropdownListProps<T extends AutocompleteOption> {
   suggestions: T[]
   loading: boolean
   error?: Error | null
   inputValue: string
   highlightedIndex: number
   selectedOption: T | null
   onSelect: (option: T) => void
   onHighlight: (index: number) => void
   getOptionKey: (option: T) => string | number
   getOptionLabel: (option: T) => string
   allowCustomValue: boolean
   queryFn?: (query: string) => Promise<T[]>
}

export const DropdownList = <T extends AutocompleteOption>({
   suggestions,
   loading,
   error,
   inputValue,
   highlightedIndex,
   selectedOption,
   onSelect,
   onHighlight,
   getOptionKey,
   getOptionLabel,
   allowCustomValue,
   queryFn,
}: DropdownListProps<T>) => {
   if (loading) {
      return (
         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="px-4 py-3 text-sm text-gray-500">Wyszukiwanie...</div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="px-4 py-3 text-sm text-red-500">Błąd: {error.message}</div>
         </div>
      )
   }

   return (
      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
         {suggestions.length > 0 ? (
            <ul className="py-1">
               {suggestions.map((suggestion, index) => {
                  const key = getOptionKey(suggestion)
                  const label = getOptionLabel(suggestion)
                  const isSelected = selectedOption && getOptionKey(selectedOption) === key
                  const isHighlighted = index === highlightedIndex

                  return (
                     <li
                        key={key}
                        onClick={() => onSelect(suggestion)}
                        onMouseEnter={() => onHighlight(index)}
                        className={`px-4 py-2 text-sm cursor-pointer transition-colors flex justify-between items-center ${
                           isHighlighted
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                        } ${isSelected ? "bg-blue-100" : ""}`}
                     >
                        <span>{label}</span>
                        {suggestion.slug && (
                           <span className="text-xs text-gray-400">#{suggestion.slug}</span>
                        )}
                     </li>
                  )
               })}
            </ul>
         ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
               {inputValue
                  ? `Brak wyników dla "${inputValue}"${queryFn ? ". Sprawdź pisownię lub spróbuj innych słów." : ""}`
                  : "Zacznij pisać aby zobaczyć sugestie"}
               {allowCustomValue && inputValue && (
                  <div className="mt-1 text-blue-600">Możesz użyć własnej wartości</div>
               )}
            </div>
         )}
      </div>
   )
}
