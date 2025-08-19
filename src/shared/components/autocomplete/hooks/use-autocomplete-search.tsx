import { useMemo } from "react"
import type { AutocompleteOption } from "../types/autocomplete-option.ts"
import { useQuery } from "@tanstack/react-query"

interface UseSearchResult<T extends AutocompleteOption | string> {
   data: T[]
   loading: boolean
   error?: Error | null
}

export const useAutocompleteSearch = <T extends AutocompleteOption | string>(
   debouncedInputValue: string,
   options: T[] = [],
   filterOption: (option: T, inputValue: string) => boolean,
   queryFn?: (query: string) => Promise<T[]>,
): UseSearchResult<T> => {
   const localResults = useMemo(() => {
      if (!debouncedInputValue) {
         return options
      }

      return options.filter(option => filterOption(option, debouncedInputValue))
   }, [debouncedInputValue, options, filterOption])

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
