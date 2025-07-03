import type { AutocompleteOption } from "@/shared/components/autocomplete/types/autocomplete-option.ts"

export const defaultGetOptionKey = <T extends AutocompleteOption>(option: T): string | number =>
   option.id ?? option.name
