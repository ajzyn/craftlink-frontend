import { useCallback, useMemo } from "react"
import type { AutocompleteOption } from "../types/autocomplete-option.ts"
import { defaultFilterOption } from "../utils/default-filter-option"
import { useQuery } from "@tanstack/react-query"

interface UseSearchResult<T extends AutocompleteOption> {
   data: T[]
   loading: boolean
   error?: Error | null
}

export const useAutocompleteSearch = <T extends AutocompleteOption>(
   debouncedInputValue: string,
   options: T[] = [],
   queryFn?: (query: string) => Promise<T[]>,
   filterOption: (option: T, inputValue: string) => boolean = defaultFilterOption,
): UseSearchResult<T> => {
   const stableFilterOption = useCallback(filterOption, [])

   const localResults = useMemo(() => {
      if (!debouncedInputValue) {
         return options
      }

      return options.filter(option => stableFilterOption(option, debouncedInputValue))
   }, [debouncedInputValue, options, stableFilterOption])

   const shouldUseApi = useMemo(
      () => Boolean(queryFn && localResults.length === 0 && debouncedInputValue.trim()),
      [queryFn, debouncedInputValue, localResults.length],
   )

   const {
      data: apiResults = [],
      isLoading,
      error,
   } = useQuery({
      queryKey: ["autocomplete", debouncedInputValue],
      queryFn: () => queryFn!(debouncedInputValue),
      enabled: shouldUseApi,
   })

   const finalResults = useMemo(
      () => (localResults.length > 0 ? localResults : (apiResults as T[])),
      [localResults, apiResults],
   )

   return {
      data: finalResults,
      loading: shouldUseApi && isLoading,
      error,
   }
}
