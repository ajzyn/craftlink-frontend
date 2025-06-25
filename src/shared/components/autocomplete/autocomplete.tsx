import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { AutocompleteOption } from "./types/autocomplete-option"
import { defaultGetOptionLabel } from "./utils/get-default-label"
import { defaultGetOptionValue } from "./utils/get-default-value"
import { defaultGetOptionKey } from "./utils/get-default-key"
import { defaultFilterOption } from "./utils/default-filter-option"
import { useAutocompleteSearch } from "./hooks/use-autocomplete-search"
import { ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormAutocompleteProps<T extends AutocompleteOption> {
  value?: string | number | T | null
  onChange?: (value: T | null, inputValue?: string) => void
  onBlur?: () => void
  placeholder?: string
  options?: T[]
  queryFn?: (query: string) => Promise<T[]>
  disabled?: boolean
  className?: string
  minCharsForSearch?: number
  debounceMs?: number
  getOptionLabel?: (option: T) => string
  getOptionValue?: (option: T) => string | number
  getOptionKey?: (option: T) => string | number
  filterOption?: (option: T, inputValue: string) => boolean
  allowCustomValue?: boolean
  maxResults?: number
}

export const FormAutocomplete = <T extends AutocompleteOption>({
  value,
  onChange = () => {},
  onBlur = () => {},
  placeholder = "Wyszukaj...",
  options = [],
  queryFn,
  disabled = false,
  className = "",
  minCharsForSearch = 1,
  debounceMs = 300,
  getOptionLabel = defaultGetOptionLabel,
  getOptionValue = defaultGetOptionValue,
  getOptionKey = defaultGetOptionKey,
  filterOption = defaultFilterOption,
  allowCustomValue = false,
  maxResults = 10,
}: FormAutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)

  const stableGetOptionLabel = useCallback(getOptionLabel, [])
  const stableGetOptionValue = useCallback(getOptionValue, [])
  const stableGetOptionKey = useCallback(getOptionKey, [])
  const stableFilterOption = useCallback(filterOption, [])

  const selectedOption = useMemo(() => {
    if (!value) return null
    if (typeof value === "object") return value as T
    return options.find(option => stableGetOptionValue(option) === value) || null
  }, [value, options, stableGetOptionValue])

  const {
    data: suggestions,
    loading,
    error,
  } = useAutocompleteSearch(
    inputValue,
    options,
    queryFn,
    minCharsForSearch,
    debounceMs,
    stableFilterOption,
    maxResults,
  )

  // Synchronizuj input value z zewnętrzną wartością
  useEffect(() => {
    if (selectedOption) {
      setInputValue(stableGetOptionLabel(selectedOption))
    } else if (typeof value === "string") {
      setInputValue(value)
    } else if (!value) {
      setInputValue("")
    }
  }, [value, selectedOption, stableGetOptionLabel])

  const handleSelect = useCallback(
    (selectedOption: T) => {
      const label = stableGetOptionLabel(selectedOption)
      setInputValue(label)
      setIsOpen(false)
      setHighlightedIndex(-1)
      onChange(selectedOption, label)
    },
    [stableGetOptionLabel, onChange],
  )

  const handleClear = useCallback(() => {
    setInputValue("")
    setIsOpen(false)
    setHighlightedIndex(-1)
    onChange(null, "")
  }, [onChange])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      setIsOpen(true)
      setHighlightedIndex(-1)

      if (allowCustomValue) {
        onChange(null, newValue)
      }
    },
    [allowCustomValue, onChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
        setIsOpen(true)
        return
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1))
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            handleSelect(suggestions[highlightedIndex])
          } else if (allowCustomValue && inputValue.trim()) {
            setIsOpen(false)
          }
          break
        case "Escape":
          setIsOpen(false)
          setHighlightedIndex(-1)
          break
        case "Tab":
          setIsOpen(false)
          setHighlightedIndex(-1)
          break
      }
    },
    [isOpen, suggestions, highlightedIndex, handleSelect, allowCustomValue, inputValue],
  )

  const handleFocus = useCallback(() => {
    if (!disabled) {
      setIsOpen(true)
    }
  }, [disabled])

  const handleBlur = useCallback(() => {
    // Opóźnienie sprawdzenia czy focus nie przeszedł na dropdown
    setTimeout(() => {
      const activeElement = document.activeElement
      const isInContainer = containerRef.current?.contains(activeElement)

      if (!isInContainer) {
        setIsOpen(false)
        setHighlightedIndex(-1)
        onBlur()
      }
    }, 100)
  }, [onBlur])

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "pl-10 pr-10",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
        />

        {/* Clear button i chevron */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {inputValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 opacity-50 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              Wyszukiwanie...
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-destructive">Błąd: {error.message}</div>
          ) : suggestions.length > 0 ? (
            <div className="py-1">
              {suggestions.map((suggestion, index) => {
                const key = stableGetOptionKey(suggestion)
                const label = stableGetOptionLabel(suggestion)
                const isSelected = selectedOption && stableGetOptionKey(selectedOption) === key
                const isHighlighted = index === highlightedIndex

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelect(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "w-full px-4 py-2 text-sm text-left transition-colors flex justify-between items-center",
                      "hover:bg-accent hover:text-accent-foreground",
                      isHighlighted && "bg-accent text-accent-foreground",
                      isSelected && "bg-primary/10 text-primary",
                    )}
                  >
                    <span className="truncate">{label}</span>
                    {suggestion.slug && (
                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                        #{suggestion.slug}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              {inputValue ? (
                <>
                  Brak wyników dla "{inputValue}"
                  {queryFn && (
                    <div className="text-xs mt-1">Sprawdź pisownię lub spróbuj innych słów</div>
                  )}
                  {allowCustomValue && (
                    <div className="mt-2 text-primary text-xs">Możesz użyć własnej wartości</div>
                  )}
                </>
              ) : (
                "Zacznij pisać aby zobaczyć sugestie"
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
