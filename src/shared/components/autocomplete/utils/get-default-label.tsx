import type { AutocompleteOption } from "@/shared/components/autocomplete/types/autocomplete-option.ts"

export const defaultGetOptionLabel = <T extends AutocompleteOption>(option: T): string =>
  option.name
