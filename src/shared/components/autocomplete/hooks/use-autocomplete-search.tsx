import { useCallback, useMemo } from "react"
import type { AutocompleteOption } from "../types/autocomplete-option.ts"
import { defaultFilterOption } from "../utils/default-filter-option"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/shared/hooks/use-debounce.tsx"

interface UseSearchResult<T extends AutocompleteOption> {
  data: T[]
  loading: boolean
  error?: Error | null
}

export const useAutocompleteSearch = <T extends AutocompleteOption>(
  query: string,
  options: T[] = [],
  queryFn?: (query: string) => Promise<T[]>,
  minChars: number = 1,
  debounceMs: number = 300,
  filterOption: (option: T, inputValue: string) => boolean = defaultFilterOption,
  maxResults: number = 10,
): UseSearchResult<T> => {
  const debouncedQuery = useDebounce(query, debounceMs)

  const stableFilterOption = useCallback(filterOption, [])

  const localResults = useMemo(() => {
    if (!debouncedQuery) {
      return options.slice(0, maxResults)
    }

    const filtered = options.filter(option => stableFilterOption(option, debouncedQuery))
    return filtered.slice(0, maxResults)
  }, [debouncedQuery, options, maxResults, stableFilterOption])

  const shouldUseApi = useMemo(
    () =>
      Boolean(
        queryFn &&
          debouncedQuery.length >= minChars &&
          localResults.length === 0 &&
          debouncedQuery.trim(),
      ),
    [queryFn, debouncedQuery, minChars, localResults.length],
  )

  const {
    data: apiResults = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["autocomplete", debouncedQuery],
    queryFn: () => queryFn!(debouncedQuery),
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
